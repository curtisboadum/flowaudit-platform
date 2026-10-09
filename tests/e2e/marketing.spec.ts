import { test, expect } from "@playwright/test";
for (const path of [
  "/",
  "/services",
  "/phone-agent",
  "/web-design",
  "/solutions",
  "/revenue-recovery",
  "/demos",
  "/how-it-works",
  "/about",
  "/privacy",
  "/terms",
  "/industries/trades",
  "/blog/real-cost-of-manual-work",
]) {
  test(`Public route ${path} has a useful next step and metadata`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("meta[name=description]")).toHaveAttribute("content", /.{30,}/);
    await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
      "href",
      new RegExp(path === "/" ? "flowaudit.co.uk/?$" : path + "$"),
    );
    await expect(page.locator('a[href^="/book"]').first()).toBeVisible();
  });
}
test("Mobile menu responds to Escape and Spanish persists across navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?lang=es");
  const menu = page.getByRole("button", { name: "Menú de navegación" });
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await menu.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await page.goto("/phone-agent");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});
test("Booking bypass and edited qualification retain service and context", async ({ page }) => {
  await page.route("**/embed/embed.js", (r) =>
    r.fulfill({ body: "", contentType: "application/javascript" }),
  );
  await page.goto("/book?service=phone-agent&ref=fa-sdr-qa&utm_source=qa");
  await expect(page.getByLabel("I’m interested in")).toHaveValue("phone-agent");
  await page.getByLabel("Business or practice name").fill("QA practice");
  await page.getByLabel("Your role").selectOption("Owner / partner");
  await page.getByLabel("What would you like to improve?").fill("Booking fit");
  await page.locator("form button[type=submit]").click();
  const fallback = page.getByRole("link", { name: /Open the booking page/ });
  await expect(fallback).toHaveAttribute("href", /metadata%5Bref%5D=fa-sdr-qa/);
  await expect(fallback).toHaveAttribute("href", /QA\+practice/);
  await page.getByRole("button", { name: "Edit context" }).click();
  await expect(page.getByLabel("Business or practice name")).toHaveValue("QA practice");
  await page.getByRole("button", { name: "Or go straight to the calendar" }).click();
  await expect(fallback).toBeVisible();
});
test("Video is user initiated and film tabs support keyboard", async ({ page }) => {
  await page.goto("/phone-agent");
  await expect(page.locator("video")).toHaveAttribute("preload", "none");
  expect(await page.locator("video").getAttribute("autoplay")).toBeNull();
  const first = page.getByRole("tab", { name: /Booking demonstration/ });
  await first.focus();
  await first.press("End");
  await expect(page.getByRole("tab", { name: /quick introduction/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await page.getByText("Read the full transcript (English)").click();
  await expect(page.locator(".fa-transcript div")).toBeVisible();
});
test("Optional analytics sends nothing before consent and stops after decline", async ({
  page,
}) => {
  const calls: string[] = [];
  await page.route("**/api/events", (r) => {
    calls.push(r.request().postData() ?? "");
    return r.fulfill({ status: 200, body: '{"stored":true}' });
  });
  await page.goto("/?utm_source=qa");
  expect(calls).toHaveLength(0);
  expect(await page.evaluate(() => sessionStorage.getItem("fa-journey"))).toBeNull();
  await page.getByRole("button", { name: "Allow analytics" }).click();
  await expect.poll(() => calls.length).toBeGreaterThan(0);
  await page.getByRole("button", { name: "Privacy choices" }).click();
  await page.getByRole("button", { name: "Keep analytics off" }).click();
  const count = calls.length;
  await page.goto("/about");
  expect(calls).toHaveLength(count);
  expect(await page.evaluate(() => sessionStorage.getItem("fa-journey"))).toBeNull();
});
test("Private CRM is protected and unavailable addresses have a recovery path", async ({
  page,
  request,
}) => {
  expect((await request.get("/api/crm/leads")).status()).toBe(401);
  await page.goto("/crm");
  await expect(page).toHaveURL(/\/crm\/login$/);
  const r = await page.goto("/not-a-real-page");
  expect(r?.status()).toBe(404);
  await expect(page.getByRole("link", { name: /Explore services/ })).toBeVisible();
});
