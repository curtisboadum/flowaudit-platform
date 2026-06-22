/**
 * @file page.tsx
 * @description Dedicated Revenue Recovery booking page (/revenue-recovery/book).
 *   A branded scheduling page to send directly to Revenue Recovery leads; reuses
 *   the shared Calendly embed and the warm RR styling. Served locally (a real
 *   filesystem route), so the /revenue-recovery/:path* proxy never shadows it.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumbs";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { RevenueRecoveryBookContent } from "./revenue-recovery-book-content";

export const metadata: Metadata = {
  title: "Book Your Free Revenue Audit | FlowAudit",
  description:
    "Book a free 30-minute Revenue Recovery audit. We'll map your overdue invoices and show how much cash we can recover for you — no commitment, no pressure.",
  alternates: { canonical: "/revenue-recovery/book" },
  openGraph: {
    title: "Book Your Free Revenue Audit | FlowAudit",
    description:
      "Book a free 30-minute Revenue Recovery audit. See how much overdue cash we can recover for you.",
    url: canonicalUrl("/revenue-recovery/book"),
    type: "website",
  },
};

export default function RevenueRecoveryBookPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full max-w-[1060px]">
        <div className="px-4 pt-24 sm:px-6 sm:pt-28 lg:px-0 lg:pt-32">
          <Breadcrumbs
            items={[
              { name: "Revenue Recovery", href: "/revenue-recovery" },
              { name: "Book", href: "/revenue-recovery/book" },
            ]}
          />
        </div>
        <RevenueRecoveryBookContent />
      </div>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: canonicalUrl("/") },
          { name: "Revenue Recovery", url: canonicalUrl("/revenue-recovery") },
          { name: "Book", url: canonicalUrl("/revenue-recovery/book") },
        ])}
      />
    </div>
  );
}
