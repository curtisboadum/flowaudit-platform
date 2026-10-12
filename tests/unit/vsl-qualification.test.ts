import { describe, it, expect } from "vitest";
import {
  sanitizeAnswers,
  qualificationOptions,
  qualificationValid,
  stepValid,
  qualificationNotes,
} from "@/lib/vsl-qualification";
describe("VSL qualification", () => {
  it("keeps valid legacy answers but requires readiness", () => {
    const a = sanitizeAnswers({ practiceType: "Independent practice", supportNeed: "Both" });
    expect(stepValid(a, 0)).toBe(true);
    expect(stepValid(a, 1)).toBe(true);
    expect(qualificationValid(a)).toBe(false);
  });
  it("validates every selection and passes all answers to existing booking notes", () => {
    for (const practiceType of qualificationOptions.practiceType)
      for (const supportNeed of qualificationOptions.supportNeed)
        for (const readiness of qualificationOptions.readiness) {
          const a = {
            practiceType,
            supportNeed,
            readiness,
            practiceDetail: "Specialist clinic",
            context: "Two sites",
          };
          expect(qualificationValid(a)).toBe(true);
          const notes = qualificationNotes(a);
          expect(notes).toContain(practiceType);
          expect(notes).toContain(supportNeed);
          expect(notes).toContain(readiness);
          expect(notes).toContain("Two sites");
          expect(notes.includes("Specialist clinic")).toBe(practiceType === "Other");
        }
  });
  it("requires a meaningful Other description", () => {
    expect(stepValid({ practiceType: "Other" }, 0)).toBe(false);
    expect(stepValid({ practiceType: "Other", practiceDetail: "   " }, 0)).toBe(false);
  });
  it("ignores corrupt or unknown storage and bounds free text", () => {
    expect(sanitizeAnswers(null)).toEqual({});
    expect(sanitizeAnswers({ practiceType: "unexpected", context: 5 })).toEqual({});
    expect(sanitizeAnswers({ context: "x".repeat(500) }).context).toHaveLength(240);
  });
});
