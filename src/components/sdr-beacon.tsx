"use client";

/**
 * @file sdr-beacon.tsx
 * @description Fires SDR funnel beacons (open, video depth, book click) for
 *   visitors arriving with a fa-sdr-* ref parameter. Fire-and-forget; never
 *   blocks or alters the page.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import { useEffect } from "react";

const REF_PREFIX = "fa-sdr-";
const DEPTHS: ReadonlyArray<readonly [number, string]> = [
  [0.25, "video_25"],
  [0.5, "video_50"],
  [0.75, "video_75"],
];

function readRef(): string | null {
  if (typeof window === "undefined") return null;
  const ref = new URLSearchParams(window.location.search).get("ref") ?? "";
  if (!ref.startsWith(REF_PREFIX)) return null;
  if (!/^[a-z0-9-]+$/.test(ref.slice(REF_PREFIX.length))) return null;
  return ref;
}

function send(ref: string, event: string): void {
  try {
    const body = JSON.stringify({ ref, event, ts: new Date().toISOString() });
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
      return;
    }
    void fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    /* never block the page */
  }
}

export function SdrBeacon() {
  useEffect(() => {
    const ref = readRef();
    if (!ref) return;
    send(ref, "open");

    const fired = new Set<string>();
    const onTime = (event: Event) => {
      const video = event.target as HTMLVideoElement | null;
      if (!video || !video.duration) return;
      const pct = video.currentTime / video.duration;
      for (const [threshold, name] of DEPTHS) {
        if (pct >= threshold && !fired.has(name)) {
          fired.add(name);
          send(ref, name);
        }
      }
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest("a[href='/book'], a[href$='/book']");
      if (link) send(ref, "book_click");
    };

    const video = document.querySelector("video");
    video?.addEventListener("timeupdate", onTime);
    document.addEventListener("click", onClick);
    return () => {
      video?.removeEventListener("timeupdate", onTime);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
