/**
 * @file watch-links.ts
 * @description Pure validation, state, demo routing and personalization
 *   helpers for the token-gated /watch/<token> pages. No env, no I/O.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import { demoId as asDemoId, type DemoId } from "@/lib/demo-registry";
import { LINK_REF_RE, parseSdrRef } from "@/lib/sdr-tracking";

export { LINK_REF_RE };

/** secrets.token_urlsafe(32) emits exactly 43 urlsafe characters. */
export const WATCH_TOKEN_LENGTH = 43;
export const WATCH_TOKEN_RE = /^[A-Za-z0-9_-]{43}$/;

export const WATCH_PATH_PREFIX = "/watch/";

const NAME_MAX = 80;
const TRADE_MAX = 80;

export interface WatchLinkRow {
  token: string;
  lead_id: string;
  first_name: string;
  /** Canonical company name. Legacy rows may only have practice_name. */
  company_name?: string | null;
  /** Legacy dental-era column. Still populated by older SDR mints. */
  practice_name?: string | null;
  demo_id?: string | null;
  email?: string | null;
  campaign?: string | null;
  link_ref?: string | null;
  trade?: string | null;
  approved_by?: string | null;
  measurement_off_at?: string | null;
  created_at: string;
  expires_at: string | null;
  revoked_at: string | null;
  view_count?: number;
  last_viewed_at?: string | null;
}

export type WatchLinkState = "valid" | "not_found" | "revoked" | "expired";

const HOME_SERVICES = new Set([
  "plumbing",
  "hvac",
  "heating",
  "cooling",
  "electrical",
  "electrician",
  "roofing",
  "roofer",
  "roofing-contractor",
  "restoration",
  "water-damage",
  "fire-damage",
  "mold-remediation",
  "property-management",
  "property management",
  "automotive",
  "security",
  "removals",
  "home-services",
  "home services",
  "cleaning",
  "painting",
  "landscaping",
  "pest-control",
  "pest control",
  "garage-door",
  "garage door",
  "locksmith",
  "flooring",
  "window-cleaning",
  "appliance-repair",
  "handyman",
  "construction",
  "contracting",
  "general-contracting",
]);

const PROFESSIONAL_SERVICES = new Set([
  "professional",
  "professional-services",
  "professional services",
  "accounting",
  "accountant",
  "bookkeeping",
  "legal",
  "law",
  "solicitor",
  "attorney",
  "insurance",
  "it",
  "it-services",
  "it services",
  "managed-it",
  "managed it",
  "web-hosting",
  "web hosting",
  "web-design",
  "web design",
  "marketing",
  "consulting",
  "financial-services",
  "financial services",
  "recruitment",
  "architecture",
  "engineering",
]);

const DENTAL = new Set(["dental", "dentist", "orthodontist", "endodontist", "periodontist"]);

export function isValidWatchToken(token: unknown): token is string {
  return typeof token === "string" && WATCH_TOKEN_RE.test(token);
}

export function isValidLinkRef(value: unknown): value is string {
  return typeof value === "string" && LINK_REF_RE.test(value);
}

function parseTs(value: string | null | undefined): number | null {
  if (!value) return null;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : null;
}

export function watchLinkState(
  row: WatchLinkRow | null | undefined,
  now: Date,
): WatchLinkState {
  if (!row) return "not_found";
  if (parseTs(row.revoked_at) !== null) return "revoked";
  const expires = parseTs(row.expires_at);
  if (expires !== null && expires <= now.getTime()) return "expired";
  return "valid";
}

export function watchLeadRef(row: Pick<WatchLinkRow, "lead_id">): string | null {
  const ref = `fa-sdr-${row.lead_id ?? ""}`;
  return parseSdrRef(ref) ? ref : null;
}

function sanitize(value: string | null | undefined, max = NAME_MAX): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, max);
}

export function displayFirstName(row: Pick<WatchLinkRow, "first_name">): string {
  return sanitize(row.first_name).split(/\s+/)[0] ?? "";
}

/** Prefer company_name; fall back to the legacy practice_name column. */
export function displayCompany(
  row: Pick<WatchLinkRow, "company_name" | "practice_name">,
): string {
  return sanitize(row.company_name || row.practice_name).replace(/^of\s+/i, "");
}

export function normalizeTrade(value: unknown): string {
  return sanitize(typeof value === "string" ? value : "", TRADE_MAX)
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Defense in depth: the row owns the decision, but a bad row must not render
 * the wrong vertical. A null trade is allowed only for legacy rows that
 * already carry a stored demo_id.
 */
export function demoMatchesTrade(demoId: DemoId, trade: string | null | undefined): boolean {
  const t = normalizeTrade(trade);
  if (!t) return true;
  if (demoId === "smart-street") return HOME_SERVICES.has(t);
  if (demoId === "agile-tech") return PROFESSIONAL_SERVICES.has(t);
  if (demoId === "routine" || demoId === "urgent") return DENTAL.has(t);
  if (demoId === "roof-leak") return t === "roofing" || t === "roofer" || t === "roofing-contractor";
  return false;
}

/** Return the stored demo only when it is valid for the stored trade. */
export function resolveDemoId(
  row: Pick<WatchLinkRow, "demo_id" | "trade">,
): DemoId | null {
  const stored = asDemoId(row.demo_id);
  if (!stored) return null;
  if (!demoMatchesTrade(stored, row.trade)) return null;
  return stored;
}

/** Legacy alias kept for older callers. The stored column is practice_name. */
export const displayPractice = displayCompany;
