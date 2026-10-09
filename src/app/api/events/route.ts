import { parseFunnel } from "@/lib/funnel-validation";
import { insertSdrEvent } from "@/lib/sdr-event-store";
import { takeRateLimit } from "@/lib/durable-rate-limit";
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return Response.json({ error: "Foreign origin" }, { status: 403 });
  const raw = await request.text();
  if (raw.length > 4096) return Response.json({ error: "Payload too large" }, { status: 413 });
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const event = parseFunnel(body);
  if (!event) return Response.json({ error: "Invalid event" }, { status: 400 });
  const allowed = await takeRateLimit(request, "funnel", 100);
  if (allowed !== true)
    return Response.json(
      { error: allowed === false ? "Rate limited" : "Storage unavailable" },
      { status: allowed === false ? 429 : 503 },
    );
  const stored = await insertSdrEvent({
    event_id: event.id,
    kind: "web",
    lead_ref: event.journeyId,
    event: event.event,
    payload: {
      path: event.path,
      service: event.service,
      mediaId: event.mediaId,
      attribution: event.attribution,
      ts: event.ts,
    },
  });
  return Response.json({ stored }, { status: stored ? 200 : 503 });
}
