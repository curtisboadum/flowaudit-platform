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
  const events: { event: string; service: string }[] = [];
  await page.route("**/api/events", (r) => {
    events.push(JSON.parse(r.request().postData() ?? "{}"));
    return r.fulfill({ status: 200, body: '{"stored":true}' });
  });
  await page.getByRole("button", { name: "Allow analytics" }).click();
  await page.getByRole("link", { name: "Let’s talk", exact: true }).click();
  await expect
    .poll(() => events.some((e) => e.event === "book_click" && e.service === "phone-agent"))
    .toBe(true);
  await expect(page.locator("h1")).toContainText("your practice");
});
test("Video is user initiated and film tabs support keyboard", async ({ page }) => {
  await page.goto("/phone-agent");
  await expect(page.locator('video[data-media-id="overview"]')).toHaveAttribute("preload", "none");
  expect(await page.locator('video[data-media-id="overview"]').getAttribute("autoplay")).toBeNull();
  await page.getByText("More detail: walkthrough and executive overview", { exact: true }).click();
  const first = page.getByRole("tab", { name: /full walkthrough/ });
  await first.focus();
  await first.press("End");
  await expect(page.getByRole("tab", { name: /Executive overview/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await page
    .locator('video[data-media-id="summary"]')
    .locator("..")
    .locator("..")
    .getByText("Read the full transcript (English)")
    .click();
  await expect(page.locator(".fa-media-context .fa-transcript div:visible")).toHaveCount(1);
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
  const video = page.locator('video[data-media-id="overview"]');
  await expect(video).toHaveAttribute("data-media-id", "overview");
  await page.setViewportSize({ width: 390, height: 844 });
  const player = await video.boundingBox();
  expect(player).not.toBeNull();
  // Native controls need their own area below the 16:9 picture on narrow screens.
  expect(player!.height - (player!.width * 9) / 16).toBeGreaterThanOrEqual(60);
  await video.evaluate((node: HTMLVideoElement) => {
    node.muted = true;
    return node.play();
  });
  await expect
    .poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeGreaterThan(1);
  expect(await video.evaluate((node: HTMLVideoElement) => node.duration)).toBeCloseTo(90, 0);
  expect(
    await video.evaluate((node: HTMLVideoElement) => [node.videoWidth, node.videoHeight]),
  ).toEqual([1920, 1080]);
  await video.evaluate((node: HTMLVideoElement) => node.pause());
  await video.evaluate((node: HTMLVideoElement) => node.play());
  await expect.poll(() => events.filter((event) => event === "video_start").length).toBe(1);
  await expect(page.getByRole("navigation", { name: "Film chapters" })).toBeVisible();
  await page.getByRole("button", { name: /Setup and your next step/ }).click();
  await expect
    .poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeGreaterThan(63.9);
  expect(events.filter((event) => /^video_(25|50|75|complete)$/.test(event))).toEqual([]);
  await video.evaluate((node: HTMLVideoElement) => node.pause());
  await expect(video.locator("track")).toHaveCount(0);
  await expect(
    page.locator("#demo").getByRole("link", { name: "Download captions" }),
  ).toHaveAttribute("href", "/media/overview.vtt");
  await expect(page.locator("#demo").getByRole("link", { name: "Captions (SRT)" })).toHaveAttribute(
    "href",
    "/media/overview.srt",
  );
  await page
    .locator("#demo")
    .getByText("Read the full transcript (English)", { exact: true })
    .click();
  await expect(page.locator("#demo")).toContainText(
    "FlowAudit builds AI phone agents that support your team through agreed workflows.",
  );
  for (const extension of ["vtt", "srt", "-transcript.txt"]) {
    const path = extension.startsWith("-")
      ? `/media/overview${extension}`
      : `/media/overview.${extension}`;
    const response = await page.request.get(path);
    expect(response.ok()).toBe(true);
    const contents = (await response.text()).replace(/\s+/g, " ");
    expect(contents).toContain("FlowAudit builds AI phone agents");
    expect(contents).not.toContain("Flow Audit is an AI phone agent");
  }
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
    .locator('video[data-media-id="overview"]')
    .evaluate((node: HTMLVideoElement) => void node.play().catch(() => {}));
  await expect(page.locator(".fa-media-context [role=alert]")).toContainText("Video unavailable");
  await page
    .locator("#demo")
    .getByText("Read the full transcript (English)", { exact: true })
    .click();
  await expect(page.locator(".fa-media-context .fa-transcript div:visible")).toHaveCount(1);
  await page.route("**/embed/embed.js", (r) => r.abort());
  await page.goto("/book?service=phone-agent");
  await expect(page.getByRole("link", { name: /Open the booking page/ })).toBeVisible();
  await expect(page.getByRole("status")).toContainText("taking longer", { timeout: 15000 });
});

test("Landscape evidence uses comfortable viewing width across breakpoints", async ({ page }) => {
  await page.goto("/phone-agent");
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const box = await page.locator('video[data-media-id="overview"]').boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThanOrEqual(width < 768 ? width - 44 : width < 1024 ? 650 : 900);
    expect((box!.height - 64) / box!.width).toBeCloseTo(9 / 16, 2);
    await expect(page.getByRole("navigation", { name: "Film chapters" })).toBeVisible();
    expect(
      await page
        .locator('video[data-media-id="overview"]')
        .evaluate((node) => getComputedStyle(node).objectFit),
    ).toBe("contain");
  }
  await page.goto("/");
  const poster = page.locator(".fa-art-screen img");
  await expect(poster).toHaveAttribute("width", "1920");
  await expect
    .poll(() => poster.evaluate((node: HTMLImageElement) => node.naturalWidth))
    .toBeGreaterThan(0);
  const posterBox = await poster.boundingBox();
  expect(posterBox!.height / posterBox!.width).toBeCloseTo(9 / 16, 2);
});

test("Generic booking keeps service editable after selecting the phone offer", async ({ page }) => {
  await page.route("**/cal.com/embed.js", (route) => route.abort());
  await page.goto("/book");
  await page.getByText("Add context for the call (optional)", { exact: true }).click();
  const select = page.getByRole("combobox", { name: "I’m interested in", exact: true });
  for (const service of [
    "phone-agent",
    "automation",
    "revenue-recovery",
    "web-design",
    "general",
  ]) {
    await select.selectOption(service);
    await expect(select).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Open the booking page in a new tab" }),
    ).toHaveAttribute("href", new RegExp(`metadata%5Bservice%5D=${service}`));
  }
});

test("Chapters preserve paused state and work before first playback", async ({ page }) => {
  await page.goto("/phone-agent");
  await page.getByRole("button", { name: "Keep analytics off" }).click();
  const video = page.locator('video[data-media-id="overview"]');
  await page.getByRole("button", { name: /Requirements and boundaries/ }).click();
  expect(await video.evaluate((node: HTMLVideoElement) => node.paused)).toBe(true);
  await video.evaluate((node: HTMLVideoElement) => {
    node.muted = true;
    return node.play();
  });
  await expect
    .poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeGreaterThan(38);
  await video.evaluate((node: HTMLVideoElement) => node.pause());
  await page.getByRole("button", { name: /Offer and evidence/ }).click();
  await expect
    .poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeCloseTo(0, 1);
  expect(await video.evaluate((node: HTMLVideoElement) => node.paused)).toBe(true);
  await expect(page.locator('#demo .fa-chapters button[aria-current="true"]')).toContainText(
    "Offer and evidence",
  );
});

test("Slow media offers transcript and optional booking recovery", async ({ page }) => {
  await page.goto("/phone-agent");
  await page.getByRole("button", { name: "Keep analytics off" }).click();
  await page.clock.install();
  await page.locator('video[data-media-id="overview"]').dispatchEvent("waiting");
  await page.clock.fastForward(8100);
  await expect(page.getByRole("status")).toContainText("Video loading slowly");
  await page
    .locator("#demo")
    .getByText("Read the full transcript (English)", { exact: true })
    .click();
  await expect(page.locator(".fa-media-context .fa-transcript div:visible")).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Book a demo & fit assessment" })).toBeVisible();
});

test("Overview and genuine demo have reciprocal links, independent playback and unique IDs", async ({
  page,
}) => {
  await page.goto("/phone-agent");
  await page.getByRole("button", { name: "Keep analytics off" }).click();
  const overview = page.locator('video[data-media-id="overview"]');
  const routine = page.locator('video[data-media-id="routine"]');
  await page.getByRole("link", { name: "Watch the genuine booking recording" }).click();
  await expect(page).toHaveURL(/#booking-recording$/);
  await routine.evaluate((v: HTMLVideoElement) => {
    v.muted = true;
    return v.play();
  });
  await expect
    .poll(() => routine.evaluate((v: HTMLVideoElement) => v.currentTime))
    .toBeGreaterThan(0);
  await page.getByRole("link", { name: "Back to the 90-second overview" }).click();
  await expect(page).toHaveURL(/#demo$/);
  await overview.evaluate((v: HTMLVideoElement) => {
    v.muted = true;
    return v.play();
  });
  await expect.poll(() => routine.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  await overview.evaluate((v: HTMLVideoElement) => v.pause());
  await page.getByText("More detail: walkthrough and executive overview", { exact: true }).click();
  await expect(page.getByRole("button", { name: /Recorded booking/ })).toBeVisible();
  const ids = await page.locator("[id]").evaluateAll((nodes) => nodes.map((n) => n.id));
  expect(ids.length).toBe(new Set(ids).size);
  for (const media of ["overview", "routine", "main"]) {
    const response = await page.request.get(`/media/${media}.vtt`);
    expect(response.ok()).toBe(true);
    expect(await response.text()).toContain("WEBVTT");
    expect((await page.request.get(`/media/${media}-transcript.txt`)).ok()).toBe(true);
  }
});
