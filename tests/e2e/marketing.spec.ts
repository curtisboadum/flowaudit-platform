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
test("Calendar selection survives optional guidance, consent and query navigation", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const state = { mounts: 0 };
    const api = (instruction: string, options: { elementOrSelector?: string }) => {
      if (instruction !== "inline" || !options.elementOrSelector) return;
      state.mounts++;
      const frame = document.createElement("iframe");
      frame.title = "Book a 15-minute FlowAudit call";
      frame.srcdoc = "<p>Scheduling test double: no booking is created.</p>";
      document.querySelector(options.elementOrSelector)?.append(frame);
    };
    Object.assign(window, {
      qaCalendar: state,
      Cal: Object.assign(() => {}, { ns: { "flowaudit-call": api } }),
    });
  });
  await page.goto("/book?service=phone-agent&ref=fa-sdr-qa&utm_source=qa");
  const frame = page.locator('iframe[title="Book a 15-minute FlowAudit call"]');
  await expect(frame).toBeVisible();
  await frame.evaluate((node) => node.setAttribute("data-selected-slot", "synthetic-slot"));
  const mounts = () =>
    page.evaluate(
      () => (window as unknown as { qaCalendar: { mounts: number } }).qaCalendar.mounts,
    );
  expect(await mounts()).toBe(1);
  await page.getByText("What to add in Additional notes (optional)", { exact: true }).click();
  await expect(page.locator(".fa-book-context")).toContainText(
    "industry, main call-handling problem",
  );
  await page.getByRole("button", { name: "Allow analytics" }).click();
  await page.getByRole("button", { name: "Privacy choices" }).click();
  await page.getByRole("button", { name: "Keep analytics off" }).click();
  // Exercise a real Next client navigation by clicking an existing internal footer link.
  // The mounted session keeps its initial service/context until a fresh page visit.
  await page.getByRole("link", { name: "Book a call", exact: true }).last().click();
  await expect(frame).toHaveAttribute("data-selected-slot", "synthetic-slot");
  expect(await mounts()).toBe(1);
  await expect(page.locator("#booking-calendar form")).toHaveCount(0);
  const fallback = page.getByRole("link", { name: /Open the booking page/ });
  await expect(fallback).toHaveAttribute("href", /metadata%5Bref%5D=fa-sdr-qa/);
  await expect(fallback).toHaveAttribute("href", /metadata%5Bservice%5D=phone-agent/);
});
test("Dental library video is user initiated and evidence remains keyboard accessible", async ({
  page,
}) => {
  await page.goto("/demos");
  const video = page.locator(".fa-media-frame video");
  await expect(video).toHaveCount(1);
  await expect(video).toHaveAttribute("preload", "none");
  expect(await video.getAttribute("autoplay")).toBeNull();
  const evidence = page.locator(".fa-media-transcript");
  await evidence.locator("summary").first().focus();
  await page.keyboard.press("Enter");
  await expect(evidence).toHaveAttribute("open", "");
  await evidence.locator(".fa-transcript > summary").click();
  await expect(evidence.locator('[lang="en"]')).toBeVisible();
  await expect(evidence.getByRole("link", { name: /Download transcript/ })).toHaveAttribute(
    "href",
    "/media/routine-transcript.txt",
  );
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

test("Actual routine demo decodes; seeking is not watched engagement", async ({ page }) => {
  const events: string[] = [];
  await page.route("**/api/events", (r) => {
    events.push(JSON.parse(r.request().postData() ?? "{}").event);
    return r.fulfill({ status: 200, body: '{"stored":true}' });
  });
  await page.goto("/industries/dental");
  await page.getByRole("button", { name: "Allow analytics" }).click();
  const video = page.locator(".fa-media-frame video");
  await expect(video).toHaveCount(1);
  await expect(video).toHaveAttribute("data-media-id", "routine");
  await video.evaluate((node: HTMLVideoElement) => {
    node.muted = true;
    return node.play();
  });
  await expect
    .poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeGreaterThan(1);
  expect(await video.evaluate((node: HTMLVideoElement) => node.duration)).toBeCloseTo(90.833, 1);
  expect(
    await video.evaluate((node: HTMLVideoElement) => [node.videoWidth, node.videoHeight]),
  ).toEqual([1920, 1080]);
  await video.evaluate((node: HTMLVideoElement) => node.pause());
  await video.evaluate((node: HTMLVideoElement) => node.play());
  await expect.poll(() => events.filter((event) => event === "video_start").length).toBe(1);
  await video.evaluate((node: HTMLVideoElement) => {
    node.pause();
    node.dispatchEvent(new Event("seeking"));
    node.currentTime = 75;
    node.dispatchEvent(new Event("seeked"));
    node.dispatchEvent(new Event("timeupdate"));
  });
  expect(events.filter((event) => /^video_(25|50|75|complete)$/.test(event))).toEqual([]);
  await expect(page.getByRole("navigation", { name: "Film chapters" })).toHaveCount(0);
  await expect(video.locator("track")).toHaveCount(0);
  const evidence = page.locator(".fa-media-transcript");
  await evidence.locator("summary").first().click();
  const transcript = await page.request.get("/media/routine-transcript.txt");
  expect(transcript.ok()).toBe(true);
  expect((await evidence.locator('[lang="en"]').textContent())?.trim()).toBe(
    (await transcript.text()).trim(),
  );
  await expect(evidence.getByRole("link", { name: /Download captions/ })).toHaveAttribute(
    "href",
    "/media/routine.vtt",
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

test("Unavailable routine video and calendar expose recovery options", async ({ page }) => {
  await page.route("**/media/*.mp4*", (r) => r.abort());
  await page.goto("/industries/dental");
  await page
    .locator(".fa-media-frame video")
    .evaluate((node: HTMLVideoElement) => void node.play().catch(() => {}));
  await expect(page.locator(".fa-media-shell [role=alert]")).toContainText("Video unavailable");
  const evidence = page.locator(".fa-media-transcript");
  await evidence.locator("summary").first().click();
  await evidence.locator(".fa-transcript > summary").click();
  await expect(evidence.locator('[lang="en"]')).toBeVisible();
  await expect(evidence.getByRole("link", { name: "Open video", exact: true })).toHaveAttribute(
    "href",
    "/media/routine.mp4",
  );
  await page.route("**/embed/embed.js", (r) => r.abort());
  await page.goto("/book?service=phone-agent");
  await expect(page.getByRole("link", { name: /Open the booking page/ })).toBeVisible();
  await expect(page.getByRole("status")).toContainText("taking longer", { timeout: 15000 });
});

test("Routine recording fits the available width across breakpoints", async ({ page }) => {
  await page.goto("/industries/dental");
  const video = page.locator(".fa-media-frame video");
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const box = await video.boundingBox();
    expect(box).not.toBeNull();
    expect(box?.width).toBeGreaterThanOrEqual(280);
    expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(width);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await expect(video).toHaveAttribute("controls", "");
    await expect(video).toHaveAttribute("playsinline", "");
  }
  await expect(video).toHaveAttribute("poster", /routine-poster.webp/);
  await expect(page.getByRole("navigation", { name: "Film chapters" })).toHaveCount(0);
});

test("Booking uses Cal's native optional context field without a duplicate questionnaire", async ({
  page,
}) => {
  await page.route("**/embed/embed.js", (route) =>
    route.fulfill({ body: "", contentType: "application/javascript" }),
  );
  await page.goto("/book");
  await expect(page.getByRole("link", { name: /Open the booking page/ })).toBeVisible();
  await page.getByText("What to add in Additional notes (optional)", { exact: true }).click();
  await expect(page.locator(".fa-book-context")).toContainText(
    "no separate website form or calendar reload",
  );
  await expect(
    page.locator("#booking-calendar input, #booking-calendar textarea, #booking-calendar select"),
  ).toHaveCount(0);
});
test("Slow routine media offers visible transcript and booking recovery", async ({ page }) => {
  await page.goto("/industries/dental");
  await page.getByRole("button", { name: "Keep analytics off" }).click();
  await page.locator(".fa-media-frame video").dispatchEvent("waiting");
  await expect(page.getByRole("status")).toContainText("Video loading slowly", { timeout: 12000 });
  const evidence = page.locator(".fa-media-transcript");
  await evidence.locator("summary").first().click();
  await evidence.locator(".fa-transcript > summary").click();
  await expect(evidence.locator('[lang="en"]')).toBeVisible();
  await expect(page.locator(".fa-media-next-step a").first()).toBeVisible();
});

test("Retired sales and fee-bearing media stay unavailable; actual routine remains", async ({
  page,
}) => {
  await page.goto("/industries/dental");
  await expect(page.locator("main video")).toHaveCount(1);
  await expect(page.locator("main")).not.toContainText(
    /initial payment|payment starts|surcharge|executive overview|investment/i,
  );
  await expect(page.locator(".fa-media-shell [role=tablist]")).toHaveCount(0);
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  const schema = scripts.join(" ");
  const videoSchema = scripts
    .map((contents) => JSON.parse(contents) as Record<string, unknown>)
    .find((data) => data["@type"] === "VideoObject");
  expect(videoSchema).toMatchObject({
    contentUrl: "https://flowaudit.co.uk/media/routine.mp4",
    thumbnailUrl: "https://flowaudit.co.uk/media/routine.jpg",
    duration: "PT90.833333S",
    uploadDate: "2026-10-09T00:00:00Z",
  });
  expect(schema).not.toMatch(/\/media\/(overview|opening|urgent|summary|teaser|main)\.(mp4|jpg)/);
  const retired = ["main", "overview", "opening", "urgent", "summary", "teaser"];
  for (const media of retired) {
    for (const suffix of [".mp4", ".jpg", ".vtt", ".srt", "-transcript.txt"]) {
      expect(
        (await page.request.get(`/media/${media}${suffix}`)).status(),
        `${media}${suffix} retired`,
      ).toBe(404);
    }
  }
  for (const path of [
    "/assets/phone-agent/phone-agent-demo.mp4",
    "/assets/phone-agent/phone-agent-demo-poster.jpg",
  ]) {
    expect((await page.request.get(path)).status(), `${path} duplicate retired`).toBe(404);
  }
  // Read legacy showcase markup without executing its separate tracking script.
  for (const path of ["/demo/showcase", "/demo/showcase/dental", "/demo/showcase/dental/urgent"]) {
    const response = await page.request.get(path);
    expect(response.status(), `${path} remains available`).toBe(200);
    expect(response.headers()["x-robots-tag"]).toContain("noindex");
    const html = await response.text();
    expect(html, `${path} must not embed or link a retired urgent asset`).not.toMatch(
      /(?:src|href)=["'][^"']*(?:\/media\/urgent(?:[.\-])|\/assets\/phone-agent\/phone-agent-demo(?:[.\-]))/i,
    );
    if (path.endsWith("/urgent")) {
      expect(html).not.toMatch(/<video\b/i);
      expect(html).toMatch(/review|held|unavailable|not available/i);
    }
  }
  for (const path of [
    "/media/routine.mp4",
    "/media/routine.jpg",
    "/media/routine-poster.webp",
    "/media/routine.vtt",
    "/media/routine-transcript.txt",
  ]) {
    expect((await page.request.get(path)).ok(), `${path} retained`).toBe(true);
  }
  expect(await (await page.request.get("/media/routine.vtt")).text()).toContain("WEBVTT");
  const ids = await page.locator("[id]").evaluateAll((nodes) => nodes.map((node) => node.id));
  expect(ids.length).toBe(new Set(ids).size);
  for (const path of ["/", "/phone-agent"]) {
    await page.goto(path);
    await expect(page.locator("main video")).toHaveCount(0);
    await expect(page.locator(".fa-call-flow")).toContainText(
      "This is not a recorded demonstration",
    );
  }
});
