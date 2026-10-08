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
import { NextResponse } from "next/server";
import { mapCalWebhook, verifyCalSignature } from "@/lib/sdr-tracking";
import { insertSdrEvent } from "@/lib/sdr-event-store";

export async function POST(request: Request) {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook receiver not configured" }, { status: 503 });
  }

  const rawBody = await request.text();
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

  const stored = await insertSdrEvent({
    kind: "cal",
    lead_ref: event.attendeeEmail || event.uid,
    event: event.normalized,
    payload: {
      eventType: event.eventType,
      primary: event.primary,
      startTime: event.startTime,
      uid: event.uid,
    },
  });

  return NextResponse.json({ ok: true, normalized: event.normalized, stored });
}
