import { expect, test } from "@playwright/test";
import metadata from "../../src/lib/film-metadata.json";

test.beforeEach(async ({ page }) => {
  await page.route("**/*", (r) => {
    const u = new URL(r.request().url());
    if (u.origin !== new URL(test.info().project.use.baseURL!).origin) return r.abort();
    if (!["GET", "HEAD"].includes(r.request().method())) return r.fulfill({ status: 204 });
    return r.continue();
  });
  await page.addInitScript(() => localStorage.setItem("fa-analytics-consent", "rejected"));
});
for (const width of [390, 768, 1440])
  test(`In-frame CTA, keyboard, fullscreen and restored position at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/industries/dental?ref=fa-sdr-qa&utm_source=qa");
    const video = page.locator('video[data-media-id="overview"]');
    const cta = page.getByRole("link", { name: /Seen enough/ });
    await expect(cta).toHaveCount(0);
    await video.evaluate(async (v: HTMLVideoElement) => {
      v.load();
      if (v.readyState < 1)
        await new Promise<void>((r) =>
          v.addEventListener("loadedmetadata", () => r(), { once: true }),
        );
    });
    await video.evaluate((v: HTMLVideoElement, t) => {
      v.currentTime = t;
      v.dispatchEvent(new Event("timeupdate"));
    }, metadata.opening + 1);
    await expect(cta).toBeVisible();
    const a = (await cta.boundingBox())!,
      b = (await video.boundingBox())!;
    expect(a.x).toBeGreaterThanOrEqual(b.x);
    expect(a.x + a.width).toBeLessThanOrEqual(b.x + b.width);
    expect(a.y + a.height).toBeLessThan(b.y + b.height - 40);
    expect(a.y + a.height).toBeLessThanOrEqual(b.y + 60); // action band is above the actual film and baked captions
    const fs = page.getByRole("button", { name: "Fullscreen player", exact: true });
    await fs.click();
    await expect
      .poll(() =>
        page.evaluate(() => document.fullscreenElement?.classList.contains("fa-player-frame")),
      )
      .toBe(true);
    await expect(cta).toBeVisible();
    await page.keyboard.press("Escape");
    await expect.poll(() => page.evaluate(() => document.fullscreenElement === null)).toBe(true);
    await expect(fs).toBeFocused();
    await cta.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/entry=vsl/);
    await expect(
      page.getByRole("heading", { name: "Choose your time", exact: true }),
    ).toBeVisible();
    await page.goBack();
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
      .toBeGreaterThan(metadata.opening);
    expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  });

test("Both genuine full demos are visible, deferred, and exclusive", async ({ page }) => {
  await page.goto("/industries/dental");
  const routine = page.locator('video[data-media-id="routine"]'),
    urgent = page.locator('video[data-media-id="urgent"]');
  for (const v of [routine, urgent]) {
    await expect(v).toBeVisible();
    expect(await v.getAttribute("preload")).toBe("none");
    expect(await v.locator("track").count()).toBe(0);
  }
  await routine.evaluate(async (v: HTMLVideoElement) => {
    v.muted = true;
    await v.play();
  });
  expect(await routine.evaluate((v: HTMLVideoElement) => v.duration)).toBeCloseTo(90.833, 1);
  await urgent.evaluate(async (v: HTMLVideoElement) => {
    v.muted = true;
    await v.play();
  });
  expect(await urgent.evaluate((v: HTMLVideoElement) => v.duration)).toBeCloseTo(161.609, 1);
  expect(await routine.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  await urgent.evaluate((v: HTMLVideoElement) => v.pause());
});

test("Touch, resize and unavailable wrapper fullscreen keep a working route", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
  });
  await context.route("**/*", (r) => {
    if (new URL(r.request().url()).origin !== new URL(test.info().project.use.baseURL!).origin)
      return r.abort();
    if (!["GET", "HEAD"].includes(r.request().method())) return r.fulfill({ status: 204 });
    return r.continue();
  });
  await context.addInitScript(() => {
    localStorage.setItem("fa-analytics-consent", "rejected");
    Object.defineProperty(document, "fullscreenEnabled", { get: () => false });
  });
  const p = await context.newPage();
  await p.goto(new URL("/industries/dental", test.info().project.use.baseURL).toString());
  const v = p.locator('video[data-media-id="overview"]');
  await v.evaluate(async (v: HTMLVideoElement) => {
    v.load();
    await new Promise<void>((r) => v.addEventListener("loadedmetadata", () => r(), { once: true }));
    v.currentTime = 30;
    v.dispatchEvent(new Event("timeupdate"));
  });
  const cta = p.getByRole("link", { name: /Seen enough/ });
  await expect(cta).toBeVisible();
  await expect(p.getByRole("button", { name: "Fullscreen player", exact: true })).toHaveCount(0);
  await expect(
    p.locator(".fa-media-shell").first().getByRole("link", { name: "book a demo", exact: true }),
  ).toBeVisible();
  await p.setViewportSize({ width: 768, height: 900 });
  await expect(cta).toBeVisible();
  await p.setViewportSize({ width: 390, height: 844 });
  await cta.tap();
  await expect(p.getByRole("heading", { name: "Choose your time", exact: true })).toBeVisible();
  await context.close();
});

test("Overview reserves separate space for actions and native controls", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/industries/dental");
  const video = page.locator('video[data-media-id="overview"]');
  async function reserves() {
    const layout = await video.evaluate((node) => {
      const s = getComputedStyle(node),
        box = node.getBoundingClientRect();
      return {
        top: parseFloat(s.paddingTop),
        bottom: parseFloat(s.paddingBottom),
        width: box.width,
        height: box.height,
      };
    });
    expect(layout.top).toBeGreaterThanOrEqual(60);
    expect(layout.bottom).toBeGreaterThanOrEqual(52);
    return layout;
  }
  const layout = await reserves();
  expect((layout.height - layout.top - layout.bottom) / layout.width).toBeCloseTo(9 / 16, 2);
  await page.getByRole("button", { name: "Fullscreen player", exact: true }).click();
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
  await reserves();
  await page.keyboard.press("Escape");
});

test("Off-screen demonstration posters wait until the viewer approaches them", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const posters: string[] = [];
  page.on("request", (request) => {
    if (/\/media\/(overview|routine|urgent)\.jpg/.test(request.url())) posters.push(request.url());
  });
  await page.goto("/industries/dental");
  await expect.poll(() => posters.some((url) => url.includes("overview.jpg"))).toBe(true);
  expect(posters.some((url) => /\/(routine|urgent)\.jpg/.test(url))).toBe(false);
  await page.locator('video[data-media-id="urgent"]').scrollIntoViewIfNeeded();
  await expect.poll(() => posters.some((url) => url.includes("urgent.jpg"))).toBe(true);
});
