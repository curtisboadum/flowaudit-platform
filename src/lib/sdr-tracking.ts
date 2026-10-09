/**
 * @file sdr-tracking.ts
 * @description Pure validation and mapping for SDR funnel tracking: per-lead
 *   ref links, site beacons, and Cal.com webhook payloads. No env, no I/O.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import { createHmac, timingSafeEqual } from "crypto";

export const REF_PREFIX = "fa-sdr-";

export const BEACON_EVENTS = [
  "open",
  "video_25",
  "video_50",
  "video_75",
  "cta_click",
  "book_click",
] as const;

export type BeaconEvent = (typeof BEACON_EVENTS)[number];

export interface BeaconInput {
  ref: string;
  event: BeaconEvent;
  ts: string;
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
  return { ref: record.ref as string, event: event as BeaconEvent, ts };
}

export function mapCalWebhook(payload: unknown): CalEvent | null {
  if (typeof payload !== "object" || payload === null) return null;
  const record = payload as Record<string, unknown>;
  const trigger = record.triggerEvent;
  if (typeof trigger !== "string") return null;
  const normalized = CAL_TRIGGER_MAP[trigger];
  if (!normalized) return null;
  if (
    typeof record.payload !== "object" ||
    record.payload === null ||
    Array.isArray(record.payload)
  )
    return null;
  const inner = record.payload as Record<string, unknown>;
  const eventTypeObj = (inner.eventType ?? {}) as Record<string, unknown>;
  const eventType = typeof eventTypeObj.slug === "string" ? eventTypeObj.slug : "";
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
  for (const key of ["ref", "utm_source", "utm_medium", "utm_campaign", "service", "journeyId"]) {
    const value = metadata[key];
    if (typeof value === "string" && /^[a-zA-Z0-9_-]{1,100}$/.test(value)) attribution[key] = value;
  }
  const attendeeEmail = typeof first.email === "string" ? first.email : "";
  return {
    normalized,
    attribution,
    eventType,
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
