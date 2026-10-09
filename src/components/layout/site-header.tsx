"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { Arrow } from "@/components/marketing/primitives";
import { c, text, offers } from "@/lib/marketing-copy";

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  const links = [
    { href: "/services", label: c("Services", "Servicios") },
    { href: "/demos", label: c("See the work", "Ver el trabajo") },
    { href: "/how-it-works", label: c("Our approach", "Nuestro enfoque") },
    { href: "/about", label: c("About", "Nosotros") },
  ];
  return (
    <header className="fa-header">
      <div className="fa-container fa-header-inner">
        <Link href="/" className="fa-wordmark" aria-label="FlowAudit home">
          FlowAudit<span aria-hidden="true">.</span>
        </Link>
        <nav
          aria-label={text(locale, c("Main navigation", "Navegación principal"))}
          className="fa-desktop-nav"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {text(locale, link.label)}
            </Link>
          ))}
        </nav>
        <div className="fa-header-actions">
          <button
            className="fa-language"
            onClick={() => setLocale(locale === "en" ? "es" : "en")}
            aria-label={locale === "en" ? "ES — Switch to Spanish" : "EN — Cambiar a inglés"}
          >
            {locale === "en" ? "ES" : "EN"}
          </button>
          <Link
            href={
              pathname === "/phone-agent" ? "/book?service=phone-agent" : "/book?service=general"
            }
            className="fa-nav-book"
            data-cta={pathname === "/phone-agent" ? "phone-agent" : "general"}
          >
            {text(locale, c("Let’s talk", "Hablemos"))}
            <Arrow diagonal />
          </Link>
          <button
            className="fa-menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
            aria-label={text(locale, c("Navigation menu", "Menú de navegación"))}
          >
            <span>
              {open ? text(locale, c("Close", "Cerrar")) : text(locale, c("Menu", "Menú"))}
            </span>
            <span aria-hidden="true">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav
          className="fa-mobile-nav fa-container"
          id="mobile-navigation"
          aria-label={text(locale, c("Mobile navigation", "Navegación móvil"))}
        >
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {text(locale, link.label)}
              <Arrow diagonal />
            </Link>
          ))}
          <div className="fa-mobile-services">
            {offers.map((offer) => (
              <Link key={offer.id} href={offer.path} onClick={() => setOpen(false)}>
                {text(locale, offer.label)}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
