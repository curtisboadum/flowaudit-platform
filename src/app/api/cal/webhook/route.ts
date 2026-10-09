/**
 * @file route.ts
 * @description Cal.com webhook receiver: HMAC-verified server truth for
 *   bookings, cancellations, reschedules, meeting end, and no-shows. The
 *   site's /book embeds the flowaudit-call event (primary); 15min is also
 *   registered.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { mapCalWebhook, verifyCalSignature } from "@/lib/sdr-tracking";
import { insertSdrEvent } from "@/lib/sdr-event-store";

export async function POST(request: Request) {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook receiver not configured" }, { status: 503 });
  }

  const rawBody = await request.text();
  if (rawBody.length > 100_000)
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  const signature = request.headers.get("x-cal-signature-256");
  if (!verifyCalSignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = mapCalWebhook(payload);
  if (!event) {
    return NextResponse.json({ error: "Unhandled trigger" }, { status: 400 });
  }

  if (!event.uid || !event.eventType || !["flowaudit-call", "15min"].includes(event.eventType))
    return NextResponse.json({ error: "Invalid booking" }, { status: 400 });

  const stored = await insertSdrEvent({
    event_id: `cal-${createHash("sha256").update(`${event.uid}:${event.normalized}:${event.startTime}`).digest("hex")}`,
    kind: "cal",
    lead_ref: event.attendeeEmail || event.uid,
    event: event.normalized,
    payload: {
      eventType: event.eventType,
      primary: event.primary,
      startTime: event.startTime,
      uid: event.uid,
      attribution: event.attribution,
    },
  });

  return NextResponse.json(
    { ok: stored, normalized: event.normalized, stored },
    { status: stored ? 200 : 503 },
  );
}
