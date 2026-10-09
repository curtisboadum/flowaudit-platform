import { describe, it, expect, vi, beforeEach } from "vitest";
import { parseFunnel } from "@/lib/funnel-validation";
import { coveredSeconds, recordEvent, CONSENT_KEY } from "@/lib/funnel-client";
import { mapCalWebhook, verifyCalSignature } from "@/lib/sdr-tracking";
const valid = {
  id: "bc901051-345d-4e40-a330-42f721d3cc3a",
  journeyId: "bc901051-345d-4e40-a330-42f721d3cc3b",
  event: "page_view",
  path: "/phone-agent",
  ts: "2026-10-09T15:00:00Z",
  service: "phone-agent",
  attribution: { utm_source: "test", email: "private@example.com" },
};
beforeEach(() => {
  vi.restoreAllMocks();
  for (const key of ["localStorage", "sessionStorage"]) {
    const values = new Map<string, string>();
    const storage = {
      getItem: (k: string) => values.get(k) ?? null,
      setItem: (k: string, v: string) => values.set(k, v),
      removeItem: (k: string) => values.delete(k),
      clear: () => values.clear(),
    };
    vi.stubGlobal(key, storage);
    Object.defineProperty(window, key, { value: storage, configurable: true });
  }
});
describe("Privacy and funnel validation", () => {
  it("drops unapproved attribution fields and rejects internal paths", () => {
    expect(parseFunnel(valid)?.attribution).toEqual({ utm_source: "test" });
    expect(parseFunnel({ ...valid, path: "/crm" })).toBeNull();
    expect(parseFunnel({ ...valid, path: "/book?email=private" })).toBeNull();
    expect(parseFunnel({ ...valid, event: "paid" })).toBeNull();
    expect(parseFunnel({ ...valid, id: "bad" })).toBeNull();
  });
  it("does not send telemetry or allocate journey storage without consent", () => {
    const fetch = vi.spyOn(globalThis, "fetch");
    recordEvent("page_view");
    expect(fetch).not.toHaveBeenCalled();
    expect(sessionStorage.getItem("fa-journey")).toBeNull();
  });
  it("merges watched intervals so replay and seeking cannot inflate coverage", () => {
    expect(
      coveredSeconds([
        [0, 10],
        [5, 15],
        [30, 35],
        [0, 10],
        [40, 40],
      ]),
    ).toBe(20);
    expect(coveredSeconds([])).toBe(0);
  });
  it("sends minimal events after consent", () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}"));
    recordEvent("book_click", { service: "phone-agent" });
    expect(fetch).toHaveBeenCalledOnce();
    const init = fetch.mock.calls[0]?.[1];
    expect(JSON.parse(String(init?.body)).event).toBe("book_click");
  });
  it("rejects malformed webhook objects and signature suffixes", () => {
    expect(mapCalWebhook({ triggerEvent: "BOOKING_CREATED", payload: "wrong" })).toBeNull();
    expect(mapCalWebhook({ triggerEvent: "BOOKING_CREATED", payload: null })).toBeNull();
    expect(verifyCalSignature("{}", "ff".repeat(32) + "junk", "secret")).toBe(false);
  });
});
