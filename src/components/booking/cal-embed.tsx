/**
 * @file cal-embed.tsx
 * @description Inline cal.com booking embed (official embed.js). Light theme,
 *   month view, per-page brand color, idempotent init, and a fallback link.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { recordEventOnce } from "@/lib/funnel-client";
import type { ServiceId } from "@/lib/marketing-copy";
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
  config?: Record<string, string>;
  service?: ServiceId;
}

function CalEmbed({
  brandColor = "#37322F",
  className,
  config = {},
  service = "general",
}: CalEmbedProps) {
  const reactId = useId();
  const containerId = `cal-inline-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const { locale } = useLocale();
  const [ready, setReady] = useState(false);
  const [delayed, setDelayed] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"confirmed" | "requested" | null>(null);
  const prefill = useRef(config);
  const bookingUrl = new URL(BOOKING_URL);
  for (const [key, value] of Object.entries(prefill.current))
    bookingUrl.searchParams.set(key, value);

  useEffect(() => {
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
        ...prefill.current,
      },
      calLink: CAL_LINK,
    });

    namespaced("ui", {
      theme: "light",
      cssVarsPerTheme: { light: { "cal-brand": brandColor } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
    let active = true;
    // Public Cal embed events, not internal iframe lifecycle messages.
    namespaced("on", {
      action: "linkReady",
      callback: () => {
        if (active) setReady(true);
      },
    });
    namespaced("on", {
      action: "bookerReady",
      callback: () => {
        if (active) {
          setReady(true);
          recordEventOnce("calendar_ready", { service });
        }
      },
    });
    namespaced("on", {
      action: "linkFailed",
      callback: () => {
        if (active) {
          setReady(false);
          setDelayed(true);
        }
      },
    });
    namespaced("on", {
      action: "bookingSuccessfulV2",
      callback: (event: {
        detail?: { data?: { uid?: string; status?: string; paymentRequired?: boolean } };
      }) => {
        const data = event.detail?.data;
        if (active && typeof data?.uid === "string" && data.uid) {
          setBookingStatus(
            data.status === "ACCEPTED" && !data.paymentRequired ? "confirmed" : "requested",
          );
        }
        // UI only. Signed server deliveries remain the source of booking measurement.
      },
    });
    const container = document.getElementById(containerId);
    const attach = () => {
      const frame = container?.querySelector("iframe");
      if (!frame) return;
      frame.title = "Book a 15-minute FlowAudit call";
    };
    const observer = new MutationObserver(attach);
    if (container) observer.observe(container, { childList: true, subtree: true });
    attach();
    const timeout = window.setTimeout(() => setDelayed(true), 10000);
    return () => {
      active = false;
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [brandColor, containerId, service]);

  return (
    <div className={className}>
      {bookingStatus && (
        <div role="status" className="fa-calendar-ready">
          <h3>
            {locale === "es"
              ? bookingStatus === "confirmed"
                ? "Reserva confirmada por Cal"
                : "Solicitud recibida por Cal"
              : bookingStatus === "confirmed"
                ? "Booking confirmed by Cal"
                : "Booking request received by Cal"}
          </h3>
          <p>
            {locale === "es"
              ? "Revisa la confirmación de Cal para el estado, enlace, zona horaria y opciones de cambio."
              : "Check Cal’s confirmation for the booking status, meeting link, timezone and rescheduling options."}
          </p>
        </div>
      )}
      {!ready && (
        <p role="status" className="fa-calendar-ready">
          {delayed
            ? locale === "es"
              ? "El calendario está tardando. Puedes usar el enlace directo de abajo."
              : "The calendar is taking longer than usual. You can use the direct booking link below."
            : locale === "es"
              ? "Cargando calendario…"
              : "Loading the booking calendar…"}
        </p>
      )}
      <div id={containerId} className="min-h-[600px] w-full" />
      <p className="mt-3 font-sans text-xs text-[#605A57]">
        {locale === "es" ? "¿No carga el calendario? " : "Calendar not loading? "}
        <a
          className="underline underline-offset-2 hover:text-[#37322F]"
          href={bookingUrl.toString()}
          target="_blank"
          rel="noopener noreferrer"
        >
          {locale === "es"
            ? "Abrir reservas en otra pestaña"
            : "Open the booking page in a new tab"}
        </a>
        .
      </p>
    </div>
  );
}

export { CalEmbed };
