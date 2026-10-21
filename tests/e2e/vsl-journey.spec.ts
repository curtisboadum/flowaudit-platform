import { expect, test } from "@playwright/test";

// Historical filename retained; the public journey now uses only the actual routine call.
test.beforeEach(async ({ page }) => {
  await page.route("**/*", (route) => {
    const origin = new URL(test.info().project.use.baseURL ?? "http://localhost:3016").origin;
    if (new URL(route.request().url()).origin !== origin) return route.abort();
    if (!["GET", "HEAD"].includes(route.request().method())) return route.fulfill({ status: 204 });
    return route.continue();
  });
  await page.addInitScript(() => localStorage.setItem("fa-analytics-consent", "declined"));
});

for (const width of [390, 768, 1440]) {
  test(`Routine call has immediate booking, native controls and keyboard fullscreen at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/industries/dental?ref=fa-sdr-qa&utm_source=qa");
    const video = page.locator(".fa-media-frame video");
    await expect(video).toHaveCount(1);
    await expect(video).toHaveAttribute("data-media-id", "routine");
    await expect(video).toHaveAttribute("preload", "none");
    await expect(video).toHaveAttribute("controls", "");
    await expect(video).toHaveAttribute("playsinline", "");
    expect(await video.getAttribute("autoplay")).toBeNull();
    expect(await video.evaluate((node: HTMLVideoElement) => node.currentTime)).toBe(0);
    const cta = page.locator(".fa-media-next-step a").first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", /\/book\?.*service=phone-agent/);
    const evidence = page.locator(".fa-media-transcript");
    await expect(evidence).not.toHaveAttribute("open", "");
    await evidence.locator("summary").first().focus();
    await page.keyboard.press("Enter");
    await expect(evidence).toHaveAttribute("open", "");
    await evidence.locator(".fa-transcript > summary").click();
    await expect(evidence.locator('[lang="en"]')).toBeVisible();
    await evidence.locator("summary").first().press("Space");
    await expect(evidence).not.toHaveAttribute("open", "");
    const fullscreen = page.getByRole("button", { name: "Fullscreen player", exact: true });
    await fullscreen.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator(".fa-player-expanded")).toBeVisible();
    await expect(video).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator(".fa-player-expanded")).toHaveCount(0);
    await expect(fullscreen).toBeFocused();
    await cta.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/book\?.*service=phone-agent/);
    await expect(
      page.getByRole("heading", { name: "Choose your time", exact: true }),
    ).toBeVisible();
  });
}

test("Actual routine call has no chapters, film switcher or time-gated sales CTA", async ({
  page,
}) => {
  await page.goto("/industries/dental");
  await expect(page.locator("main video")).toHaveCount(1);
  await expect(page.locator(".fa-media-shell [role=tablist]")).toHaveCount(0);
  await expect(page.getByRole("navigation", { name: "Film chapters" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: /Seen enough/ })).toHaveCount(0);
  await expect(page.locator(".fa-media-next-step a").first()).toBeVisible();
  await expect(page.locator("main")).toContainText("1:31");
  await expect(page.locator("main")).toContainText(/privacy edits|privacy beeps/i);
  await expect(page.locator("main")).toContainText(/English captions|captions.*English/i);
  await expect(page.locator("main")).not.toContainText(
    /initial payment|surcharge|executive overview/i,
  );
  expect(
    await page.evaluate(() =>
      Object.keys(sessionStorage).filter((key) => key.startsWith("fa-playback:")),
    ),
  ).toEqual([]);
});

test("Touch and viewport changes preserve a direct booking route", async ({ browser }) => {
  const baseURL = test.info().project.use.baseURL ?? "http://localhost:3016";
  const context = await browser.newContext({
    baseURL,
    viewport: { width: 390, height: 844 },
    hasTouch: true,
  });
  await context.route("**/*", (route) => {
    if (new URL(route.request().url()).origin !== new URL(baseURL).origin) return route.abort();
    if (!["GET", "HEAD"].includes(route.request().method())) return route.fulfill({ status: 204 });
    return route.continue();
  });
  await context.addInitScript(() => {
    localStorage.setItem("fa-analytics-consent", "declined");
    Object.defineProperty(document, "fullscreenEnabled", { get: () => false });
  });
  const page = await context.newPage();
  await page.goto("/industries/dental");
  const cta = page.locator(".fa-media-next-step a").first();
  await expect(cta).toBeVisible();
  await page.setViewportSize({ width: 768, height: 900 });
  await expect(cta).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await cta.tap();
  await expect(page.getByRole("heading", { name: "Choose your time", exact: true })).toBeVisible();
  await context.close();
});

test("Routine poster is discoverable immediately without requesting retired films", async ({
  page,
}) => {
  const retiredRequests: string[] = [];
  page.on("request", (request) => {
    if (/\/media\/(overview|opening|urgent|summary|teaser|main)(?:[.\-])/.test(request.url()))
      retiredRequests.push(request.url());
  });
  const response = await page.goto("/industries/dental");
  expect(await response?.text()).toContain("routine-poster.webp");
  const video = page.locator(".fa-media-frame video");
  await expect(video).toHaveAttribute("poster", /routine-poster.webp/);
  expect(retiredRequests).toEqual([]);
});
