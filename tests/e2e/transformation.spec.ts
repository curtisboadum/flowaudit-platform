import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/phone-agent",
  "/industries/home-services",
  "/industries/trades",
  "/industries/automotive",
  "/industries/property",
  "/industries/it-services",
  "/trust",
  "/demos",
];
for (const width of [390, 768, 1440])
  for (const path of routes)
    test(`Call-first journey ${path} at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.route("**/*", (route) => {
        const u = new URL(route.request().url());
        if (u.origin !== "http://127.0.0.1:3016") return route.abort();
        if (!["GET", "HEAD"].includes(route.request().method()))
          return route.fulfill({ status: 204 });
        return route.continue();
      });
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      await expect(page.locator('a[href^="/book"]').first()).toBeVisible();
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
            .analyze()
        ).violations,
      ).toEqual([]);
      const body = await page.locator("body").innerText();
      expect(body).not.toMatch(/[$£]\s*\d|per month|Every call answered|Every patient booked/i);
      await page.screenshot({
        path: `docs/transformation/evidence/${path === "/" ? "home" : path.replaceAll("/", "-")}-${width}.png`,
        fullPage: true,
      });
    });
test("Reduced motion, consent and privacy boundaries", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(
    true,
  );
  expect(
    await page.locator(".fa-consent").evaluate((node) => getComputedStyle(node).position),
  ).toBe("static");
  await page.getByRole("button", { name: "Keep analytics off" }).click();
  await page.keyboard.press("Tab");
  await expect(page.locator('a[href*="908fad"]')).toHaveCount(0);
  const privateResponse = await page.request.get("/demo/showcase");
  expect(privateResponse.headers()["x-robots-tag"]).toContain("noindex");
  expect((await page.request.get("/media/main.mp4")).status()).toBe(404);
});
