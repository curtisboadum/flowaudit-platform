"use client";

/**
 * @file watch-measurement-notice.tsx
 * @description Small, page-level measurement notice for personalized demo
 *   links. First-party mode uses a cookie-less in-memory session and a
 *   server-side per-link opt-out. Consent mode reuses the site's existing
 *   optional-analytics choice. No ad cookies, no third-party sharing.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import { useEffect, useState } from "react";
import { analyticsAllowed, CONSENT_KEY } from "@/lib/funnel-client";

type MeasurementMode = "first_party" | "consent";

export function WatchMeasurementNotice({
  leadRef,
  linkRef,
  demoId,
  mode,
  measurementOff,
}: {
  leadRef: string;
  linkRef: string;
  demoId: string;
  mode: MeasurementMode;
  measurementOff: boolean;
}) {
  const [hidden, setHidden] = useState(measurementOff);
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (mode === "consent") setConsented(analyticsAllowed());
  }, [mode]);

  if (hidden) return null;
  if (mode === "consent" && consented) return null;

  const allow = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "accepted");
    } catch {
      /* Storage may be disabled; the page still works. */
    }
    window.dispatchEvent(new Event("fa-consent-change"));
    setConsented(true);
    setHidden(true);
  };

  const decline = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "declined");
    } catch {
      /* Storage may be disabled; the page still works. */
    }
    window.dispatchEvent(new Event("fa-consent-change"));
    setHidden(true);
  };

  const turnOff = () => {
    const body = JSON.stringify({
      ref: leadRef,
      event: "measurement_off",
      ts: new Date().toISOString(),
      surface: "watch",
      link_ref: linkRef,
      demo_id: demoId,
      session_id: crypto.randomUUID(),
    });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
      } else {
        void fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true,
        });
      }
    } catch {
      /* The local stop still applies for this page view. */
    }
    window.dispatchEvent(new Event("fa-watch-measurement-off"));
    setHidden(true);
  };

  return (
    <aside
      className="mt-10 w-full max-w-[640px] rounded-xl border border-[rgba(55,50,47,0.08)] bg-white/60 px-5 py-4 text-center"
      aria-label="Demo measurement"
    >
      {mode === "consent" ? (
        <>
          <p className="font-sans text-xs leading-5 text-[rgba(55,50,47,0.72)]">
            Optional analytics is off until you allow it. It records whether this page and the
            video were opened so I can follow up. It does not include your name, email or form
            answers. Booking works either way.{" "}
            <a href="/privacy" className="underline underline-offset-4">
              Privacy details
            </a>
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={decline}
              className="rounded-full border border-[rgba(55,50,47,0.16)] px-3 py-1.5 font-sans text-xs text-[#37322F]"
            >
              Keep analytics off
            </button>
            <button
              type="button"
              onClick={allow}
              className="rounded-full bg-[#37322F] px-3 py-1.5 font-sans text-xs text-white"
            >
              Allow analytics
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="font-sans text-xs leading-5 text-[rgba(55,50,47,0.72)]">
            I record whether this page and the video were opened so I can follow up. No cookies,
            no ad tracking and no third-party sharing.{" "}
            <a href="/privacy" className="underline underline-offset-4">
              Privacy details
            </a>
          </p>
          <button
            type="button"
            onClick={turnOff}
            className="mt-3 rounded-full border border-[rgba(55,50,47,0.16)] px-3 py-1.5 font-sans text-xs text-[#37322F]"
          >
            Turn measurement off
          </button>
        </>
      )}
    </aside>
  );
}
