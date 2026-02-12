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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center px-4 sm:px-6 pt-3">
      {/* Pill-shaped nav bar */}
      <nav className="w-full max-w-[700px] h-11 sm:h-12 py-1.5 px-4 pr-2 bg-[#F7F5F3]/90 backdrop-blur-sm shadow-[0px_0px_0px_2px_white] rounded-[50px] flex justify-between items-center">
        {/* Logo + Nav Links */}
        <div className="flex items-center">
          <Link href="/" className="text-[#2F3037] text-base sm:text-lg font-normal font-serif">
            FlowAudit
          </Link>
          <div className="hidden sm:flex pl-5 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[rgba(49,45,43,0.80)] text-[13px] font-medium leading-[14px] font-sans hover:text-[#37322F] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <Button size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="/book">Book a Call</Link>
          </Button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden p-1.5 rounded-full hover:bg-[rgba(55,50,47,0.05)] transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden fixed inset-0 top-16 bg-[#F7F5F3]/98 backdrop-blur-md z-40">
          <div className="flex flex-col items-center gap-6 pt-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[#37322F] text-lg font-medium"
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
