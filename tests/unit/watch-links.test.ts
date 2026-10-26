import { describe, expect, it } from "vitest";
import {
  WATCH_TOKEN_LENGTH,
  demoMatchesTrade,
  displayCompany,
  displayFirstName,
  isValidLinkRef,
  isValidWatchToken,
  resolveDemoId,
  watchLeadRef,
  watchLinkState,
  type WatchLinkRow,
} from "@/lib/watch-links";
import { isBotUserAgent, parseBeacon, uaFamily, watchEventId } from "@/lib/sdr-tracking";

const now = new Date("2026-10-12T12:00:00Z");
const SESSION = "12345678-1234-4234-8234-123456789012";
const LINK = "wl_abcdef1234567890";

function row(overrides: Partial<WatchLinkRow> = {}): WatchLinkRow {
  return {
    token: "a".repeat(WATCH_TOKEN_LENGTH),
    lead_id: "lorri-detrick",
    first_name: "Lorri",
    company_name: "Bright Smile Dental",
    practice_name: "of Bright Smile Dental",
    demo_id: "routine",
    trade: "dental",
    link_ref: "sdr-lorri-detrick",
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

describe("link refs", () => {
  it("accepts email and SDR refs and rejects free text", () => {
    expect(isValidLinkRef(LINK)).toBe(true);
    expect(isValidLinkRef("sdr-david-martin-35899716")).toBe(true);
    expect(isValidLinkRef("wl_short")).toBe(false);
    expect(isValidLinkRef("https://flowaudit.co.uk/watch/x")).toBe(false);
    expect(isValidLinkRef("..")).toBe(false);
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
  it("prefers company_name and falls back to practice_name", () => {
    expect(displayCompany(row({ company_name: "Tidal Electrical" }))).toBe("Tidal Electrical");
    expect(displayCompany(row({ company_name: "", practice_name: "of Bright Smile" }))).toBe(
      "Bright Smile",
    );
    expect(displayCompany(row({ company_name: null, practice_name: "Acme" }))).toBe("Acme");
    expect(displayCompany(row({ company_name: null, practice_name: "" }))).toBe("");
  });
});

describe("demo routing matches the trade", () => {
  it("routes home services to smart-street", () => {
    for (const trade of ["plumbing", "hvac", "electrical", "roofing", "restoration"]) {
      expect(demoMatchesTrade("smart-street", trade)).toBe(true);
      expect(resolveDemoId(row({ demo_id: "smart-street", trade }))).toBe("smart-street");
    }
  });
  it("routes professional services to agile-tech", () => {
    for (const trade of ["accounting", "legal", "insurance", "it", "web-hosting"]) {
      expect(demoMatchesTrade("agile-tech", trade)).toBe(true);
    }
  });
  it("routes dental to routine or urgent", () => {
    expect(demoMatchesTrade("routine", "dental")).toBe(true);
    expect(demoMatchesTrade("urgent", "dentist")).toBe(true);
  });
  it("never lets a trade lead resolve to roof-leak", () => {
    expect(demoMatchesTrade("roof-leak", "plumbing")).toBe(false);
    expect(resolveDemoId(row({ demo_id: "roof-leak", trade: "plumbing" }))).toBeNull();
    expect(resolveDemoId(row({ demo_id: "roof-leak", trade: "roofing" }))).toBeNull();
    expect(
      resolveDemoId(row({ demo_id: "roof-leak", trade: "roofing", approved_by: "curtis" })),
    ).toBe("roof-leak");
  });
  it("rejects a missing or unknown demo_id instead of guessing", () => {
    expect(resolveDemoId(row({ demo_id: null }))).toBeNull();
    expect(resolveDemoId(row({ demo_id: "showcase" }))).toBeNull();
  });
  it("rejects a mismatched stored demo", () => {
    expect(resolveDemoId(row({ demo_id: "agile-tech", trade: "plumbing" }))).toBeNull();
    expect(resolveDemoId(row({ demo_id: "smart-street", trade: "legal" }))).toBeNull();
  });
});

describe("watch beacon parsing", () => {
  it("accepts a watch event with link and session", () => {
    const out = parseBeacon({
      ref: "fa-sdr-lorri-detrick",
      event: "watch_open",
      ts: "2026-10-12T12:00:00Z",
      surface: "watch",
      link_ref: LINK,
      demo_id: "routine",
      session_id: SESSION,
      visible: true,
    });
    expect(out?.surface).toBe("watch");
    expect(out?.linkRef).toBe(LINK);
    expect(out?.demoId).toBe("routine");
    expect(out?.visible).toBe(true);
  });
  it("rejects watch events without a link or session", () => {
    expect(
      parseBeacon({
        ref: "fa-sdr-lorri-detrick",
        event: "watch_open",
        ts: "2026-10-12T12:00:00Z",
        surface: "watch",
        demo_id: "routine",
        session_id: SESSION,
      }),
    ).toBeNull();
    expect(
      parseBeacon({
        ref: "fa-sdr-lorri-detrick",
        event: "watch_open",
        ts: "2026-10-12T12:00:00Z",
        surface: "watch",
        link_ref: LINK,
        demo_id: "routine",
      }),
    ).toBeNull();
  });
  it("keeps legacy site beacons working", () => {
    const out = parseBeacon({
      ref: "fa-sdr-l1",
      event: "video_50",
      ts: "2026-10-09T10:00:00Z",
    });
    expect(out?.surface).toBe("site");
    expect(out?.linkRef).toBeUndefined();
  });
});

describe("event identity and scanner filters", () => {
  it("dedupes the same session event and separates sessions", () => {
    expect(watchEventId(LINK, SESSION, "video_50")).toBe(
      watchEventId(LINK, SESSION, "video_50"),
    );
    expect(watchEventId(LINK, SESSION, "video_50")).not.toBe(
      watchEventId(LINK, "22345678-1234-4234-8234-123456789012", "video_50"),
    );
    expect(watchEventId(LINK, SESSION, "video_50")).not.toBe(
      watchEventId(LINK, SESSION, "video_75"),
    );
  });
  it("flags scanners", () => {
    expect(isBotUserAgent("Mozilla/5.0 (compatible; Googlebot/2.1)")).toBe(true);
    expect(isBotUserAgent("curl/8.4.0")).toBe(true);
    expect(isBotUserAgent("Mozilla/5.0 (Macintosh) Chrome/141.0 Safari/537.36")).toBe(false);
    expect(uaFamily("Mozilla/5.0 Chrome/141.0 Safari/537.36")).toBe("Chrome");
    expect(uaFamily("curl/8.4.0")).toBe("other");
  });
});
