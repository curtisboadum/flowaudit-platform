import { serviceId } from "./marketing-copy";
const events = new Set([
  "page_view",
  "cta_click",
  "book_click",
  "video_start",
  "video_25",
  "video_50",
  "video_75",
  "video_complete",
  "media_select",
  "qualification_complete",
  "calendar_ready",
]);
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function parseFunnel(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const r = body as Record<string, unknown>;
  if (
    typeof r.id !== "string" ||
    !uuid.test(r.id) ||
    typeof r.journeyId !== "string" ||
    !uuid.test(r.journeyId) ||
    typeof r.event !== "string" ||
    !events.has(r.event) ||
    typeof r.path !== "string" ||
    !/^\/[a-z0-9/-]{0,150}$/.test(r.path) ||
    r.path.startsWith("/crm") ||
    typeof r.ts !== "string" ||
    !Number.isFinite(Date.parse(r.ts))
  )
    return null;
  const attribution: Record<string, string> = {};
  if (r.attribution && typeof r.attribution === "object")
    for (const [key, value] of Object.entries(r.attribution)) {
      if (
        ["ref", "utm_source", "utm_medium", "utm_campaign"].includes(key) &&
        typeof value === "string" &&
        /^[a-zA-Z0-9_-]{1,100}$/.test(value) &&
        (key !== "ref" || /^fa-sdr-[a-z0-9-]+$/.test(value))
      )
        attribution[key] = value;
    }
  const mediaId =
    typeof r.mediaId === "string" && ["routine", "main", "summary", "teaser"].includes(r.mediaId)
      ? r.mediaId
      : undefined;
  return {
    id: r.id,
    journeyId: r.journeyId,
    event: r.event,
    path: r.path,
    ts: r.ts,
    service: serviceId(r.service),
    mediaId,
    attribution,
  };
}
