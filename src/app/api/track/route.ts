/**
 * @file route.ts
 * @description SDR site beacon and personalized watch-event receiver.
 *   Watch-surface events must carry the minted link_ref and a session id; the
 *   server resolves the row, rejects bot/scanner traffic, and stores a deduped
 *   event. Legacy site beacons still work without a link_ref. The token is
 *   never sent to this endpoint.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import { NextResponse } from "next/server";
import {
  isBotUserAgent,
  parseBeacon,
  uaFamily,
  watchEventId,
} from "@/lib/sdr-tracking";
import { insertSdrEvent } from "@/lib/sdr-event-store";
import {
  getWatchLinkByRef,
  stopWatchMeasurement,
} from "@/lib/watch-link-store";
import {
  resolveDemoId,
  watchLeadRef,
  watchLinkState,
} from "@/lib/watch-links";

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
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Foreign origin" }, { status: 403 });
  }

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

  // Legacy site beacons (phone-agent page) do not have a watch link.
  if (beacon.surface !== "watch") {
    const stored = await insertSdrEvent({
      kind: "beacon",
      lead_ref: beacon.ref,
      event: beacon.event,
      payload: { ts: beacon.ts },
    });
    return NextResponse.json({ ok: true, stored }, { status: 200 });
  }

  if (!beacon.linkRef || !beacon.sessionId) {
    return NextResponse.json({ error: "Watch events need a link and session" }, { status: 400 });
  }
  if (isBotUserAgent(request.headers.get("user-agent")) || beacon.webdriver === true) {
    return new NextResponse(null, { status: 204 });
  }

  const row = await getWatchLinkByRef(beacon.linkRef);
  if (!row || watchLinkState(row, new Date()) !== "valid") {
    return new NextResponse(null, { status: 204 });
  }
  const demoId = resolveDemoId(row);
  const leadRef = watchLeadRef(row);
  if (!demoId || demoId !== beacon.demoId || !leadRef || leadRef !== beacon.ref) {
    return NextResponse.json({ error: "Link and event do not match" }, { status: 400 });
  }

  if (beacon.event === "measurement_off") {
    const stored = await stopWatchMeasurement(beacon.linkRef);
    return NextResponse.json({ ok: stored }, { status: stored ? 200 : 503 });
  }

  // A page open only counts when the client says the page was visible.
  if (beacon.event === "watch_open" && beacon.visible !== true) {
    return new NextResponse(null, { status: 204 });
  }

  const stored = await insertSdrEvent({
    event_id: watchEventId(beacon.linkRef, beacon.sessionId, beacon.event),
    kind: "beacon",
    lead_ref: leadRef,
    event: beacon.event,
    payload: {
      ts: beacon.ts,
      link_ref: beacon.linkRef,
      demo_id: demoId,
      session_id: beacon.sessionId,
      visible: beacon.visible,
      interacted: beacon.interacted,
      pct: beacon.pct,
      ua_family: uaFamily(request.headers.get("user-agent")),
      campaign: row.campaign || "",
      path: "/watch",
    },
  });

  return NextResponse.json({ ok: true, stored }, { status: stored ? 200 : 503 });
}
