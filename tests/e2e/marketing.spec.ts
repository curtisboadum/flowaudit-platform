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
test("Calendar is immediate; optional context retains drafts and attribution", async ({ page }) => {
  await page.route("**/embed/embed.js", (r) =>
    r.fulfill({ body: "", contentType: "application/javascript" }),
  );
  await page.goto("/book?service=phone-agent&ref=fa-sdr-qa&utm_source=qa");
  await expect(page.getByRole("link", { name: "Let’s talk", exact: true })).toHaveAttribute(
    "href",
    "#booking-calendar",
  );
  const fallback = page.getByRole("link", { name: /Open the booking page/ });
  await expect(fallback).toBeVisible();
  await expect(fallback).toHaveAttribute("href", /metadata%5Bservice%5D=phone-agent/);
  await page.getByText("Add context for the call (optional)", { exact: true }).click();
  await page.getByLabel("Business or practice name (optional)").fill("QA practice");
  await page.getByLabel("Your role (optional)").selectOption("Practice manager");
  await page.getByLabel("Scheduling system (optional)").fill("Not sure");
  await page.getByLabel("What would you like to improve? (optional)").fill("Booking fit");
  await page.getByRole("button", { name: "Use this context" }).click();
  await expect(fallback).toHaveAttribute("href", /metadata%5Bref%5D=fa-sdr-qa/);
  await expect(fallback).toHaveAttribute("href", /QA\+practice/);
  await page.getByText("Add context for the call (optional)", { exact: true }).click();
  await expect(page.getByLabel("Business or practice name (optional)")).toHaveValue("QA practice");
  await expect(page.locator("form [required]")).toHaveCount(0);
});
test("Video is user initiated and film tabs support keyboard", async ({ page }) => {
  await page.goto("/phone-agent");
  await expect(page.locator("video")).toHaveAttribute("preload", "none");
  expect(await page.locator("video").getAttribute("autoplay")).toBeNull();
  const first = page.getByRole("tab", { name: /full walkthrough/ });
  await first.focus();
  await first.press("End");
  await expect(page.getByRole("tab", { name: /Executive overview/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await page.getByText("Read the full transcript (English)").click();
  await expect(page.locator(".fa-media-context .fa-transcript div")).toBeVisible();
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

for (const width of [360, 390, 768, 1024, 1440]) {
  for (const route of ["/phone-agent", "/book?service=phone-agent"]) {
    test(`Phone funnel responsive and accessible: ${route} at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.route("**/embed/embed.js", (r) =>
        r.fulfill({ body: "", contentType: "application/javascript" }),
      );
      await page.goto(route);
      await page.getByRole("button", { name: "Keep analytics off" }).click();
      await expect(page.locator("h1")).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      const { default: AxeBuilder } = await import("@axe-core/playwright");
      const accessibility = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(accessibility.violations).toEqual([]);
      await page.screenshot({
        path: `docs/redesign/evidence/phone-funnel-${route.startsWith("/book") ? "book" : "offer"}-${width}.png`,
        fullPage: true,
      });
    });
  }
}

test("The approved VSL decodes and plays; chapters do not assert watched milestones", async ({
  page,
}) => {
  const events: string[] = [];
  await page.route("**/api/events", (r) => {
    events.push(JSON.parse(r.request().postData() ?? "{}").event);
    return r.fulfill({ status: 200, body: '{"stored":true}' });
  });
  await page.goto("/phone-agent");
  await page.getByRole("button", { name: "Allow analytics" }).click();
  const video = page.locator("video");
  await expect(video).toHaveAttribute("data-media-id", "main");
  await video.evaluate((node: HTMLVideoElement) => {
    node.muted = true;
    return node.play();
  });
  await expect
    .poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeGreaterThan(1);
  expect(await video.evaluate((node: HTMLVideoElement) => node.duration)).toBeCloseTo(300, 0);
  await video.evaluate((node: HTMLVideoElement) => node.pause());
  await video.evaluate((node: HTMLVideoElement) => node.play());
  await expect.poll(() => events.filter((event) => event === "video_start").length).toBe(1);
  await page.getByText("Jump to a chapter", { exact: true }).click();
  await page.getByRole("button", { name: /Your 15-minute call/ }).click();
  await expect
    .poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeGreaterThan(267);
  expect(events.filter((event) => /^video_(25|50|75|complete)$/.test(event))).toEqual([]);
  await video.evaluate((node: HTMLVideoElement) => node.pause());
  await expect(video.locator("track")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Download captions" })).toHaveAttribute(
    "href",
    "/media/main.vtt",
  );
});

test("Provider readiness and booking status are distinct; no client booking conversion is emitted", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const callbacks: Record<string, (event: unknown) => void> = {};
    const api = (
      action: string,
      options: { action: string; callback: (event: unknown) => void },
    ) => {
      if (action === "on") callbacks[options.action] = options.callback;
    };
    Object.assign(window, {
      Cal: Object.assign(() => {}, { ns: { "flowaudit-call": api } }),
      qaCal: callbacks,
    });
  });
  const events: string[] = [];
  await page.route("**/api/events", (r) => {
    events.push(JSON.parse(r.request().postData() ?? "{}").event);
    return r.fulfill({ status: 200, body: '{"stored":true}' });
  });
  await page.goto("/book?service=phone-agent");
  await page.getByRole("button", { name: "Allow analytics" }).click();
  await expect(page.getByRole("link", { name: /Open the booking page/ })).toBeVisible();
  expect(events).not.toContain("calendar_ready");
  const signal = (name: string, data = {}) =>
    page.evaluate(
      ({ name, data }) => {
        const callbacks = (window as unknown as { qaCal: Record<string, (event: unknown) => void> })
          .qaCal;
        callbacks[name]?.({ detail: { data } });
      },
      { name, data },
    );
  await expect
    .poll(() =>
      page.evaluate(() => Object.keys((window as unknown as { qaCal: object }).qaCal).length),
    )
    .toBeGreaterThan(0);
  await signal("bookerReady");
  await signal("bookerReady");
  await expect.poll(() => events.filter((event) => event === "calendar_ready").length).toBe(1);
  await signal("bookingSuccessfulV2", {
    uid: "fixture",
    status: "PENDING",
    paymentRequired: false,
  });
  await expect(
    page.getByRole("heading", { name: "Booking request received by Cal" }),
  ).toBeVisible();
  await signal("bookingSuccessfulV2", {
    uid: "fixture",
    status: "ACCEPTED",
    paymentRequired: false,
  });
  await expect(page.getByRole("heading", { name: "Booking confirmed by Cal" })).toBeVisible();
  expect(events.some((event) => /booked|booking_complete/.test(event))).toBe(false);
});

test("Unavailable video and calendar expose recovery options", async ({ page }) => {
  await page.route("**/media/*.mp4", (r) => r.abort());
  await page.goto("/phone-agent");
  await page
    .locator("video")
    .evaluate((node: HTMLVideoElement) => void node.play().catch(() => {}));
  await expect(page.locator(".fa-media-context [role=alert]")).toContainText("Video unavailable");
  await page.getByText("Read the full transcript (English)", { exact: true }).click();
  await expect(page.locator(".fa-media-context .fa-transcript div")).toBeVisible();
  await page.route("**/embed/embed.js", (r) => r.abort());
  await page.goto("/book?service=phone-agent");
  await expect(page.getByRole("link", { name: /Open the booking page/ })).toBeVisible();
  await expect(page.getByRole("status")).toContainText("taking longer", { timeout: 15000 });
});
