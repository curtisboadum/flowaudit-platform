import { describe, expect, it } from "vitest";
import { createHmac } from "crypto";
import {
  CAL_PRIMARY_EVENT,
  calLeadRef,
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
  it("accepts the new watch milestones only on the watch surface", () => {
    const base = {
      ref: "fa-sdr-l1",
      ts: "2026-10-09T10:00:00Z",
      surface: "watch",
      link_ref: "wl_abcdef1234567890",
      demo_id: "smart-street",
      session_id: "12345678-1234-4234-8234-123456789012",
    };
    expect(parseBeacon({ ...base, event: "video_start" })?.event).toBe("video_start");
    expect(parseBeacon({ ...base, event: "video_complete" })?.event).toBe("video_complete");
    expect(parseBeacon({ ...base, event: "transcript_click" })?.event).toBe("transcript_click");
    expect(parseBeacon({ ...base, event: "measurement_off" })?.event).toBe("measurement_off");
    expect(parseBeacon({ ...base, demo_id: "showcase", event: "video_start" })).toBeNull();
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
  it("prefers the tracked ref and carries the demo label", () => {
    const out = mapCalWebhook({
      triggerEvent: "BOOKING_CREATED",
      payload: {
        uid: "abc",
        startTime: "2026-10-10T15:00:00Z",
        eventType: { slug: CAL_PRIMARY_EVENT },
        attendees: [{ email: "owner@practice.com" }],
        metadata: { ref: "fa-sdr-chris", demo: "smart-street" },
      },
    });
    expect(out?.attribution.ref).toBe("fa-sdr-chris");
    expect(out?.attribution.demo).toBe("smart-street");
    expect(out ? calLeadRef(out) : null).toBe("fa-sdr-chris");
  });
  it("falls back to attendee email when no ref exists", () => {
    const out = mapCalWebhook({
      triggerEvent: "BOOKING_CREATED",
      payload: {
        uid: "abc",
        startTime: "2026-10-10T15:00:00Z",
        eventType: { slug: CAL_PRIMARY_EVENT },
        attendees: [{ email: "owner@practice.com" }],
      },
    });
    expect(out ? calLeadRef(out) : null).toBe("owner@practice.com");
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
