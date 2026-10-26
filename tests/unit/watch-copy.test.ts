import { describe, expect, it } from "vitest";
import { demos } from "@/lib/demo-registry";
import {
  WATCH_COPY,
  containsDemoListLink,
  watchContext,
  watchHeadline,
  watchNote,
  watchSubhead,
  watchTitle,
} from "@/lib/watch-copy";

describe("watch headline", () => {
  it("names the lead and company naturally", () => {
    expect(watchHeadline("Chris", "Arrington Roofing")).toBe(
      "Chris, here is the demo I mentioned for Arrington Roofing",
    );
  });
  it("handles missing pieces without awkward text", () => {
    expect(watchHeadline("Chris", "")).toBe("Chris, here is the demo I mentioned");
    expect(watchHeadline("", "Arrington Roofing")).toBe(
      "Here is the demo I mentioned for Arrington Roofing",
    );
    expect(watchHeadline("", "")).toBe("Here is the demo I mentioned");
  });
  it("uses a short subhead", () => {
    expect(watchSubhead("Acme")).toContain("Acme");
    expect(watchSubhead("")).toContain("phone agent");
  });
  it("keeps the metadata title short", () => {
    expect(watchTitle("Chris")).toBe("Chris, your demo | FlowAudit");
    expect(watchTitle("")).toBe("Your demo | FlowAudit");
  });
});

describe("per-demo copy", () => {
  it("has factual copy for every approved demo", () => {
    for (const demo of demos) {
      expect(WATCH_COPY[demo.id]).toBeDefined();
      expect(watchContext(demo.id).length).toBeGreaterThan(40);
      expect(watchNote(demo.id).length).toBeGreaterThan(40);
      expect(watchContext(demo.id)).not.toMatch(/bespoke|guarantee|proven|double your/i);
      expect(watchNote(demo.id)).not.toMatch(/bespoke|guarantee|proven|double your/i);
    }
  });
  it("never contains a hub or library link", () => {
    for (const demo of demos) {
      expect(containsDemoListLink(watchContext(demo.id))).toBe(false);
      expect(containsDemoListLink(watchNote(demo.id))).toBe(false);
    }
  });
  it("detects the exact surfaces the agent must never send", () => {
    expect(containsDemoListLink("See /demos")).toBe(true);
    expect(containsDemoListLink("See /demo/showcase")).toBe(true);
    expect(containsDemoListLink("Explore the demo library")).toBe(true);
    expect(containsDemoListLink("See /services")).toBe(false);
  });
});
