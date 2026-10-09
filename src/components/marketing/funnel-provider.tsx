"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/providers/locale-provider";
import { attribution, CONSENT_KEY, recordEvent } from "@/lib/funnel-client";
import { c, text, serviceId } from "@/lib/marketing-copy";

export function FunnelProvider() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const [visible, setVisible] = useState(false);
  const [choice, setChoice] = useState("");
  useEffect(() => {
    try {
      setChoice(localStorage.getItem(CONSENT_KEY) ?? "");
    } catch {
      setChoice("unavailable");
    }
    const show = () => setVisible(true);
    window.addEventListener("fa-privacy-open", show);
    return () => window.removeEventListener("fa-privacy-open", show);
  }, []);
  useEffect(() => {
    if (pathname.startsWith("/crm")) return;
    recordEvent("page_view");
    const click = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (
        !(target instanceof HTMLAnchorElement) ||
        target.origin !== location.origin ||
        target.pathname.startsWith("/crm")
      )
        return;
      const params = attribution();
      const url = new URL(target.href);
      for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
      target.href = url.toString();
      const service = serviceId(target.dataset.cta ?? url.searchParams.get("service"));
      if (target.pathname === "/book" || target.pathname === "/revenue-recovery/book")
        recordEvent("book_click", { service });
      else if (target.dataset.cta) recordEvent("cta_click", { service });
    };
    document.addEventListener("click", click, true);
    return () => document.removeEventListener("click", click, true);
  }, [pathname, choice]);
  const choose = (value: string) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
      if (value === "declined") {
        sessionStorage.removeItem("fa-attribution");
        sessionStorage.removeItem("fa-journey");
      }
    } catch {
      console.warn("[privacy] Preferences could not be saved");
    }
    setChoice(value);
    setVisible(false);
    window.dispatchEvent(new Event("fa-consent-change"));
  };
  if (pathname.startsWith("/crm") || (!visible && choice !== "")) return null;
  return (
    <aside
      className="fa-consent"
      aria-label={text(locale, c("Analytics preference", "Preferencia de analítica"))}
    >
      <p>
        {text(
          locale,
          c(
            "May we measure which pages, videos and booking links are useful? Optional analytics stays off until you agree. Booking works either way.",
            "¿Podemos medir qué páginas, vídeos y enlaces de reserva son útiles? La analítica opcional está desactivada hasta que aceptes. Puedes reservar de cualquier forma.",
          ),
        )}{" "}
        <a href="/privacy" className="underline">
          {text(locale, c("Privacy details", "Detalles de privacidad"))}
        </a>
      </p>
      <div>
        <button onClick={() => choose("declined")}>
          {text(locale, c("Keep analytics off", "Mantener desactivada"))}
        </button>
        <button onClick={() => choose("accepted")}>
          {text(locale, c("Allow analytics", "Permitir analítica"))}
        </button>
      </div>
    </aside>
  );
}
