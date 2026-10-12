import { expect, test } from "@playwright/test";
import metadata from "../../src/lib/film-metadata.json";
import { qualificationOptions } from "../../src/lib/vsl-qualification";

test.beforeEach(async ({ page }) => {
  await page.route("**/*", (r) => {
    const u = new URL(r.request().url());
    if (u.origin !== new URL(test.info().project.use.baseURL!).origin) return r.abort();
    if (!["GET", "HEAD"].includes(r.request().method())) return r.fulfill({ status: 204 });
    return r.continue();
  });
  await page.addInitScript(() => localStorage.setItem("fa-analytics-consent", "rejected"));
});
const qualify = "/book?service=phone-agent&entry=vsl&ref=fa-sdr-qa&utm_source=qa";
async function next(page: import("@playwright/test").Page) {
  await page.getByRole("button", { name: "Continue", exact: true }).click();
}
async function choose(page: import("@playwright/test").Page, name: string) {
  await page.getByRole("radio", { name, exact: true }).check();
}

for (const width of [390, 768, 1440])
  test(`In-frame CTA, keyboard, fullscreen and restored position at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/phone-agent?ref=fa-sdr-qa&utm_source=qa");
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
    await expect(page.getByRole("heading", { name: "What kind of practice?" })).toBeVisible();
    await page.goBack();
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
      .toBeGreaterThan(metadata.opening);
    expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  });

const scenarios = qualificationOptions.practiceType.flatMap((practice) =>
  qualificationOptions.supportNeed.flatMap((need) =>
    qualificationOptions.readiness.map((readiness) => [practice, need, readiness] as const),
  ),
);
for (const [practice, need, ready] of scenarios)
  test(`Qualification: ${practice}, ${need}, ${ready}`, async ({ page }) => {
    await page.goto(qualify);
    await next(page);
    await expect(page.locator("#qualification-error")).toContainText("Choose an option");
    await choose(page, practice!);
    if (practice === "Other") {
      await next(page);
      await expect(page.locator("#qualification-error")).toContainText("Briefly describe");
      await page.getByLabel("Briefly describe your practice").fill("Specialist clinic");
    }
    await next(page);
    await expect(
      page.getByRole("heading", { name: "Where would support help most?" }),
    ).toBeVisible();
    await choose(page, need!);
    await next(page);
    await choose(page, ready!);
    await page.getByLabel("Anything else we should know? (optional)").fill("Synthetic QA context");
    await page.reload();
    await expect(page.getByRole("radio", { name: ready!, exact: true })).toBeChecked();
    await page.getByRole("button", { name: "Choose a time", exact: true }).click();
    const fallback = page.getByRole("link", { name: "Open the booking page in a new tab" });
    await expect(fallback).toBeVisible();
    const u = new URL((await fallback.getAttribute("href"))!);
    expect(u.searchParams.get("notes")).toContain(practice!);
    expect(u.searchParams.get("notes")).toContain(need!);
    expect(u.searchParams.get("notes")).toContain(ready!);
    expect(u.searchParams.get("notes")).toContain("Synthetic QA context");
    expect(u.searchParams.get("metadata[ref]")).toBe("fa-sdr-qa");
    await page.goBack();
    await expect(page.getByRole("radio", { name: ready!, exact: true })).toBeChecked();
    await page.goForward();
    await expect(fallback).toBeVisible();
    await page.getByRole("button", { name: "← Back to questions" }).click();
    await expect(page.getByRole("radio", { name: ready!, exact: true })).toBeChecked();
  });

test("Other detail stays editable, irrelevant detail omitted, old and corrupt state cannot skip", async ({
  page,
}) => {
  await page.addInitScript(() =>
    sessionStorage.setItem(
      "fa-vsl-qualification",
      JSON.stringify({ answers: { practiceType: "Other", supportNeed: "Both" }, completed: true }),
    ),
  );
  await page.goto(qualify + "&step=calendar");
  await expect(page.getByRole("heading", { name: "What kind of practice?" })).toBeVisible();
  await page.getByLabel("Briefly describe your practice").fill("Specialist");
  await choose(page, "Independent practice");
  await expect(page.getByLabel("Briefly describe your practice")).toHaveCount(0);
  await next(page);
  await expect(page.getByRole("heading", { name: "Where would support help most?" })).toBeVisible();
  await next(page);
  await choose(page, "Early research");
  await page.getByRole("button", { name: "Choose a time", exact: true }).click();
  expect(
    new URL(
      (await page
        .getByRole("link", { name: "Open the booking page in a new tab" })
        .getAttribute("href"))!,
    ).searchParams.get("notes"),
  ).not.toContain("Specialist");
});

test("Storage denied still supports keyboard completion", async ({ page }) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, "sessionStorage", {
      get() {
        throw new Error("Unavailable");
      },
    }),
  );
  await page.goto(qualify + "&step=calendar");
  await page.getByRole("radio", { name: "Independent practice", exact: true }).focus();
  await page.keyboard.press("Space");
  await page.getByRole("button", { name: "Continue", exact: true }).focus();
  await page.keyboard.press("Enter");
  await choose(page, "Both");
  await next(page);
  await choose(page, "Early research");
  await page.getByRole("button", { name: "Choose a time", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Choose your time", exact: true })).toBeVisible();
});

test("Both genuine full demos are visible, deferred, and exclusive", async ({ page }) => {
  await page.goto("/phone-agent");
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

test("Qualification reaches a complete mocked contact/scheduling handoff", async ({ page }) => {
  test.skip(
    !process.env.QA_REVIEW_MOCK,
    "Only run against the explicitly labelled local review fixture",
  );
  await page.goto(qualify);
  await choose(page, "Other");
  await page.getByLabel("Briefly describe your practice").fill("QA specialist clinic");
  await next(page);
  await choose(page, "After hours");
  await next(page);
  await choose(page, "Evaluating with an approver");
  await page.getByRole("button", { name: "Choose a time", exact: true }).click();
  await page.getByRole("button", { name: "10:00 · Europe/London" }).click();
  await page.getByLabel("Name", { exact: true }).fill("Synthetic QA");
  await page.getByLabel("Email", { exact: true }).fill("qa@example.test");
  await expect(page.getByTestId("mock-booking-notes")).toContainText("QA specialist clinic");
  await page.getByRole("button", { name: "Confirm simulated booking" }).click();
  await expect(
    page.getByText("Simulation complete. No booking or notification was sent.", { exact: true }),
  ).toBeVisible();
});

test("Corrupt storage cannot bypass questions", async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("fa-vsl-qualification", "{broken"));
  await page.goto(qualify + "&step=calendar");
  await expect(page.getByRole("heading", { name: "What kind of practice?" })).toBeVisible();
  await next(page);
  await expect(page.locator("#qualification-error")).toHaveText("Choose an option to continue.");
});

test("Touch, resize and unavailable wrapper fullscreen keep a working route", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
  });
  await context.route("**/*", (r) => {
    if (new URL(r.request().url()).origin !== new URL(test.info().project.use.baseURL!).origin) return r.abort();
    if (!["GET", "HEAD"].includes(r.request().method())) return r.fulfill({ status: 204 });
    return r.continue();
  });
  await context.addInitScript(() => {
    localStorage.setItem("fa-analytics-consent", "rejected");
    Object.defineProperty(document, "fullscreenEnabled", { get: () => false });
  });
  const p = await context.newPage();
  await p.goto(new URL("/phone-agent", test.info().project.use.baseURL).toString());
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
  await expect(p.getByRole("heading", { name: "What kind of practice?" })).toBeVisible();
  await context.close();
});

test("Overview reserves separate space for actions and native controls", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/phone-agent");
  const video = page.locator('video[data-media-id="overview"]');
  async function reserves() {
    const layout = await video.evaluate((node) => {
      const s = getComputedStyle(node), box = node.getBoundingClientRect();
      return { top: parseFloat(s.paddingTop), bottom: parseFloat(s.paddingBottom), width: box.width, height: box.height };
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
