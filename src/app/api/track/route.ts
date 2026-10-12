/**
 * @file route.ts
 * @description SDR site beacon: validates ref/event/ts and stores the event
 *   best-effort. Rate limited per IP. Never blocks the page: always 204 on a
 *   well-formed beacon even if storage is unavailable.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import { NextResponse } from "next/server";
import { parseBeacon } from "@/lib/sdr-tracking";
import { insertSdrEvent } from "@/lib/sdr-event-store";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 60;
const hits = new Map<string, { count: number; windowStart: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const beacon = parseBeacon(body);
  if (!beacon) {
    return NextResponse.json({ error: "Invalid beacon" }, { status: 400 });
  }

  const stored = await insertSdrEvent({
    kind: "beacon",
    lead_ref: beacon.ref,
    event: beacon.event,
    payload: { ts: beacon.ts },
  });

  return NextResponse.json({ ok: true, stored }, { status: 200 });
}
