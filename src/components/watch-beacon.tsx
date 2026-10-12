"use client";

/**
 * @file watch-beacon.tsx
 * @description Fires SDR funnel beacons from a token-gated /watch page:
 *   watch_open on load, video depth, and cta_click on the book CTA. The ref
 *   comes from the server (resolved token -> lead), never from the URL, so
 *   the token itself is never sent anywhere. Fire-and-forget; never blocks.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import { useEffect } from "react";

const DEPTHS: ReadonlyArray<readonly [number, string]> = [
  [0.25, "video_25"],
  [0.5, "video_50"],
  [0.75, "video_75"],
];

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

export function WatchBeacon({ leadRef }: { leadRef: string }) {
  useEffect(() => {
    send(leadRef, "watch_open");

    const fired = new Set<string>();
    const onTime = (event: Event) => {
      const video = event.target as HTMLVideoElement | null;
      if (!video || !video.duration) return;
      const pct = video.currentTime / video.duration;
      for (const [threshold, name] of DEPTHS) {
        if (pct >= threshold && !fired.has(name)) {
          fired.add(name);
          send(leadRef, name);
        }
      }
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest("a[href^='/book']");
      if (link) send(leadRef, "cta_click");
    };

    const video = document.querySelector("video");
    video?.addEventListener("timeupdate", onTime);
    document.addEventListener("click", onClick);
    return () => {
      video?.removeEventListener("timeupdate", onTime);
      document.removeEventListener("click", onClick);
    };
  }, [leadRef]);

  return null;
}
