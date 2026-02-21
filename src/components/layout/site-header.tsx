"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/providers/locale-provider";

function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, t, setLocale } = useLocale();

  const navLinks = [
    { label: t.nav.webDesign, href: "/web-design" },
    { label: t.nav.solutions, href: "/solutions" },
    { label: t.nav.howItWorks, href: "/#how-it-works" },
    { label: t.nav.pricing, href: "/#pricing" },
    { label: t.nav.calculator, href: "/calculator" },
    { label: t.nav.about, href: "/about" },
  ];

  const toggleLocale = () => {
    setLocale(locale === "en" ? "es" : "en");
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center px-4 pt-3 sm:px-6">
      {/* Pill-shaped nav bar */}
      <nav className="flex h-11 w-full max-w-[760px] items-center rounded-[50px] bg-[#F7F5F3]/90 px-4 py-1.5 pr-2 shadow-[0px_0px_0px_2px_white] backdrop-blur-sm sm:h-12">
        {/* Logo (left column) */}
        <div className="flex w-[100px] shrink-0 items-center">
          <Link href="/" className="font-serif text-base font-normal text-[#2F3037] sm:text-lg">
            FlowAudit
          </Link>
        </div>

        {/* Nav Links (center column) */}
        <div className="hidden flex-1 justify-center gap-3 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-[12px] leading-[14px] font-medium text-[rgba(49,45,43,0.80)] transition-colors hover:text-[#37322F]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + Language + Mobile Toggle (right column) */}
        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
          {/* Language toggle */}
          <button
            onClick={toggleLocale}
            className="hidden items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium text-[rgba(49,45,43,0.70)] transition-colors hover:bg-[rgba(55,50,47,0.05)] hover:text-[#37322F] sm:inline-flex"
            aria-label={locale === "en" ? "Switch to Spanish" : "Cambiar a Inglés"}
          >
            <Globe className="h-3.5 w-3.5" />
            {locale === "en" ? "ES" : "EN"}
          </button>

          <Button size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="/book">{t.nav.bookCall}</Link>
          </Button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-full p-1.5 transition-colors hover:bg-[rgba(55,50,47,0.05)] lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-[#F7F5F3]/98 backdrop-blur-md lg:hidden">
          <div className="flex flex-col items-center gap-6 pt-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium text-[#37322F]"
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile language toggle */}
            <button
              onClick={() => {
                toggleLocale();
                setMobileOpen(false);
              }}
              className="flex items-center gap-2 text-base font-medium text-[#605A57]"
            >
              <Globe className="h-4 w-4" />
              {locale === "en" ? "Español" : "English"}
            </button>
            <Button asChild className="mt-4">
              <Link href="/book" onClick={() => setMobileOpen(false)}>
                {t.nav.bookCall}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export { SiteHeader };
