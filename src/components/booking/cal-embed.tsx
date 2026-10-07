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

type CalNamespaceApi = CalInstruction & { q?: unknown[] };

type CalApi = CalInstruction & {
  ns: Record<string, CalNamespaceApi>;
  loaded?: boolean;
  q?: unknown[];
};

const EMBED_SCRIPT_SRC = `${CAL_ORIGIN}/embed/embed.js`;
const CAL_INIT_INSTRUCTION = "init";

const initializedNamespaces = new Set<string>();

function getCal(): CalApi | undefined {
  return (window as Window & { Cal?: CalApi }).Cal;
}

function createCalProxy(): CalApi {
  const cal = ((...args: unknown[]) => {
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = [];
      const script = document.createElement("script");
      script.src = EMBED_SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
      cal.loaded = true;
    }

    cal.q = cal.q ?? [];

    if (args[0] === CAL_INIT_INSTRUCTION) {
      const namespace = args[1];
      if (typeof namespace === "string") {
        const api = ((...apiArgs: unknown[]) => {
          api.q = api.q ?? [];
          api.q.push(apiArgs);
        }) as CalNamespaceApi;
        const nsApi = cal.ns[namespace] ?? api;
        cal.ns[namespace] = nsApi;
        nsApi(...args);
        cal.q.push(["initNamespace", namespace]);
      } else {
        cal.q.push(args);
      }
      return;
    }

    cal.q.push(args);
  }) as CalApi;

  cal.ns = {};
  cal.q = [];
  return cal;
}

function ensureCal(): CalApi {
  const existing = getCal();
  if (existing) {
    return existing;
  }
  const proxy = createCalProxy();
  (window as Window & { Cal?: CalApi }).Cal = proxy;
  return proxy;
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

    const cal = ensureCal();

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
