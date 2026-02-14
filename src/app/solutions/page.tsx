import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL, canonicalUrl } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumbs";
import { TIERS } from "@/lib/calculator-data";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Solutions — FlowAudit Automation Library",
  description:
    "53 automations across 4 tiers. Lead capture, onboarding, invoicing, compliance, AI qualification, and more — all powered by OpenClaw.",
  alternates: {
    canonical: "/solutions",
  },
};

const tierMeta: Record<string, { hoursSaved: string; systems: string }> = {
  tier1: { hoursSaved: "5-10 hrs/week", systems: "CRM, Email, SMS, Slack" },
  tier2: { hoursSaved: "10-20 hrs/week", systems: "CRM, Accounting, Portals, Drive" },
  tier3: { hoursSaved: "15-30 hrs/week", systems: "AMS, CRM, Accounting, Calendar, E-Sign" },
  tier4: { hoursSaved: "20-40+ hrs/week", systems: "Any API, AI Models, Multi-Channel" },
};

export default function SolutionsPage() {
  const tierEntries = Object.entries(TIERS);

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full max-w-[1060px]">
        {/* Hero */}
        <section className="flex flex-col items-center border-b border-[rgba(55,50,47,0.12)] px-4 pt-28 pb-16 text-center sm:px-6 sm:pt-36 sm:pb-20 lg:px-0 lg:pt-44">
          <Badge text="Automation Library" />
          <h1 className="mt-4 max-w-[700px] font-serif text-3xl leading-[1.1] font-normal text-[#37322F] sm:text-5xl lg:text-6xl">
            53 Automations. 4 Tiers. One Platform.
          </h1>
          <p className="mt-6 max-w-[550px] font-sans text-base leading-7 text-[rgba(55,50,47,0.80)] sm:text-lg">
            Every automation is validated against OpenClaw&apos;s 700+ skill library and delivered
            as a production-ready workflow for your business.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5">
              <Zap className="h-3.5 w-3.5 text-emerald-600" />
              <span className="font-sans text-xs font-medium text-emerald-700">
                Powered by OpenClaw
              </span>
            </div>
          </div>
        </section>

        {/* Tier Sections */}
        {tierEntries.map(([key, tier]) => {
          const meta = tierMeta[key];
          const priceDisplay =
            key === "tier4" ? "$850-$1,000 each" : `$${tier.automations[0]?.price ?? 0}/each`;

          return (
            <section
              key={key}
              className="border-b border-[rgba(55,50,47,0.12)] px-4 py-12 sm:px-6 sm:py-16 lg:px-0"
            >
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
                    <span className="text-[rgba(55,50,47,0.3)]">|</span>
                    <span>{priceDisplay}</span>
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
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <h3 className="font-sans text-sm leading-tight font-semibold text-[#37322F]">
                        {automation.name}
                      </h3>
                      <span className="font-sans text-xs font-semibold whitespace-nowrap text-[#37322F] tabular-nums">
                        {automation.price === 0 ? "Free" : `$${automation.price}`}
                      </span>
                    </div>
                    <p className="font-sans text-xs leading-5 text-[#605A57]">
                      {automation.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* CTAs */}
        <section className="flex flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-0">
          <h2 className="font-serif text-2xl font-normal text-[#37322F] sm:text-3xl">
            Build Your Custom Package
          </h2>
          <p className="mt-4 max-w-[450px] font-sans text-sm text-[#605A57] sm:text-base">
            Mix and match automations from any tier, or choose a pre-built package. See your ROI
            instantly.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/calculator">Calculate Your ROI</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/book">Book a Call</Link>
            </Button>
          </div>
          <p className="mt-4 font-sans text-xs text-[#605A57]">
            Free strategy call — no commitment, no pressure.
          </p>
        </section>
      </div>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: canonicalUrl("/") },
          { name: "Solutions", url: canonicalUrl("/solutions") },
        ])}
      />
      <JsonLd
        data={{
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
        }}
      />
    </div>
  );
}
