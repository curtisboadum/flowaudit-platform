import { describe, expect, it } from "vitest";
import {
  WATCH_TOKEN_LENGTH,
  displayFirstName,
  displayPractice,
  isValidWatchToken,
  watchLeadRef,
  watchLinkState,
  type WatchLinkRow,
} from "@/lib/watch-links";
import { parseBeacon } from "@/lib/sdr-tracking";

const now = new Date("2026-10-12T12:00:00Z");

function row(overrides: Partial<WatchLinkRow> = {}): WatchLinkRow {
  return {
    token: "a".repeat(WATCH_TOKEN_LENGTH),
    lead_id: "lorri-detrick",
    first_name: "Lorri",
    practice_name: "of Bright Smile Dental",
    created_at: "2026-10-12T09:00:00Z",
    expires_at: null,
    revoked_at: null,
    ...overrides,
  };
}

describe("isValidWatchToken", () => {
  it("accepts a 43-char urlsafe token", () => {
    expect(isValidWatchToken("A-z0_9".padEnd(WATCH_TOKEN_LENGTH, "x"))).toBe(true);
    expect(isValidWatchToken("x".repeat(WATCH_TOKEN_LENGTH))).toBe(true);
  });
  it("rejects wrong lengths, bad chars, and non-strings", () => {
    expect(isValidWatchToken("x".repeat(WATCH_TOKEN_LENGTH - 1))).toBe(false);
    expect(isValidWatchToken("x".repeat(WATCH_TOKEN_LENGTH + 1))).toBe(false);
    expect(isValidWatchToken("x".repeat(20) + "!".repeat(23))).toBe(false);
    expect(isValidWatchToken("x".repeat(20) + " ".repeat(23))).toBe(false);
    expect(isValidWatchToken(42)).toBe(false);
    expect(isValidWatchToken(null)).toBe(false);
    expect(isValidWatchToken(undefined)).toBe(false);
  });
});

describe("watchLinkState", () => {
  it("is not_found for missing rows", () => {
    expect(watchLinkState(null, now)).toBe("not_found");
    expect(watchLinkState(undefined, now)).toBe("not_found");
  });
  it("is valid for a live row", () => {
    expect(watchLinkState(row(), now)).toBe("valid");
  });
  it("is valid when expires_at is in the future", () => {
    expect(watchLinkState(row({ expires_at: "2026-11-12T12:00:00Z" }), now)).toBe("valid");
  });
  it("is expired when expires_at is in the past", () => {
    expect(watchLinkState(row({ expires_at: "2026-10-11T12:00:00Z" }), now)).toBe("expired");
  });
  it("is revoked when revoked_at is set, even if also expired", () => {
    expect(watchLinkState(row({ revoked_at: "2026-10-11T12:00:00Z" }), now)).toBe("revoked");
    expect(
      watchLinkState(
        row({ revoked_at: "2026-10-11T12:00:00Z", expires_at: "2026-10-10T12:00:00Z" }),
        now,
      ),
    ).toBe("revoked");
  });
  it("treats an invalid expires_at as no expiry", () => {
    expect(watchLinkState(row({ expires_at: "not-a-date" }), now)).toBe("valid");
  });
});

describe("watchLeadRef", () => {
  it("builds the fa-sdr ref for a valid lead id", () => {
    expect(watchLeadRef(row())).toBe("fa-sdr-lorri-detrick");
  });
  it("returns null for invalid lead ids", () => {
    expect(watchLeadRef(row({ lead_id: "BAD_ID" }))).toBeNull();
    expect(watchLeadRef(row({ lead_id: "" }))).toBeNull();
  });
});

describe("display helpers", () => {
  it("trims and caps first names", () => {
    expect(displayFirstName(row({ first_name: "  Lorri " }))).toBe("Lorri");
    expect(displayFirstName(row({ first_name: "x".repeat(200) })).length).toBeLessThanOrEqual(80);
    expect(displayFirstName(row({ first_name: "" }))).toBe("");
  });
  it("strips control characters", () => {
    expect(displayFirstName(row({ first_name: "Lo\u0000rri\u0007" }))).toBe("Lorri");
  });
  it("strips the leading 'of ' from practice names", () => {
    expect(displayPractice(row({ practice_name: "of Bright Smile Dental" }))).toBe(
      "Bright Smile Dental",
    );
    expect(displayPractice(row({ practice_name: "Bright Smile Dental" }))).toBe(
      "Bright Smile Dental",
    );
    expect(displayPractice(row({ practice_name: "" }))).toBe("");
  });
});

describe("watch_open beacon event", () => {
  it("is accepted by parseBeacon", () => {
    const out = parseBeacon({
      ref: "fa-sdr-lorri-detrick",
      event: "watch_open",
      ts: "2026-10-12T12:00:00Z",
    });
    expect(out?.event).toBe("watch_open");
  });
});
