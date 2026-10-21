import { describe, expect, it } from "vitest";
import { industries } from "@/lib/editorial-copy";
import { parseFunnel } from "@/lib/funnel-validation";
describe("phone-agent public journeys", () => {
  it("routes priority industries into the phone-agent journey without fabricated deployments", () => {
    for (const slug of [
      "home-services",
      "trades",
      "automotive",
      "property",
      "it-services",
      "professional-services",
    ]) {
      expect(industries[slug]?.service).toBe("phone-agent");
      expect(industries[slug]?.secondary?.href).toBe("/demos");
      expect(industries[slug]?.boundary.en.length).toBeGreaterThan(70);
    }
  });
  it("rejects invented client-side confirmed bookings", () => {
    expect(
      parseFunnel({
        id: "12345678-1234-1234-1234-123456789012",
        journeyId: "12345678-1234-1234-1234-123456789012",
        event: "booking_confirmed",
        path: "/book",
        ts: new Date().toISOString(),
      }),
    ).toBeNull();
  });
});

describe("Website language parity", () => {
  it("provides distinct Spanish copy for every new industry workflow", () => {
    for (const slug of [
      "home-services",
      "trades",
      "property",
      "automotive",
      "it-services",
      "professional-services",
    ]) {
      const industry = industries[slug];
      expect(industry).toBeDefined();
      expect(industry?.title.es).not.toBe(industry?.title.en);
      expect(industry?.intro.es).not.toBe(industry?.intro.en);
      expect(industry?.boundary.es).not.toBe(industry?.boundary.en);
      for (const example of industry?.examples ?? []) expect(example.es).not.toBe(example.en);
    }
  });
});
