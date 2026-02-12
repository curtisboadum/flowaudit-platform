import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TIERS } from "@/lib/calculator-data";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Solutions — FlowAudit Automation Library",
  description:
    "53 automations across 4 tiers. Lead capture, onboarding, invoicing, compliance, AI qualification, and more — all powered by OpenClaw.",
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
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full max-w-[1060px]">
        {/* Hero */}
        <section className="pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-0 flex flex-col items-center text-center border-b border-[rgba(55,50,47,0.12)]">
          <Badge text="Automation Library" />
          <h1 className="text-[#37322F] text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] font-serif max-w-[700px] mt-4">
            53 Automations. 4 Tiers. One Platform.
          </h1>
          <p className="text-[rgba(55,50,47,0.80)] text-base sm:text-lg font-sans leading-7 mt-6 max-w-[550px]">
            Every automation is validated against OpenClaw&apos;s 700+ skill library and delivered as a
            production-ready workflow for your business.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700 font-sans">Powered by OpenClaw</span>
            </div>
          </div>
        </section>

        {/* Tier Sections */}
        {tierEntries.map(([key, tier]) => {
          const meta = tierMeta[key];
          const priceDisplay =
            key === "tier4"
              ? "$850-$1,000 each"
              : `$${tier.automations[0]?.price ?? 0}/each`;

          return (
            <section
              key={key}
              className="py-12 sm:py-16 px-4 sm:px-6 lg:px-0 border-b border-[rgba(55,50,47,0.12)]"
            >
              {/* Tier Header */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: tier.color }}
                    />
                    <h2 className="text-[#37322F] text-xl sm:text-2xl font-semibold font-sans">
                      {tier.name}
                    </h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#605A57] font-sans">
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
                  <div className="text-xs text-[#605A57] font-sans">
                    Systems: {meta.systems}
                  </div>
                )}
              </div>

              {/* Automations Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tier.automations.map((automation) => (
                  <div
                    key={automation.name}
                    className={`bg-white rounded-xl border border-[rgba(55,50,47,0.08)] p-5 border-l-4 ${tier.colorClass}`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-[#37322F] text-sm font-semibold font-sans leading-tight">
                        {automation.name}
                      </h3>
                      <span className="text-xs font-semibold font-sans text-[#37322F] whitespace-nowrap tabular-nums">
                        {automation.price === 0 ? "Free" : `$${automation.price}`}
                      </span>
                    </div>
                    <p className="text-[#605A57] text-xs font-sans leading-5">
                      {automation.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* CTAs */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-0 flex flex-col items-center text-center">
          <h2 className="text-[#37322F] text-2xl sm:text-3xl font-normal font-serif">
            Build Your Custom Package
          </h2>
          <p className="text-[#605A57] text-sm sm:text-base font-sans mt-4 max-w-[450px]">
            Mix and match automations from any tier, or choose a pre-built package. See your ROI
            instantly.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            <Button size="lg" asChild>
              <Link href="/calculator">Calculate Your ROI</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/book">Book a Call</Link>
            </Button>
          </div>
          <p className="text-[#605A57] text-xs font-sans mt-4">
            Free strategy call — no commitment, no pressure.
          </p>
        </section>
      </div>
    </div>
  );
}
