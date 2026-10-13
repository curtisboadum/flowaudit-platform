import { describe, expect, it } from "vitest";
import { industries } from "@/lib/editorial-copy";
import { offers } from "@/lib/marketing-copy";

const expectedSlugs = [
  "trades",
  "property",
  "clinics",
  "accounting",
  "legal",
  "insurance",
  "consultants",
  "agencies",
  "solopreneurs",
] as const;

const bannedCopyPatterns: Array<{ label: string; pattern: RegExp }> = [
  { label: "em dash", pattern: /\u2014/ },
  { label: "pricing", pattern: /[£€$]/ },
  { label: "percentage claim", pattern: /%/ },
  { label: "seamless", pattern: /seamless/i },
  { label: "unlock", pattern: /\bunlock/i },
  { label: "elevate", pattern: /\belevate/i },
  { label: "revolutionary", pattern: /revolutionary/i },
  { label: "cutting-edge", pattern: /cutting[- ]edge/i },
  { label: "supercharge", pattern: /supercharge/i },
  { label: "game-changer", pattern: /game[- ]chang/i },
  { label: "effortless", pattern: /effortless/i },
  { label: "guarantee", pattern: /guarantee/i },
];

function walk(value: unknown, visit: (text: string, path: string) => void, path = "industry") {
  if (typeof value === "string") {
    visit(value, path);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => walk(item, visit, `${path}[${i}]`));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      walk(child, visit, `${path}.${key}`);
    }
  }
}

describe("industry conversion pages", () => {
  it("covers exactly the nine campaign and professional pages", () => {
    expect(Object.keys(industries).sort()).toEqual([...expectedSlugs].sort());
  });

  it.each(expectedSlugs)("%s has complete bilingual copy with no banned patterns", (slug) => {
    const industry = industries[slug];
    expect(industry).toBeDefined();
    if (!industry) return;
    const problems: string[] = [];
    walk(industry, (value, path) => {
      if (value.trim().length === 0) problems.push(`${path}: empty string`);
      for (const { label, pattern } of bannedCopyPatterns) {
        if (pattern.test(value)) problems.push(`${path}: contains ${label}`);
      }
    });
    for (const [key, copy] of Object.entries(industry)) {
      if (
        copy &&
        typeof copy === "object" &&
        "en" in copy &&
        "es" in copy &&
        typeof copy.en === "string" &&
        typeof copy.es === "string"
      ) {
        if (!copy.en.trim()) problems.push(`${key}.en is empty`);
        if (!copy.es.trim()) problems.push(`${key}.es is empty`);
      }
    }
    expect(problems).toEqual([]);
  });

  it.each(expectedSlugs)("%s has the full conversion structure", (slug) => {
    const industry = industries[slug];
    expect(industry).toBeDefined();
    if (!industry) return;
    expect(industry.pain.length).toBeGreaterThanOrEqual(3);
    expect(industry.capabilities.length).toBeGreaterThanOrEqual(4);
    expect(industry.faq.length).toBeGreaterThanOrEqual(5);
    expect(industry.cross.length).toBeGreaterThanOrEqual(3);
    expect(industry.metaTitle.length).toBeGreaterThan(20);
    expect(industry.metaDescription.length).toBeGreaterThan(80);
    expect(industry.metaDescription.length).toBeLessThan(185);
    for (const item of industry.cross) {
      expect(offers.some((offer) => offer.path === item.href)).toBe(true);
    }
  });
});
