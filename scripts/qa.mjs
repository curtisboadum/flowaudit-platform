import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.QA_URL || "http://localhost:3016";
const out = "docs/redesign/evidence";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext();
await context.addInitScript(() => localStorage.setItem("fa-analytics-consent", "declined"));
const page = await context.newPage();
const routes = [
  "/",
  "/services",
  "/phone-agent",
  "/solutions",
  "/web-design",
  "/revenue-recovery",
  "/demos",
  "/how-it-works",
  "/about",
  "/careers",
  "/book?service=phone-agent",
  "/revenue-recovery/book",
  "/privacy",
  "/terms",
  "/revenue-recovery/privacy",
  "/revenue-recovery/terms",
  "/revenue-recovery/access",
  "/blog",
  "/blog/real-cost-of-manual-work",
  "/blog/hire-vs-automate",
  "/blog/revenue-per-employee",
  ...["trades", "solopreneurs", "insurance", "agencies", "accounting", "legal", "consultants"].map(
    (x) => `/industries/${x}`,
  ),
];
const errors = [],
  rows = [],
  links = new Set();
page.on("pageerror", (e) => errors.push(String(e)));
for (const width of [390, 1440]) {
  await page.setViewportSize({ width, height: 1000 });
  for (const route of routes) {
    const response = await page.goto(base + route, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    const violations = result.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map((n) => n.target),
    }));
    rows.push({ route, width, status: response.status(), overflow, violations });
    for (const href of await page
      .locator("a[href]")
      .evaluateAll((as) => as.map((a) => a.getAttribute("href"))))
      if (href?.startsWith("/") && !href.startsWith("/crm")) links.add(href.split("#")[0]);
    if (["/", "/phone-agent", "/book?service=phone-agent", "/web-design", "/about"].includes(route))
      await page.screenshot({
        path: `${out}/${route === "/" ? "home" : route.split("?")[0].replaceAll("/", "").replaceAll("-", "")}-${width}.png`,
        fullPage: true,
      });
    console.log(
      `${width} ${route}: ${response.status()} overflow=${overflow} axe=${violations.length}`,
    );
  }
}
for (const width of [360, 768, 1024, 1920]) {
  await page.setViewportSize({ width, height: 1000 });
  for (const route of ["/", "/phone-agent", "/book?service=phone-agent", "/web-design"]) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    rows.push({
      route,
      width,
      overflow: await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth),
    });
    if (route === "/") await page.screenshot({ path: `${out}/home-${width}.png`, fullPage: true });
  }
}
const linkResults = [];
for (const href of links) {
  if (href.startsWith("/revenue-recovery/client")) continue;
  try {
    const response = await context.request.get(base + href, { timeout: 10000 });
    linkResults.push({ href, status: response.status() });
  } catch {
    linkResults.push({ href, status: 0 });
  }
}
await writeFile(
  `${out}/browser-qa.json`,
  JSON.stringify({ base, at: new Date().toISOString(), rows, linkResults, errors }, null, 2),
);
await page.goto(base + "/phone-agent");
await page.getByRole("tab", { name: /full walkthrough/i }).click();
await page.getByRole("tab", { name: /full walkthrough/i }).press("ArrowRight");
rows.push({
  check: "Media keyboard tabs",
  selected: await page.getByRole("tab", { selected: true }).first().innerText(),
});
await page.goto(base + "/book?service=phone-agent&ref=fa-sdr-qa&utm_source=qa");
await page.getByLabel("Business or practice name").fill("FlowAudit QA");
await page.getByLabel("Your role").selectOption("Owner / partner");
await page.getByLabel("What would you like to improve?").fill("Review booking setup");
await page.screenshot({ path: `${out}/qualification-390.png`, fullPage: true });
await page.locator("form button[type=submit]").click();
await page.waitForTimeout(4000);
rows.push({
  check: "Cal embed",
  frames: await page.locator("iframe").count(),
  fallback: await page.getByRole("link", { name: /Open the booking page/ }).getAttribute("href"),
});
await page.screenshot({ path: `${out}/calendar.png`, fullPage: true });
await page.goto(base + "/?lang=es");
await page.waitForTimeout(500);
rows.push({
  check: "Spanish locale",
  lang: await page.locator("html").getAttribute("lang"),
  headline: await page.locator("h1").innerText(),
});
await page.goto(base + "/not-a-real-page");
rows.push({
  check: "404",
  status: (await context.request.get(base + "/not-a-real-page")).status(),
});
await writeFile(
  `${out}/browser-qa.json`,
  JSON.stringify({ base, at: new Date().toISOString(), rows, linkResults, errors }, null, 2),
);
await browser.close();
if (
  errors.length ||
  rows.some((x) => x.overflow || x.violations?.length) ||
  linkResults.some((x) => x.status >= 400)
)
  process.exitCode = 1;
