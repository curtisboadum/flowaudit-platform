import { expect, test } from "@playwright/test";

async function stubCal(page: import("@playwright/test").Page) {
  await page.route("**/embed/embed.js", (r) =>
    r.fulfill({ body: "", contentType: "application/javascript" }),
  );
}

test("Seen enough follows media position, latches, and enters qualification", async ({ page }) => {
  await stubCal(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/phone-agent");
  await page.getByRole("button", { name: "Keep analytics off" }).click();
  const video = page.locator('video[data-media-id="overview"]');
  const cta = page.getByRole("link", { name: "Seen enough", exact: true });
  await expect(cta).toHaveCount(0);
  // A different film and page time must not reveal the VSL CTA.
  await page.locator('video[data-media-id="routine"]').evaluate((v: HTMLVideoElement) => {
    v.currentTime = 35;
    v.dispatchEvent(new Event("timeupdate"));
  });
  await expect(cta).toHaveCount(0);
  await video.evaluate(async (v: HTMLVideoElement) => {
    v.muted = true;
    v.load();
    await new Promise<void>((resolve) =>
      v.addEventListener("loadedmetadata", () => resolve(), { once: true }),
    );
    v.currentTime = 29.4;
  });
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
    .toBeGreaterThan(29);
  await expect(cta).toHaveCount(0);
  await video.evaluate((v: HTMLVideoElement) => v.play());
  await expect(cta).toBeVisible();
  expect(await video.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThanOrEqual(30);
  await video.evaluate((v: HTMLVideoElement) => {
    v.pause();
    v.currentTime = 0;
  });
  await expect(cta).toBeVisible();
  await video.evaluate((v: HTMLVideoElement) => v.play());
  await expect(cta).toBeVisible();
  await video.evaluate((v: HTMLVideoElement) => v.pause());
  const ctaRect = await cta.boundingBox();
  const videoRect = await video.boundingBox();
  expect(ctaRect!.y).toBeGreaterThanOrEqual(videoRect!.y + videoRect!.height);
  await cta.click();
  await expect(page).toHaveURL(/entry=vsl/);
  await expect(page.getByRole("heading", { name: "Tell us what you need." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Open the booking page/ })).toHaveCount(0);
});

test("Qualification validates, preserves back navigation, and carries notes to Cal", async ({
  page,
}) => {
  await stubCal(page);
  let scripts = 0;
  page.on("request", (r) => {
    if (r.url().includes("/embed/embed.js")) scripts++;
  });
  await page.goto("/book?service=phone-agent&entry=vsl&ref=fa-sdr-qa&utm_source=qa");
  await page.getByRole("button", { name: "Keep analytics off" }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Tell us what you need." })).toBeVisible();
  expect(scripts).toBe(0);
  await page.getByRole("radio", { name: "Independent practice", exact: true }).check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  expect(scripts).toBe(0);
  await page.getByRole("radio", { name: "Both", exact: true }).check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  const fallback = page.getByRole("link", { name: /Open the booking page/ });
  await expect(fallback).toBeVisible();
  const url = new URL((await fallback.getAttribute("href"))!);
  expect(url.origin + url.pathname).toBe("https://cal.com/curtis-salesos/flowaudit-call");
  expect(url.searchParams.get("notes")).toBe(
    "Practice type: Independent practice\nMain support need: Both",
  );
  expect(url.searchParams.get("metadata[service]")).toBe("phone-agent");
  expect(url.searchParams.get("metadata[ref]")).toBe("fa-sdr-qa");
  await page.goBack();
  await expect(page.getByRole("radio", { name: "Both", exact: true })).toBeChecked();
  await expect(fallback).toHaveCount(0);
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "← Back to questions" }).click();
  await expect(
    page.getByRole("radio", { name: "Independent practice", exact: true }),
  ).toBeChecked();
  await page.reload();
  await expect(page.getByRole("radio", { name: "Both", exact: true })).toBeChecked();
});

test("Forward seek reveals CTA; reduced motion and consent conventions remain intact", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const events: Record<string, unknown>[] = [];
  await page.route("**/api/events", (r) => {
    events.push(JSON.parse(r.request().postData()!));
    return r.fulfill({ body: '{"stored":true}' });
  });
  await stubCal(page);
  await page.goto("/phone-agent");
  const video = page.locator('video[data-media-id="overview"]');
  await video.evaluate((v: HTMLVideoElement) => {
    v.currentTime = 35;
    v.dispatchEvent(new Event("seeked"));
  });
  const cta = page.getByRole("link", { name: "Seen enough", exact: true });
  await expect(cta).toBeVisible();
  expect(await cta.evaluate((e) => getComputedStyle(e).animationName)).toBe("none");
  expect(events).toHaveLength(0);
  await page.getByRole("button", { name: "Allow analytics" }).click();
  await cta.focus();
  await page.keyboard.press("Enter");
  await page.getByRole("radio", { name: "Other", exact: true }).check();
  await page.getByRole("radio", { name: "Exploring the fit", exact: true }).check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect
    .poll(() => events.filter((e) => e.event === "qualification_complete").length)
    .toBe(1);
  expect(events.some((e) => e.event === "cta_click" && e.mediaId === "overview")).toBe(true);
  expect(events.some((e) => e.event === "qualification_start")).toBe(true);
  expect(JSON.stringify(events)).not.toContain("Exploring the fit");
});

test("Storage failure and a direct calendar-step URL cannot skip questions", async ({ page }) => {
  await stubCal(page);
  await page.addInitScript(() => {
    Object.defineProperty(window, "sessionStorage", {
      get() {
        throw new Error("Unavailable");
      },
    });
  });
  await page.goto("/book?service=phone-agent&entry=vsl&step=calendar");
  await page.getByRole("button", { name: "Keep analytics off" }).click();
  await page.getByRole("radio", { name: "Other", exact: true }).check();
  await page.getByRole("radio", { name: "After hours", exact: true }).check();
  await expect(page.getByRole("link", { name: /Open the booking page/ })).toHaveCount(0);
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByRole("link", { name: /Open the booking page/ })).toHaveAttribute(
    "href",
    /After\+hours/,
  );
  await page.getByRole("button", { name: "← Back to questions" }).click();
  await expect(page.getByRole("radio", { name: "After hours", exact: true })).toBeChecked();
});

test("Qualification supports keyboard-only completion and mobile accessibility", async ({
  page,
}) => {
  await stubCal(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/book?service=phone-agent&entry=vsl");
  await page.getByRole("button", { name: "Keep analytics off" }).click();
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze())
      .violations,
  ).toEqual([]);
  await page.getByRole("radio", { name: "Independent practice", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("radio", { name: "Multi-location group or DSO", exact: true }),
  ).toBeChecked();
  await page.keyboard.press("Tab");
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("radio", { name: "After hours", exact: true })).toBeChecked();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Continue", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("link", { name: /Open the booking page/ })).toBeVisible();
});
