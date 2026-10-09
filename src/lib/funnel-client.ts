import { serviceId, type ServiceId } from "@/lib/marketing-copy";
export type FunnelEvent =
  | "page_view"
  | "cta_click"
  | "book_click"
  | "video_start"
  | "video_25"
  | "video_50"
  | "video_75"
  | "video_complete"
  | "media_select"
  | "qualification_complete"
  | "calendar_ready";
export const CONSENT_KEY = "fa-analytics-consent";
export interface EventContext {
  service?: ServiceId;
  mediaId?: string;
}
export function analyticsAllowed(): boolean {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}
export function attribution(): Record<string, string> {
  const result: Record<string, string> = {};
  if (typeof window === "undefined") return result;
  const params = new URLSearchParams(window.location.search);
  for (const key of ["ref", "utm_source", "utm_medium", "utm_campaign"]) {
    const value = params.get(key);
    if (
      value &&
      /^[a-zA-Z0-9_-]{1,100}$/.test(value) &&
      (key !== "ref" || /^fa-sdr-[a-z0-9-]+$/.test(value))
    )
      result[key] = value;
  }
  if (analyticsAllowed()) {
    try {
      const prior = JSON.parse(sessionStorage.getItem("fa-attribution") ?? "{}") as Record<
        string,
        unknown
      >;
      for (const [key, value] of Object.entries(prior)) {
        if (
          !result[key] &&
          ["ref", "utm_source", "utm_medium", "utm_campaign"].includes(key) &&
          typeof value === "string" &&
          /^[a-zA-Z0-9_-]{1,100}$/.test(value)
        )
          result[key] = value;
      }
      sessionStorage.setItem("fa-attribution", JSON.stringify(result));
    } catch {
      /* Storage may be disabled; URL attribution still works. */
    }
  }
  return result;
}
export function recordEvent(event: FunnelEvent, context: EventContext = {}): void {
  if (typeof window === "undefined" || !analyticsAllowed()) return;
  try {
    let journeyId = sessionStorage.getItem("fa-journey");
    if (!journeyId) {
      journeyId = crypto.randomUUID();
      sessionStorage.setItem("fa-journey", journeyId);
    }
    const body = JSON.stringify({
      id: crypto.randomUUID(),
      event,
      journeyId,
      service: context.service ?? serviceId(new URLSearchParams(location.search).get("service")),
      mediaId: context.mediaId,
      path: location.pathname,
      attribution: attribution(),
      ts: new Date().toISOString(),
    });
    void fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    })
      .then((response) => {
        if (!response.ok) console.warn("[funnel] Event not stored", response.status);
      })
      .catch(() => {
        console.warn("[funnel] Event delivery unavailable");
      });
  } catch {
    console.warn("[funnel] Event creation unavailable");
  }
}
export function coveredSeconds(intervals: readonly (readonly [number, number])[]): number {
  const sorted = intervals.map((x) => [...x] as [number, number]).sort((a, b) => a[0] - b[0]);
  let total = 0;
  let start = 0;
  let end = 0;
  for (const [a, b] of sorted) {
    if (b <= a) continue;
    if (a > end) {
      total += end - start;
      start = a;
      end = b;
    } else end = Math.max(end, b);
  }
  return total + end - start;
}
interface CoverageState {
  last: number;
  wall: number;
  intervals: [number, number][];
  fired: Set<string>;
}
const coverage = new WeakMap<HTMLVideoElement, CoverageState>();
export function watchedCoverage(
  video: HTMLVideoElement,
  mediaId: string,
  service: ServiceId,
): void {
  const now = performance.now();
  const current = video.currentTime;
  let state = coverage.get(video);
  if (!state) {
    state = { last: current, wall: now, intervals: [], fired: new Set() };
    coverage.set(video, state);
    return;
  }
  const delta = current - state.last;
  const elapsed = (now - state.wall) / 1000;
  if (
    !video.seeking &&
    !video.paused &&
    delta > 0 &&
    delta <= Math.max(1.25, elapsed * Math.max(video.playbackRate, 1) + 0.5) &&
    elapsed < 3
  ) {
    state.intervals.push([state.last, current]);
  }
  state.last = current;
  state.wall = now;
  if (!Number.isFinite(video.duration) || video.duration <= 0) return;
  const percent = coveredSeconds(state.intervals) / video.duration;
  for (const [threshold, event] of [
    [0.25, "video_25"],
    [0.5, "video_50"],
    [0.75, "video_75"],
    [0.95, "video_complete"],
  ] as const) {
    if (percent >= threshold && !state.fired.has(event) && analyticsAllowed()) {
      state.fired.add(event);
      recordEvent(event, { mediaId, service });
    }
  }
}
