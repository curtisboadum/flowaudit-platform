/**
 * @file page.tsx
 * @description Solutions page — lists the automation library by tier. Prices are
 *   no longer shown; CTAs route to a booking call.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL, canonicalUrl } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumbs";
import { TIERS } from "@/lib/calculator-data";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Solutions | FlowAudit Automation Library",
  description:
    "53 automations across 4 tiers. Lead capture, onboarding, invoicing, compliance, AI qualification, and more. All powered by AI agents.",
  alternates: {
    canonical: "/solutions",
  },
};

type TierData = (typeof TIERS)[keyof typeof TIERS];

const tierMeta: Record<string, { hoursSaved: string; systems: string }> = {
  tier1: { hoursSaved: "5-10 hrs/week", systems: "CRM, Email, SMS, Slack" },
  tier2: { hoursSaved: "10-20 hrs/week", systems: "CRM, Accounting, Portals, Drive" },
  tier3: { hoursSaved: "15-30 hrs/week", systems: "AMS, CRM, Accounting, Calendar, E-Sign" },
  tier4: { hoursSaved: "20-40+ hrs/week", systems: "Any API, AI Models, Multi-Channel" },
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "FlowAudit Automation Library",
  description:
    "53 automations across 4 tiers. Lead capture, onboarding, invoicing, compliance, AI qualification, and more.",
  provider: {
    "@type": "Organization",
    name: "FlowAudit",
    url: SITE_URL,
  },
  url: canonicalUrl("/solutions"),
};

function TierSection({ tierKey, tier }: { tierKey: string; tier: TierData }) {
  const meta = tierMeta[tierKey];

  return (
    <section className="border-b border-[rgba(55,50,47,0.12)] px-4 py-12 sm:px-6 sm:py-16 lg:px-0">
      {/* Tier Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: tier.color }} />
            <h2 className="font-sans text-xl font-semibold text-[#37322F] sm:text-2xl">
              {tier.name}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-4 font-sans text-sm text-[#605A57]">
            <span>{tier.automations.length} automations</span>
            {meta && (
              <>
                <span className="text-[rgba(55,50,47,0.3)]">|</span>
                <span>{meta.hoursSaved} saved</span>
              </>
            )}
          </div>
        </div>
        {meta && (
          <div className="font-sans text-xs text-[#605A57]">Systems: {meta.systems}</div>
        )}
      </div>

      {/* Automations Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tier.automations.map((automation) => (
          <div
            key={automation.name}
            className={`rounded-xl border border-l-4 border-[rgba(55,50,47,0.08)] bg-white p-5 ${tier.colorClass}`}
          >
            <h3 className="mb-2 font-sans text-sm leading-tight font-semibold text-[#37322F]">
              {automation.name}
            </h3>
            <p className="font-sans text-xs leading-5 text-[#605A57]">{automation.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function SolutionsPage() {
  const tierEntries = Object.entries(TIERS);

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full max-w-[1060px]">
        <div className="px-4 pt-24 sm:px-6 sm:pt-28 lg:px-0 lg:pt-32">
          <Breadcrumbs items={[{ name: "Solutions", href: "/solutions" }]} />
        </div>
        {/* Hero */}
        <section className="flex flex-col items-center border-b border-[rgba(55,50,47,0.12)] px-4 pt-8 pb-16 text-center sm:px-6 sm:pb-20 lg:px-0">
          <Badge text="Automation Library" />
          <h1 className="mt-4 max-w-[700px] font-serif text-3xl leading-[1.1] font-normal text-[#37322F] sm:text-5xl lg:text-6xl">
            53 Automations. 4 Tiers. One Platform.
          </h1>
          <p className="mt-6 max-w-[550px] font-sans text-base leading-7 text-[rgba(55,50,47,0.80)] sm:text-lg">
            Every automation is validated against our AI agents&apos; 700+ skill library and
            delivered as a production-ready workflow for your business.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5">
              <Zap className="h-3.5 w-3.5 text-emerald-600" />
              <span className="font-sans text-xs font-medium text-emerald-700">
                Powered by AI agents
              </span>
            </div>
          </div>
        </section>

        {/* Tier Sections */}
        {tierEntries.map(([key, tier]) => (
          <TierSection key={key} tierKey={key} tier={tier} />
        ))}

        {/* CTAs */}
        <section className="flex flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-0">
          <h2 className="font-serif text-2xl font-normal text-[#37322F] sm:text-3xl">
            Build Your Custom Package
          </h2>
          <p className="mt-4 max-w-[450px] font-sans text-sm text-[#605A57] sm:text-base">
            Mix and match automations from any tier, or choose a pre-built package tailored to your
            business.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/book">Book a Call</Link>
            </Button>
          </div>
          <p className="mt-4 font-sans text-xs text-[#605A57]">
            Free strategy call. No commitment, no pressure.
          </p>
        </section>
      </div>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: canonicalUrl("/") },
          { name: "Solutions", url: canonicalUrl("/solutions") },
        ])}
      />
      <JsonLd data={SERVICE_SCHEMA} />
    </div>
  );
}
