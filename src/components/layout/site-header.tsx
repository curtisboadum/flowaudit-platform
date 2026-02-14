"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Calculator", href: "/calculator" },
  { label: "About", href: "/about" },
] as const;

function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center px-4 pt-3 sm:px-6">
      {/* Pill-shaped nav bar */}
      <nav className="flex h-11 w-full max-w-[700px] items-center rounded-[50px] bg-[#F7F5F3]/90 px-4 py-1.5 pr-2 shadow-[0px_0px_0px_2px_white] backdrop-blur-sm sm:h-12">
        {/* Logo (left column) */}
        <div className="flex w-[100px] shrink-0 items-center">
          <Link href="/" className="font-serif text-base font-normal text-[#2F3037] sm:text-lg">
            FlowAudit
          </Link>
        </div>

        {/* Nav Links (center column) */}
        <div className="hidden flex-1 justify-center gap-4 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-[13px] leading-[14px] font-medium text-[rgba(49,45,43,0.80)] transition-colors hover:text-[#37322F]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + Mobile Toggle (right column) */}
        <div className="ml-auto flex w-[100px] shrink-0 items-center justify-end gap-2 sm:ml-0">
          <Button size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="/book">Book a Call</Link>
          </Button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-full p-1.5 transition-colors hover:bg-[rgba(55,50,47,0.05)] sm:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-[#F7F5F3]/98 backdrop-blur-md sm:hidden">
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
            <Button asChild className="mt-4">
              <Link href="/book" onClick={() => setMobileOpen(false)}>
                Book a Call
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export { SiteHeader };
