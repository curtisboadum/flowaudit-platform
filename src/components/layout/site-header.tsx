"use client";

/**
 * @file site-header.tsx
 * @description Sticky pill nav with locale toggle and mobile menu. Surfaces the
 *   Revenue Recovery Desk as a featured amber nav action (desktop + mobile).
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/providers/locale-provider";

type NavLink = { label: string; href: string };

interface DesktopNavProps {
  links: NavLink[];
  revenueRecoveryLabel: string;
  showClientLogin: boolean;
}

function DesktopNav({ links, revenueRecoveryLabel, showClientLogin }: DesktopNavProps) {
  return (
    <div className="hidden min-w-0 flex-1 items-center justify-center gap-2 lg:flex xl:gap-2.5">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="font-sans text-[12px] leading-[14px] font-medium text-[rgba(49,45,43,0.80)] transition-colors hover:text-[#37322F]"
        >
          {link.label}
        </Link>
      ))}
      {/* Featured: Revenue Recovery Desk */}
      <Link
        href="/revenue-recovery"
        className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 font-sans text-[12px] leading-[14px] font-semibold whitespace-nowrap text-amber-700 transition-colors hover:bg-amber-100 hover:text-amber-800"
      >
        <Banknote className="h-3.5 w-3.5" />
        {revenueRecoveryLabel}
      </Link>
      {showClientLogin && (
        <Link
          href="/revenue-recovery/client?login=1"
          className="inline-flex items-center rounded-full border border-[rgba(55,50,47,0.12)] bg-white px-2.5 py-1 font-sans text-[12px] leading-[14px] font-semibold whitespace-nowrap text-[#37322F] transition-colors hover:border-amber-200 hover:bg-amber-50"
        >
          Client Login
        </Link>
      )}
    </div>
  );
}

interface MobileMenuProps {
  links: NavLink[];
  isSpanish: boolean;
  revenueRecoveryLabel: string;
  bookCallLabel: string;
  showClientLogin: boolean;
  onClose: () => void;
  onToggleLocale: () => void;
}

function MobileMenu({
  links,
  isSpanish,
  revenueRecoveryLabel,
  bookCallLabel,
  showClientLogin,
  onClose,
  onToggleLocale,
}: MobileMenuProps) {
  return (
    <div className="fixed inset-0 top-16 z-40 bg-[#F7F5F3]/98 backdrop-blur-md lg:hidden">
      <div className="flex flex-col items-center gap-6 pt-12">
        {/* Featured: Revenue Recovery Desk */}
        <Link
          href="/revenue-recovery"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-5 py-2 text-lg font-semibold text-amber-700"
        >
          <Banknote className="h-5 w-5" />
          {revenueRecoveryLabel}
        </Link>
        {showClientLogin && (
          <Link
            href="/revenue-recovery/client?login=1"
            onClick={onClose}
            className="inline-flex items-center rounded-full border border-[rgba(55,50,47,0.12)] bg-white px-5 py-2 text-base font-semibold text-[#37322F]"
          >
            Client Login
          </Link>
        )}
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-lg font-medium text-[#37322F]"
          >
            {link.label}
          </Link>
        ))}
        {/* Mobile language toggle */}
        <button
          onClick={() => {
            onToggleLocale();
            onClose();
          }}
          className="flex items-center gap-2 text-base font-medium text-[#605A57]"
        >
          <Globe className="h-4 w-4" />
          {isSpanish ? "English" : "Español"}
        </button>
        <Button asChild className="mt-4">
          <Link href="/book" onClick={onClose}>
            {bookCallLabel}
          </Link>
        </Button>
      </div>
    </div>
  );
}

function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { locale, t, setLocale } = useLocale();

  const navLinks: NavLink[] = [
    { label: t.nav.webDesign, href: "/web-design" },
    { label: t.nav.solutions, href: "/solutions" },
    { label: t.nav.howItWorks, href: "/#how-it-works" },
    { label: t.nav.about, href: "/about" },
  ];

  const toggleLocale = () => {
    setLocale(locale === "en" ? "es" : "en");
  };
  const showClientLogin = pathname === "/revenue-recovery" || pathname?.startsWith("/revenue-recovery/") === true;

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center bg-[#F7F5F3] px-4 pb-2 pt-3 sm:px-6">
      {/* Pill-shaped nav bar */}
      <nav className="flex h-11 w-full max-w-[860px] items-center rounded-[50px] bg-[#F7F5F3] px-4 py-1.5 pr-2 shadow-[0px_0px_0px_2px_white,0px_2px_8px_rgba(55,50,47,0.08)] sm:h-12">
        {/* Logo (left column) */}
        <div className="flex w-[100px] shrink-0 items-center">
          <Link href="/" className="font-serif text-base font-normal text-[#2F3037] sm:text-lg">
            FlowAudit
          </Link>
        </div>

        <DesktopNav links={navLinks} revenueRecoveryLabel={t.nav.revenueRecovery} showClientLogin={showClientLogin} />

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
        <MobileMenu
          links={navLinks}
          isSpanish={locale === "es"}
          revenueRecoveryLabel={t.nav.revenueRecovery}
          bookCallLabel={t.nav.bookCall}
          showClientLogin={showClientLogin}
          onClose={() => setMobileOpen(false)}
          onToggleLocale={toggleLocale}
        />
      )}
    </header>
  );
}

export { SiteHeader };
