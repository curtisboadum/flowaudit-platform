/**
 * @file watch-links.ts
 * @description Pure validation, state, and personalization helpers for the
 *   token-gated /watch/<token> demo pages. No env, no I/O.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import { parseSdrRef } from "@/lib/sdr-tracking";

/** secrets.token_urlsafe(32) emits exactly 43 urlsafe characters. */
export const WATCH_TOKEN_LENGTH = 43;
export const WATCH_TOKEN_RE = /^[A-Za-z0-9_-]{43}$/;

export const WATCH_PATH_PREFIX = "/watch/";

const NAME_MAX = 80;

export interface WatchLinkRow {
  token: string;
  lead_id: string;
  first_name: string;
  practice_name: string;
  created_at: string;
  expires_at: string | null;
  revoked_at: string | null;
  view_count?: number;
  last_viewed_at?: string | null;
}

export type WatchLinkState = "valid" | "not_found" | "revoked" | "expired";

export function isValidWatchToken(token: unknown): token is string {
  return typeof token === "string" && WATCH_TOKEN_RE.test(token);
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

function sanitizeName(value: string | null | undefined): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, NAME_MAX);
}

export function displayFirstName(row: Pick<WatchLinkRow, "first_name">): string {
  return sanitizeName(row.first_name).split(/\s+/)[0] ?? "";
}

export function displayPractice(row: Pick<WatchLinkRow, "practice_name">): string {
  return sanitizeName(row.practice_name).replace(/^of\s+/i, "");
}
