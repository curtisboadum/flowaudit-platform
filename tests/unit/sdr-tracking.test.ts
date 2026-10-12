import { describe, expect, it } from "vitest";
import { createHmac } from "crypto";
import {
  CAL_PRIMARY_EVENT,
  mapCalWebhook,
  parseBeacon,
  parseSdrRef,
  verifyCalSignature,
} from "@/lib/sdr-tracking";

describe("parseSdrRef", () => {
  it("parses a valid ref", () => {
    expect(parseSdrRef("fa-sdr-lorri-detrick")).toBe("lorri-detrick");
  });
  it("rejects a foreign or malformed ref", () => {
    expect(parseSdrRef("promo-123")).toBeNull();
    expect(parseSdrRef("fa-sdr-BAD CHAR")).toBeNull();
    expect(parseSdrRef(42)).toBeNull();
  });
});

describe("parseBeacon", () => {
  it("accepts a well-formed beacon", () => {
    const out = parseBeacon({ ref: "fa-sdr-l1", event: "video_50", ts: "2026-10-09T10:00:00Z" });
    expect(out?.event).toBe("video_50");
  });
  it("rejects unknown events and missing ts", () => {
    expect(parseBeacon({ ref: "fa-sdr-l1", event: "hack", ts: "2026-10-09T10:00:00Z" })).toBeNull();
    expect(parseBeacon({ ref: "fa-sdr-l1", event: "open" })).toBeNull();
    expect(parseBeacon(null)).toBeNull();
  });
});

describe("mapCalWebhook", () => {
  it("maps BOOKING_CREATED on the primary event", () => {
    const out = mapCalWebhook({
      triggerEvent: "BOOKING_CREATED",
      payload: {
        uid: "abc",
        startTime: "2026-10-10T15:00:00Z",
        eventType: { slug: CAL_PRIMARY_EVENT },
        attendees: [{ email: "owner@practice.com" }],
      },
    });
    expect(out?.normalized).toBe("booked");
    expect(out?.primary).toBe(true);
    expect(out?.attendeeEmail).toBe("owner@practice.com");
  });
  it("maps MEETING_ENDED on the secondary event", () => {
    const out = mapCalWebhook({
      triggerEvent: "MEETING_ENDED",
      payload: { eventType: { slug: "15min" }, attendees: [] },
    });
    expect(out?.normalized).toBe("call_held");
    expect(out?.primary).toBe(false);
  });
  it("rejects unknown triggers", () => {
    expect(mapCalWebhook({ triggerEvent: "SOMETHING_ELSE", payload: {} })).toBeNull();
  });
});

describe("verifyCalSignature", () => {
  it("verifies a correct HMAC and rejects a wrong one", () => {
    const secret = "test-secret";
    const body = JSON.stringify({ triggerEvent: "BOOKING_CREATED" });
    const sig = createHmac("sha256", secret).update(body, "utf8").digest("hex");
    expect(verifyCalSignature(body, sig, secret)).toBe(true);
    expect(verifyCalSignature(body, "00".repeat(32), secret)).toBe(false);
    expect(verifyCalSignature(body, null, secret)).toBe(false);
    expect(verifyCalSignature(body, sig, "")).toBe(false);
  });
});
