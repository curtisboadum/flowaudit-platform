export const qualificationOptions = {
  practiceType: ["Independent practice", "Multi-location group or DSO", "Other"],
  supportNeed: ["Busy periods", "After hours", "Both", "Exploring the fit"],
  readiness: ["I can approve the project", "Evaluating with an approver", "Early research"],
} as const;
export type QualificationAnswers = Partial<
  Record<keyof typeof qualificationOptions | "practiceDetail" | "context", string>
>;
export const qualificationStorageKey = "fa-vsl-qualification";
export function sanitizeAnswers(value: unknown): QualificationAnswers {
  if (!value || typeof value !== "object") return {};
  const input = value as Record<string, unknown>,
    safe: QualificationAnswers = {};
  for (const key of Object.keys(qualificationOptions) as (keyof typeof qualificationOptions)[]) {
    if (
      typeof input[key] === "string" &&
      (qualificationOptions[key] as readonly string[]).includes(input[key])
    )
      safe[key] = input[key];
  }
  for (const [key, limit] of [
    ["practiceDetail", 120],
    ["context", 240],
  ] as const) {
    if (typeof input[key] === "string") safe[key] = input[key].slice(0, limit);
  }
  return safe;
}
export function stepValid(a: QualificationAnswers, step: number) {
  const key = (["practiceType", "supportNeed", "readiness"] as const)[step];
  return Boolean(
    key &&
    (qualificationOptions[key] as readonly string[]).includes(a[key] ?? "") &&
    (step !== 0 || a.practiceType !== "Other" || a.practiceDetail?.trim()),
  );
}
export function qualificationValid(a: QualificationAnswers) {
  return [0, 1, 2].every((s) => stepValid(a, s));
}
export function qualificationNotes(a: QualificationAnswers) {
  return [
    `Practice type: ${a.practiceType}${a.practiceType === "Other" ? ` — ${a.practiceDetail?.trim()}` : ""}`,
    `Main support need: ${a.supportNeed}`,
    `Decision readiness: ${a.readiness}`,
    a.context?.trim() ? `Additional context: ${a.context.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
