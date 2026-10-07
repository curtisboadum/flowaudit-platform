/**
 * @file cal-embed.tsx
 * @description Inline cal.com booking embed (official embed.js). Light theme,
 *   month view, per-page brand color, idempotent init, and a fallback link.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
"use client";

import { useEffect, useId, useRef } from "react";
import { BOOKING_URL, CAL_LINK, CAL_NAMESPACE, CAL_ORIGIN } from "@/lib/booking";

type CalInstruction = (...args: unknown[]) => void;

type CalApi = CalInstruction & {
  ns: Record<string, CalInstruction>;
  loaded?: boolean;
  q?: unknown[];
};

const EMBED_SCRIPT_SRC = `${CAL_ORIGIN}/embed/embed.js`;

const initializedNamespaces = new Set<string>();
const readyCallbacks: Array<() => void> = [];
let embedScriptRequested = false;

function getCal(): CalApi | undefined {
  return (window as Window & { Cal?: CalApi }).Cal;
}

function onEmbedReady(callback: () => void): void {
  if (getCal()) {
    callback();
    return;
  }

  readyCallbacks.push(callback);

  if (!embedScriptRequested) {
    embedScriptRequested = true;
    const script = document.createElement("script");
    script.src = EMBED_SCRIPT_SRC;
    script.async = true;
    script.onload = () => {
      readyCallbacks.splice(0).forEach((fn) => {
        fn();
      });
    };
    document.head.appendChild(script);
  }
}

interface CalEmbedProps {
  brandColor?: string;
  className?: string;
}

function CalEmbed({ brandColor = "#37322F", className }: CalEmbedProps) {
  const reactId = useId();
  const containerId = `cal-inline-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;

    onEmbedReady(() => {
      const cal = getCal();
      if (!cal) {
        return;
      }

      if (!initializedNamespaces.has(CAL_NAMESPACE)) {
        cal("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });
        initializedNamespaces.add(CAL_NAMESPACE);
      }

      const namespaced = cal.ns[CAL_NAMESPACE];
      if (!namespaced) {
        return;
      }

      namespaced("inline", {
        elementOrSelector: `#${containerId}`,
        config: {
          layout: "month_view",
          useSlotsViewOnSmallScreen: "true",
          theme: "light",
        },
        calLink: CAL_LINK,
      });

      namespaced("ui", {
        theme: "light",
        cssVarsPerTheme: { light: { "cal-brand": brandColor } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    });
  }, [brandColor, containerId]);

  return (
    <div className={className}>
      <div id={containerId} className="min-h-[600px] w-full" />
      <p className="mt-3 font-sans text-xs text-[rgba(55,50,47,0.50)]">
        Calendar not loading?{" "}
        <a
          className="underline underline-offset-2 hover:text-[#37322F]"
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open the booking page in a new tab
        </a>
        .
      </p>
    </div>
  );
}

export { CalEmbed };
