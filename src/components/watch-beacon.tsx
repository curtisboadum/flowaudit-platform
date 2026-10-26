"use client";

/**
 * @file watch-beacon.tsx
 * @description Fires the personalized demo events from a /watch page. The ref,
 *   link_ref and demo_id come from the server-resolved row; the token never
 *   leaves the page URL. A page open only counts after the page has been
 *   visible for 1.5s, and video depth uses covered playback, not a seek.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import { useEffect, useRef } from "react";
import {
  analyticsAllowed,
  resetWatchBaseline,
  watchedCoverage,
  type FunnelEvent,
} from "@/lib/funnel-client";

type MeasurementMode = "first_party" | "consent";

interface BeaconEventPayload {
  visible?: boolean;
  interacted?: boolean;
  pct?: number;
}

function send(
  ref: string,
  event: string,
  fields: {
    linkRef: string;
    demoId: string;
    sessionId: string;
  },
  extra: BeaconEventPayload = {},
): void {
  try {
    const body = JSON.stringify({
      ref,
      event,
      ts: new Date().toISOString(),
      surface: "watch",
      link_ref: fields.linkRef,
      demo_id: fields.demoId,
      session_id: fields.sessionId,
      webdriver: typeof navigator !== "undefined" && navigator.webdriver === true,
      ...extra,
    });
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

export function WatchBeacon({
  leadRef,
  demoId,
  linkRef,
  measurementMode,
  measurementOff,
}: {
  leadRef: string;
  demoId: string;
  linkRef: string;
  measurementMode: MeasurementMode;
  measurementOff: boolean;
}) {
  const stoppedRef = useRef(false);

  useEffect(() => {
    if (measurementOff) return;
    stoppedRef.current = false;
    const sessionId = crypto.randomUUID();
    const fields = { linkRef, demoId, sessionId };
    const allowed = () => {
      if (stoppedRef.current) return false;
      return measurementMode === "consent" ? analyticsAllowed() : true;
    };
    let opened = false;
    let started = false;
    let interacted = false;
    let openTimer: ReturnType<typeof setTimeout> | null = null;

    const clearOpenTimer = () => {
      if (openTimer) {
        clearTimeout(openTimer);
        openTimer = null;
      }
    };
    const scheduleOpen = () => {
      if (opened || !allowed() || document.visibilityState !== "visible") return;
      clearOpenTimer();
      openTimer = setTimeout(() => {
        if (!opened && allowed() && document.visibilityState === "visible") {
          opened = true;
          send(leadRef, "watch_open", fields, { visible: true, interacted });
        }
      }, 1500);
    };

    const video = document.getElementById("watch-video") as HTMLVideoElement | null;
    const onPlay = () => {
      if (!allowed()) return;
      if (!started) {
        started = true;
        send(leadRef, "video_start", fields);
      }
      resetWatchBaseline(video as HTMLVideoElement);
    };
    const onTime = () => {
      if (!video || !allowed()) return;
      watchedCoverage(
        video,
        demoId,
        "phone-agent",
        (event: FunnelEvent) => {
          const pct =
            Number.isFinite(video.duration) && video.duration > 0
              ? Math.round((video.currentTime / video.duration) * 100)
              : undefined;
          send(leadRef, event, fields, { pct });
        },
        allowed,
      );
    };
    const reset = () => {
      if (video) resetWatchBaseline(video);
    };
    const onInteract = () => {
      interacted = true;
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target || !allowed()) return;
      if (target.closest("a[href^='/book']")) {
        send(leadRef, "cta_click", fields);
        return;
      }
      if (target.closest("a[data-watch-transcript]")) {
        send(leadRef, "transcript_click", fields);
      }
    };
    const onMeasurementOff = () => {
      stoppedRef.current = true;
      clearOpenTimer();
    };
    const onConsentChange = () => {
      if (allowed()) scheduleOpen();
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") scheduleOpen();
      else clearOpenTimer();
    };

    scheduleOpen();
    video?.addEventListener("play", onPlay);
    video?.addEventListener("timeupdate", onTime);
    for (const name of ["pause", "seeking", "seeked"]) video?.addEventListener(name, reset);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("pointerdown", onInteract, { passive: true });
    document.addEventListener("keydown", onInteract);
    // Capture phase: a link component may stop propagation before the bubble.
    document.addEventListener("click", onClick, true);
    window.addEventListener("fa-consent-change", onConsentChange);
    window.addEventListener("fa-watch-measurement-off", onMeasurementOff);

    return () => {
      clearOpenTimer();
      video?.removeEventListener("play", onPlay);
      video?.removeEventListener("timeupdate", onTime);
      for (const name of ["pause", "seeking", "seeked"]) video?.removeEventListener(name, reset);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("pointerdown", onInteract);
      document.removeEventListener("keydown", onInteract);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("fa-consent-change", onConsentChange);
      window.removeEventListener("fa-watch-measurement-off", onMeasurementOff);
    };
  }, [leadRef, demoId, linkRef, measurementMode, measurementOff]);

  return null;
}
