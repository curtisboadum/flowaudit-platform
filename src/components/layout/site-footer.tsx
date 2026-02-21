"use client";

import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";

function SiteFooter() {
  const { t } = useLocale();

  const footerLinks = {
    solutions: {
      title: t.footer.solutionsTitle,
      links: [
        { label: t.nav.webDesign, href: "/web-design" },
        { label: "Automation Library", href: "/solutions" },
        { label: "Industries", href: "/industries/trades" },
        { label: "Results", href: "/results" },
        { label: t.nav.pricing, href: "/#pricing" },
      ],
    },
    company: {
      title: t.footer.companyTitle,
      links: [
        { label: t.nav.about, href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: t.nav.careers, href: "/careers" },
        { label: t.nav.bookCall, href: "/book" },
      ],
    },
    resources: {
      title: t.footer.resourcesTitle,
      links: [
        { label: t.nav.howItWorks, href: "/#how-it-works" },
        { label: t.nav.calculator, href: "/calculator" },
        { label: "FAQ", href: "/#faq" },
        { label: "Security", href: "/#security" },
      ],
    },
  };

  return (
    <footer className="w-full border-t border-[rgba(55,50,47,0.12)]">
      <div className="mx-auto max-w-[1060px] px-4 sm:px-6 lg:px-0">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 sm:py-16 lg:grid-cols-4 lg:gap-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="font-serif text-xl font-normal text-[#2F3037]">
              FlowAudit
            </Link>
            <p className="mt-3 max-w-[280px] font-sans text-sm leading-6 text-[#605A57]">
              {t.footer.tagline}
            </p>
            {/* Social icons */}
            <div className="mt-5 flex gap-4">
              <a
                href="https://x.com/flowaudit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#605A57] transition-colors hover:text-[#37322F]"
                aria-label="Twitter/X"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/flowaudit/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#605A57] transition-colors hover:text-[#37322F]"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 font-sans text-sm font-semibold text-[#37322F]">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm font-normal text-[#605A57] transition-colors hover:text-[#37322F]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Geometric pattern band */}
        <div className="relative h-10 overflow-hidden border-t border-[rgba(55,50,47,0.12)]">
          <div className="absolute inset-0 flex">
            {Array.from({ length: 80 }).map((_, i) => (
              <div key={i} className="h-full w-3 shrink-0 border-r border-[rgba(55,50,47,0.04)]" />
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[rgba(55,50,47,0.12)] py-6 sm:flex-row">
          <p className="font-sans text-xs text-[#605A57]">
            {t.footer.copyright}
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="font-sans text-xs text-[#605A57] transition-colors hover:text-[#37322F]"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href="/terms"
              className="font-sans text-xs text-[#605A57] transition-colors hover:text-[#37322F]"
            >
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { SiteFooter };
