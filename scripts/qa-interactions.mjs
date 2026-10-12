import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome" });
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();
const base = "http://localhost:3016";
const rows = [];
await page.goto(base + "/book?service=phone-agent&ref=fa-sdr-qa&utm_source=qa");
await page.getByRole("button", { name: "Keep analytics off" }).click();
await page.getByLabel("Business or practice name").fill("FlowAudit QA");
await page.getByLabel("Your role").selectOption("Owner / partner");
await page.getByLabel("What would you like to improve?").fill("Review booking setup");
await page.locator("form button[type=submit]").click();
await page.waitForTimeout(8000);
const frame = page.locator("iframe");
rows.push({
  check: "Cal embed",
  frameCount: await frame.count(),
  frameSrc: await frame.first().getAttribute("src"),
  fallback: await page.getByRole("link", { name: /Open the booking page/ }).getAttribute("href"),
});
await page.screenshot({ path: "docs/redesign/evidence/calendar-mobile.png", fullPage: true });
await page.goto(base + "/phone-agent");
await page.getByRole("tab", { name: /full walkthrough/i }).click();
await page.getByRole("tab", { name: /full walkthrough/i }).press("ArrowRight");
rows.push({
  check: "Keyboard media tabs",
  selected: await page.locator(".fa-media-tabs [aria-selected=true]").innerText(),
});
const requests = [];
page.on("request", (r) => {
  if (r.url().endsWith("/api/events")) requests.push(r.postData());
});
await page.getByRole("link", { name: /Privacy choices/ }).count();
await page.getByRole("button", { name: "Privacy choices" }).click();
await page.getByRole("button", { name: "Allow analytics" }).click();
await page.waitForTimeout(500);
rows.push({ check: "Consent enables events", requests: requests.length });
await page.goto(base + "/?lang=es");
await page.waitForTimeout(500);
rows.push({
  check: "Spanish language",
  lang: await page.locator("html").getAttribute("lang"),
  headline: await page.locator("h1").innerText(),
});
await page.getByRole("button", { name: "Menú de navegación" }).click();
rows.push({
  check: "Mobile menu open",
  expanded: await page
    .getByRole("button", { name: "Menú de navegación" })
    .getAttribute("aria-expanded"),
});
await page.keyboard.press("Escape");
rows.push({
  check: "Mobile menu Escape",
  expanded: await page
    .getByRole("button", { name: "Menú de navegación" })
    .getAttribute("aria-expanded"),
});
await page.setViewportSize({ width: 720, height: 450 });
await page.goto(base + "/?lang=en");
const axe = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
  .analyze();
rows.push({
  check: "200% zoom equivalent at 1440px",
  overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
  violations: axe.violations.map((x) => x.id),
});
await page.screenshot({ path: "docs/redesign/evidence/home-zoom-equivalent.png", fullPage: true });
await writeFile("docs/redesign/evidence/interactions.json", JSON.stringify(rows, null, 2));
console.log(JSON.stringify(rows, null, 2));
await browser.close();
