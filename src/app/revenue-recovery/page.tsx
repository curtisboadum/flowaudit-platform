/**
 * @file page.tsx
 * @description Revenue Recovery Desk landing page, a done-for-you AI accounts-
 *   receivable recovery offer for B2B service businesses. Emits Service,
 *   FAQPage, and Breadcrumb JSON-LD; renders the themed client content.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { RevenueRecoveryContent } from "@/components/revenue-recovery/revenue-recovery-content";
import { getRevenueRecoveryCopy } from "@/components/revenue-recovery/revenue-recovery-copy";
import { SITE_URL, SITE_NAME, canonicalUrl } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "Revenue Recovery Desk | FlowAudit",
  description:
    "We install an AI-powered Revenue Recovery Desk inside your business, it finds overdue invoices, follows up automatically, escalates disputes, and reports recovered cash weekly. No collections-agency aggression. No new hires.",
  alternates: {
    canonical: "/revenue-recovery",
  },
  openGraph: {
    title: "Revenue Recovery Desk | FlowAudit",
    description:
      "Done-for-you AI accounts-receivable recovery for B2B service businesses. Recover what you're owed without lifting a finger.",
    url: canonicalUrl("/revenue-recovery"),
    type: "website",
  },
};

const copy = getRevenueRecoveryCopy("en");

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Revenue Recovery Desk",
  serviceType: "Accounts Receivable Recovery",
  description:
    "AI-assisted, human-reviewed accounts-receivable recovery for B2B service businesses. Finds overdue invoices, follows up professionally, escalates disputes, and reports recovered cash weekly.",
  provider: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
  areaServed: [
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Paraguay" },
  ],
  url: canonicalUrl("/revenue-recovery"),
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: copy.faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function RevenueRecoveryPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-[1060px] px-4 pt-24 sm:px-6 sm:pt-28 lg:px-0 lg:pt-32">
        <Breadcrumbs items={[{ name: "Revenue Recovery", href: "/revenue-recovery" }]} />
      </div>
      <RevenueRecoveryContent />
      <JsonLd data={SERVICE_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: canonicalUrl("/") },
          { name: "Revenue Recovery", url: canonicalUrl("/revenue-recovery") },
        ])}
      />
    </>
  );
}
