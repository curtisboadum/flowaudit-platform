/**
 * @file sdr-tracking.ts
 * @description Pure validation and mapping for SDR funnel tracking: per-lead
 *   ref links, site beacons, and Cal.com webhook payloads. No env, no I/O.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import { createHash, createHmac, timingSafeEqual } from "crypto";
import { demoId, type DemoId } from "@/lib/demo-registry";

export const REF_PREFIX = "fa-sdr-";
export const LINK_REF_RE = /^(wl_[a-z0-9]{8,32}|sdr-[a-z0-9-]{1,80})$/;
const SESSION_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const BEACON_EVENTS = [
  "open",
  "watch_open",
  "video_start",
  "video_25",
  "video_50",
  "video_75",
  "video_complete",
  "cta_click",
  "book_click",
  "transcript_click",
  "measurement_off",
] as const;

export type BeaconEvent = (typeof BEACON_EVENTS)[number];
export type BeaconSurface = "watch" | "site";

export interface BeaconInput {
  ref: string;
  event: BeaconEvent;
  ts: string;
  surface: BeaconSurface;
  linkRef?: string;
  sessionId?: string;
  demoId?: DemoId;
  visible?: boolean;
  interacted?: boolean;
  webdriver?: boolean;
  pct?: number;
}

const BOT_RE =
  /(bot|crawler|spider|preview|headless|python-requests|python-urllib|curl|wget|facebookexternalhit|slackbot|twitterbot|linkedinbot|googlebot|bingbot|applebot|semrush|ahrefs)/i;

/** Scanner/email-preview requests must not become watch events. */
export function isBotUserAgent(userAgent: string | null | undefined): boolean {
  return BOT_RE.test(userAgent || "");
}

/** Coarse browser family for audit, never a full fingerprint. */
export function uaFamily(userAgent: string | null | undefined): string {
  const ua = userAgent || "";
  if (/Edg\//.test(ua)) return "Edge";
  if (/Chrome\//.test(ua)) return "Chrome";
  if (/CriOS\//.test(ua)) return "Chrome iOS";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/Safari\//.test(ua)) return "Safari";
  if (!ua) return "unknown";
  return "other";
}

/** Stable per-session dedupe key. The token is never part of an event. */
export function watchEventId(linkRef: string, sessionId: string, event: string): string {
  return createHash("sha256").update(`watch:${linkRef}:${sessionId}:${event}`).digest("hex");
}

export const CAL_PRIMARY_EVENT = "flowaudit-call";
export const CAL_SECONDARY_EVENT = "15min";
export const CAL_EVENT_TYPES: readonly string[] = [CAL_PRIMARY_EVENT, CAL_SECONDARY_EVENT];

export const CAL_TRIGGER_MAP: Record<string, string> = {
  BOOKING_CREATED: "booked",
  BOOKING_CANCELLED: "cancelled",
  BOOKING_RESCHEDULED: "rescheduled",
  MEETING_STARTED: "call_started",
  MEETING_ENDED: "call_held",
  BOOKING_NO_SHOW_UPDATED: "no_show_updated",
};

export interface CalEvent {
  normalized: string;
  eventType: string;
  eventTypeId?: number;
  primary: boolean;
  attendeeEmail: string;
  startTime: string;
  uid: string;
  attribution: Record<string, string>;
}

export function parseSdrRef(ref: unknown): string | null {
  if (typeof ref !== "string") return null;
  if (!ref.startsWith(REF_PREFIX)) return null;
  const leadId = ref.slice(REF_PREFIX.length);
  if (!/^[a-z0-9-]+$/.test(leadId)) return null;
  return leadId;
}

export function parseBeacon(body: unknown): BeaconInput | null {
  if (typeof body !== "object" || body === null) return null;
  const record = body as Record<string, unknown>;
  const leadId = parseSdrRef(record.ref);
  const event = record.event;
  const ts = record.ts;
  if (!leadId) return null;
  if (typeof event !== "string" || !BEACON_EVENTS.includes(event as BeaconEvent)) return null;
  if (typeof ts !== "string" || ts.length < 10 || ts.length > 40) return null;

  const surface: BeaconSurface = record.surface === "watch" ? "watch" : "site";
  const linkRef = typeof record.link_ref === "string" ? record.link_ref : undefined;
  const sessionId = typeof record.session_id === "string" ? record.session_id : undefined;
  const demo = record.demo_id === undefined ? undefined : demoId(record.demo_id);
  const visible = typeof record.visible === "boolean" ? record.visible : undefined;
  const interacted = typeof record.interacted === "boolean" ? record.interacted : undefined;
  const webdriver = record.webdriver === true;
  const pct =
    typeof record.pct === "number" && Number.isFinite(record.pct)
      ? Math.min(100, Math.max(0, Math.round(record.pct)))
      : undefined;

  if (linkRef !== undefined && !LINK_REF_RE.test(linkRef)) return null;
  if (record.demo_id !== undefined && !demo) return null;
  if (surface === "watch") {
    if (!linkRef || !sessionId || !SESSION_RE.test(sessionId)) return null;
    if (!demo) return null;
  } else if (sessionId && !SESSION_RE.test(sessionId)) {
    return null;
  }

  return {
    ref: record.ref as string,
    event: event as BeaconEvent,
    ts,
    surface,
    linkRef,
    sessionId,
    demoId: demo,
    visible,
    interacted,
    webdriver,
    pct,
  };
}

/** Prefer the tracked ref; fall back to attendee email, then the Cal uid. */
export function calLeadRef(event: Pick<CalEvent, "attribution" | "attendeeEmail" | "uid">): string {
  return event.attribution.ref || event.attendeeEmail || event.uid;
}

export function mapCalWebhook(payload: unknown): CalEvent | null {
  if (typeof payload !== "object" || payload === null) return null;
  const record = payload as Record<string, unknown>;
  const trigger = record.triggerEvent;
  if (typeof trigger !== "string") return null;
  const normalized = CAL_TRIGGER_MAP[trigger];
  if (!normalized) return null;
  const nested =
    typeof record.payload === "object" && record.payload !== null && !Array.isArray(record.payload);
  const flatMeeting = trigger === "MEETING_STARTED" || trigger === "MEETING_ENDED";
  if (!nested && !flatMeeting) return null;
  const inner = nested ? (record.payload as Record<string, unknown>) : record;
  const eventTypeObj = (inner.eventType ?? {}) as Record<string, unknown>;
  const eventType =
    typeof inner.type === "string"
      ? inner.type
      : typeof eventTypeObj.slug === "string"
        ? eventTypeObj.slug
        : "";
  const attendees = Array.isArray(inner.attendees) ? inner.attendees : [];
  const first =
    typeof attendees[0] === "object" && attendees[0] !== null
      ? (attendees[0] as Record<string, unknown>)
      : {};
  const metadata =
    typeof inner.metadata === "object" && inner.metadata !== null
      ? (inner.metadata as Record<string, unknown>)
      : {};
  const attribution: Record<string, string> = {};
  for (const key of [
    "ref",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "service",
    "journeyId",
    "demo",
  ]) {
    const value = metadata[key];
    if (typeof value === "string" && /^[a-zA-Z0-9_-]{1,100}$/.test(value)) attribution[key] = value;
  }
  const attendeeEmail = typeof first.email === "string" ? first.email : "";
  return {
    normalized,
    attribution,
    eventType,
    eventTypeId:
      typeof inner.eventTypeId === "number" && Number.isInteger(inner.eventTypeId)
        ? inner.eventTypeId
        : undefined,
    primary: eventType === CAL_PRIMARY_EVENT,
    attendeeEmail,
    startTime: typeof inner.startTime === "string" ? inner.startTime : "",
    uid: typeof inner.uid === "string" ? inner.uid : "",
  };
}

export function verifyCalSignature(
  rawBody: string,
  signatureHex: string | null,
  secret: string,
): boolean {
  if (!signatureHex || !secret || !/^[a-f0-9]{64}$/i.test(signatureHex.trim())) return false;
  const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(signatureHex.trim(), "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
