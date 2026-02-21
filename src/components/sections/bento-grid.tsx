import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

function BentoGrid() {
  return (
    <section className="flex w-full flex-col items-center border-b border-[rgba(55,50,47,0.12)]">
      {/* Header */}
      <div className="flex w-full max-w-[616px] flex-col items-center gap-4 border-b border-[rgba(55,50,47,0.12)] px-4 py-10 sm:px-6 sm:py-14">
        <Badge
          icon={
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="1" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
              <rect x="7" y="1" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
              <rect x="1" y="7" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
              <rect x="7" y="7" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
            </svg>
          }
          text="Who This Is For"
        />
        <h2 className="text-center font-sans text-2xl leading-tight font-semibold tracking-tight text-[#49423D] sm:text-3xl lg:text-5xl">
          If You&apos;re Repeating Work Every Week — This Is For You
        </h2>
        <p className="text-center font-sans text-sm leading-7 text-[#605A57] sm:text-base">
          Built for tradespeople, contractors, and small business owners who are tired of doing the
          same admin every week.
        </p>
      </div>

      {/* 2x2 Grid */}
      <div className="grid w-full max-w-[1060px] grid-cols-1 md:grid-cols-2">
        {/* Cell 1: Common Signals */}
        <div className="flex flex-col gap-6 border-b border-[rgba(55,50,47,0.12)] p-6 sm:p-8 md:border-r lg:p-12">
          <div>
            <h3 className="font-sans text-lg font-semibold text-[#37322F] sm:text-xl">
              Common Signals
            </h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-[#605A57]">
              If any of these sound familiar, you&apos;re leaving time and money on the table.
            </p>
          </div>
          <ul className="space-y-3">
            {[
              "Typing the same quote details into 3 different apps",
              "Forgetting to follow up on a \u00A35,000 quote",
              "Spending Sunday evening doing invoices",
              "Losing track of which jobs are paid",
              "Missing calls because you're on a job",
              "Chasing the same client for payment 3 times",
              "Wishing you had an office manager you could actually afford",
            ].map((signal) => (
              <li key={signal} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#37322F]" />
                <span className="font-sans text-sm text-[#605A57]">{signal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cell 2: Industries */}
        <div className="flex flex-col gap-6 border-b border-[rgba(55,50,47,0.12)] p-6 sm:p-8 lg:p-12">
          <div>
            <h3 className="font-sans text-lg font-semibold text-[#37322F] sm:text-xl">
              Works Across Industries
            </h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-[#605A57]">
              Any team running on repetitive workflows can benefit.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Trades & Contractors", desc: "Plumbers, electricians, HVAC, builders" },
              { name: "Solopreneurs", desc: "Solo operators & small crews" },
              { name: "Insurance", desc: "Brokers & financial services" },
              { name: "Agencies", desc: "Marketing & creative teams" },
              { name: "Consultants", desc: "Advisory & strategy firms" },
              { name: "Accounting", desc: "CPA firms & bookkeepers" },
            ].map((industry) => (
              <div
                key={industry.name}
                className="rounded-lg border border-[rgba(55,50,47,0.08)] bg-white p-4"
              >
                <div className="font-sans text-sm font-semibold text-[#37322F]">
                  {industry.name}
                </div>
                <div className="mt-1 font-sans text-xs text-[#605A57]">{industry.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cell 3: Pain Point */}
        <div className="flex flex-col gap-6 border-b border-[rgba(55,50,47,0.12)] p-6 sm:p-8 md:border-r md:border-b-0 lg:p-12">
          <div>
            <h3 className="font-sans text-lg font-semibold text-[#37322F] sm:text-xl">
              The Hidden Cost
            </h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-[#605A57]">
              Every hour spent on admin is an hour not spent on growth.
            </p>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full space-y-3">
              {[
                { label: "Quoting & estimating", hours: "6 hrs/week", pct: 60 },
                { label: "Invoicing & chasing payments", hours: "5 hrs/week", pct: 50 },
                { label: "Scheduling & coordination", hours: "4 hrs/week", pct: 40 },
                { label: "Client follow-ups", hours: "3 hrs/week", pct: 30 },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between font-sans text-xs">
                    <span className="font-medium text-[#37322F]">{item.label}</span>
                    <span className="text-[#605A57]">{item.hours}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#F0EDEB]">
                    <div
                      className="h-full rounded-full bg-[#37322F]"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cell 4: Stat Card */}
        <div className="flex flex-col gap-6 p-6 sm:p-8 lg:p-12">
          <div>
            <h3 className="font-sans text-lg font-semibold text-[#37322F] sm:text-xl">
              The Impact
            </h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-[#605A57]">
              Teams using FlowAudit see results in the first week.
            </p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <div className="text-center">
              <div className="font-sans text-6xl font-semibold text-[#37322F] sm:text-7xl">20+</div>
              <div className="mt-2 font-sans text-sm text-[#605A57]">
                hours saved per week, on average
              </div>
            </div>
            <div className="mt-4 grid w-full grid-cols-2 gap-4">
              <div className="text-center">
                <div className="font-sans text-2xl font-semibold text-[#37322F]">10 days</div>
                <div className="mt-1 font-sans text-xs text-[#605A57]">to go live</div>
              </div>
              <div className="text-center">
                <div className="font-sans text-2xl font-semibold text-[#37322F]">5x</div>
                <div className="mt-1 font-sans text-xs text-[#605A57]">typical ROI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { BentoGrid };
