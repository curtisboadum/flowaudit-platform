"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { c, text } from "@/lib/marketing-copy";
import { Arrow, BookLink } from "./primitives";

export function StickyCta() {
  const { locale } = useLocale();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`fa-sticky-cta ${visible ? "fa-sticky-cta-visible" : ""}`}>
      <BookLink service="phone-agent">
        {text(locale, c("Book a 15-minute call", "Reservar una llamada de 15 minutos"))}
      </BookLink>
      <a href="#recording" className="fa-sticky-hear">
        {text(locale, c("Hear the call", "Oír la llamada"))}
        <Arrow diagonal />
      </a>
    </div>
  );
}
