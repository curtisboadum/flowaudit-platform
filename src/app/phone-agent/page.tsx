/**
 * @file page.tsx
 * @description AI Phone Agent offer page for dental practices. Emits Service,
 *   FAQPage, and Breadcrumb JSON-LD; renders the localized client content.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { PhoneAgentContent } from "./phone-agent-content";
import { SITE_URL, SITE_NAME, canonicalUrl } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumbs";
import { en } from "@/lib/translations/en";

export const metadata: Metadata = {
  title: "AI Phone Agent for Dental Practices | FlowAudit",
  description:
    "The FlowAudit AI phone agent answers every call, triages urgent cases, and books patients straight into your calendar, day and night. Watch the demo call.",
  alternates: {
    canonical: "/phone-agent",
  },
  openGraph: {
    title: "AI Phone Agent for Dental Practices | FlowAudit",
    description:
      "Answers every call, triages urgent cases, and books patients into your calendar. Watch the full demo call.",
    url: canonicalUrl("/phone-agent"),
    type: "website",
  },
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "FlowAudit AI Phone Agent",
  serviceType: "AI phone answering and appointment booking for dental practices",
  description:
    "An AI phone agent that answers practice calls, qualifies callers, triages urgent cases, and books appointments into the practice calendar, alongside the existing team and number.",
  provider: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Canada" },
  ],
  url: canonicalUrl("/phone-agent"),
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: en.phoneAgent.faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function PhoneAgentPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-[1060px] px-4 pt-24 sm:px-6 sm:pt-28 lg:px-0 lg:pt-32">
        <Breadcrumbs items={[{ name: "AI Phone Agent", href: "/phone-agent" }]} />
      </div>
      <div className="flex min-h-screen w-full flex-col items-center">
        <div className="w-full max-w-[1060px]">
          <PhoneAgentContent />
        </div>
      </div>
      <JsonLd data={SERVICE_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: canonicalUrl("/") },
          { name: "AI Phone Agent", url: canonicalUrl("/phone-agent") },
        ])}
      />
    </>
  );
}
