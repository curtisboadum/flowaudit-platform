// @vitest-environment node
import { it, expect, vi, beforeEach } from "vitest";
import { createHmac } from "crypto";
vi.mock("@/lib/sdr-event-store", () => ({ insertSdrEvent: vi.fn() }));
import { insertSdrEvent } from "@/lib/sdr-event-store";
import { POST } from "@/app/api/cal/webhook/route";
const payload = {
  triggerEvent: "BOOKING_CREATED",
  payload: {
    uid: "qa-booking",
    startTime: "2026-10-10T15:00:00Z",
    eventType: { slug: "flowaudit-call" },
    attendees: [{ email: "qa@example.test" }],
    metadata: { service: "phone-agent", ref: "fa-sdr-qa" },
  },
};
function request(body = payload) {
  const raw = JSON.stringify(body);
  return new Request("https://flowaudit.co.uk/api/cal/webhook", {
    method: "POST",
    body: raw,
    headers: { "x-cal-signature-256": createHmac("sha256", "qa-secret").update(raw).digest("hex") },
  });
}
beforeEach(() => {
  vi.stubEnv("CAL_WEBHOOK_SECRET", "qa-secret");
  vi.mocked(insertSdrEvent).mockReset();
});
it("returns 503 on storage failure so the provider retries", async () => {
  vi.mocked(insertSdrEvent).mockResolvedValue(false);
  expect((await POST(request())).status).toBe(503);
});
it("uses a stable event id for duplicate deliveries", async () => {
  vi.mocked(insertSdrEvent).mockResolvedValue(true);
  expect((await POST(request())).status).toBe(200);
  await POST(request());
  expect(vi.mocked(insertSdrEvent).mock.calls[0]?.[0].event_id).toBe(
    vi.mocked(insertSdrEvent).mock.calls[1]?.[0].event_id,
  );
});
it("rejects unsigned requests", async () => {
  expect(
    (
      await POST(
        new Request("https://flowaudit.co.uk/api/cal/webhook", { method: "POST", body: "{}" }),
      )
    ).status,
  ).toBe(401);
  expect(insertSdrEvent).not.toHaveBeenCalled();
});
