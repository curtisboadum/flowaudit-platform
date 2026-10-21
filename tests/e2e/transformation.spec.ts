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
        if (u.origin !== new URL(test.info().project.use.baseURL ?? "http://localhost:3016").origin)
          return route.abort();
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

test("New visitor journeys have complete Spanish website copy and disclose English recordings", async ({
  page,
}) => {
  for (const [route, heading] of [
    ["/industries/home-services", "En pleno trabajo"],
    ["/industries/automotive", "Mantén el taller"],
    ["/industries/property", "Un siguiente paso"],
    ["/industries/it-services", "Comprende la consulta"],
    ["/trust", "Comprende qué está demostrado"],
    ["/demos", "Escucha la necesidad"],
    ["/book?service=phone-agent", "Reserva tu llamada"],
  ]) {
    await page.route("**/embed/embed.js", (r) =>
      r.fulfill({ body: "", contentType: "application/javascript" }),
    );
    await page.goto(route + (route?.includes("?") ? "&" : "?") + "lang=es");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator("h1")).toContainText(heading ?? "");
    expect(await page.locator('main section[lang="en"],main article[lang="en"]').count()).toBe(0);
  }
  await page.goto("/demos?lang=es");
  await expect(page.locator("main")).toContainText("subtítulos visibles en inglés");
  await expect(page.locator("main")).not.toContainText("Review in progress");
});

test("Booking prioritizes scheduling and product adds workflow detail", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.route("**/embed/embed.js", (r) =>
    r.fulfill({ body: "", contentType: "application/javascript" }),
  );
  await page.goto("/book?service=phone-agent");
  const schedule = await page
    .getByRole("heading", { name: "Choose your time", exact: true })
    .boundingBox();
  expect(schedule?.y).toBeLessThan(480);
  await expect(page.locator(".fa-book-expectations")).not.toHaveAttribute("open", "");
  const prep = await page.locator(".fa-book-expectations").boundingBox();
  expect(prep?.y).toBeGreaterThan(schedule?.y ?? 0);
  await page.goto("/");
  const homeHeading = await page.locator("h1").innerText();
  await expect(page.locator(".fa-hero-audience")).toContainText("Home services first");
  await expect(page.locator("main video")).toHaveCount(0);
  await expect(page.locator(".fa-call-flow")).toContainText("This is not a recorded demonstration");
  await page.goto("/demos");
  const details = page.locator(".fa-evidence-details");
  await expect(details).not.toHaveAttribute("open", "");
  await details.locator("summary").first().focus();
  await page.keyboard.press("Enter");
  await expect(details).toHaveAttribute("open", "");
  await page.goto("/phone-agent");
  expect(await page.locator("h1").innerText()).not.toBe(homeHeading);
  await expect(page.locator("main video")).toHaveCount(0);
  await expect(page.locator("#call-workflow article")).toHaveCount(4);
  await expect(
    page.getByRole("heading", { name: "Check the connections before the first live call." }),
  ).toBeVisible();
  await page.goto("/industries/home-services");
  await expect(page.locator("main .fa-hero-actions .fa-button").first()).toHaveAttribute(
    "href",
    "/demos#industry-recordings",
  );
});
