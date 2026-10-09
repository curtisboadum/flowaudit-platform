import { test, expect } from "@playwright/test";
// Opt-in read-only provider smoke. Never selects a slot or submits a booking.
test("Live Cal event and calendar screenshots", async ({ page }) => {
  test.skip(process.env.QA_LIVE_CAL !== "1", "External provider smoke is explicitly opt-in");
  await page.goto("/book?service=phone-agent");
  await page.getByRole("button", { name: "Keep analytics off" }).click();
  const calendar = page.frameLocator('iframe[title="Book a 15-minute FlowAudit call"]');
  await expect(calendar.getByRole("heading", { name: "FlowAudit Call", exact: true })).toBeVisible({
    timeout: 20000,
  });
  await expect(calendar.getByText("Cal Video", { exact: true })).toBeVisible();
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.locator("iframe").scrollIntoViewIfNeeded();
    await expect(
      calendar.getByRole("heading", { name: "FlowAudit Call", exact: true }),
    ).toBeVisible();
    if (width === 390)
      await calendar.getByRole("heading", { name: "FlowAudit Call", exact: true }).click();
    else await page.locator(".fa-book-intro h1").click();
    await page.screenshot({
      path: `docs/redesign/evidence/phone-funnel-live-calendar-${width}.png`,
      fullPage: width !== 390,
    });
  }
});
