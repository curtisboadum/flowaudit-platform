import Link from "next/link";

const footerLinks = {
  solutions: {
    title: "Solutions",
    links: [
      { label: "Automation Library", href: "/solutions" },
      { label: "Industries", href: "/industries/trades" },
      { label: "Results", href: "/results" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Book a Call", href: "/book" },
      { label: "Contact", href: "/book" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "How It Works", href: "/#how-it-works" },
      { label: "ROI Calculator", href: "/calculator" },
      { label: "Time Savings Calculator", href: "/#calculator" },
      { label: "FAQ", href: "/#faq" },
      { label: "Security", href: "/#security" },
    ],
  },
} as const;

function SiteFooter() {
  return (
    <footer className="w-full border-t border-[rgba(55,50,47,0.12)]">
      <div className="max-w-[1060px] mx-auto px-4 sm:px-6 lg:px-0">
        {/* Main footer content */}
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-[#2F3037] text-xl font-normal font-serif">
              FlowAudit
            </Link>
            <p className="mt-3 text-[#605A57] text-sm leading-6 font-sans max-w-[280px]">
              AI operations assistants for teams drowning in repetitive work.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-5">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#605A57] hover:text-[#37322F] transition-colors"
                aria-label="Twitter/X"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#605A57] hover:text-[#37322F] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((column) => (
            <div key={column.title}>
              <h3 className="text-[#37322F] text-sm font-semibold font-sans mb-4">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#605A57] text-sm font-normal font-sans hover:text-[#37322F] transition-colors"
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
        <div className="border-t border-[rgba(55,50,47,0.12)] h-10 relative overflow-hidden">
          <div className="absolute inset-0 flex">
            {Array.from({ length: 80 }).map((_, i) => (
              <div
                key={i}
                className="h-full w-3 border-r border-[rgba(55,50,47,0.04)] shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(55,50,47,0.12)] py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#605A57] text-xs font-sans">
            &copy; {new Date().getFullYear()} FlowAudit. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-[#605A57] text-xs font-sans hover:text-[#37322F] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[#605A57] text-xs font-sans hover:text-[#37322F] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { SiteFooter };
