import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

function BentoGrid() {
  return (
    <section className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-[616px] px-4 sm:px-6 py-10 sm:py-14 flex flex-col items-center gap-4 border-b border-[rgba(55,50,47,0.12)]">
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
        <h2 className="text-center text-[#49423D] text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight font-sans tracking-tight">
          If You&apos;re Repeating Work Every Week — This Is For You
        </h2>
        <p className="text-center text-[#605A57] text-sm sm:text-base leading-7 font-sans">
          Built for operators, trades, service teams, and founders who are tired of doing the same
          tasks every week.
        </p>
      </div>

      {/* 2x2 Grid */}
      <div className="w-full max-w-[1060px] grid grid-cols-1 md:grid-cols-2">
        {/* Cell 1: Common Signals */}
        <div className="border-b md:border-r border-[rgba(55,50,47,0.12)] p-6 sm:p-8 lg:p-12 flex flex-col gap-6">
          <div>
            <h3 className="text-[#37322F] text-lg sm:text-xl font-semibold font-sans">
              Common Signals
            </h3>
            <p className="text-[#605A57] text-sm leading-relaxed font-sans mt-2">
              If any of these sound familiar, you&apos;re leaving time and money on the table.
            </p>
          </div>
          <ul className="space-y-3">
            {[
              "Copying data between systems",
              "Manually updating clients",
              "Sending follow-ups yourself",
              "Checking portals daily",
              "Building the same reports weekly",
              "Tracking tasks in spreadsheets",
              "Wishing you had a reliable assistant",
            ].map((signal) => (
              <li key={signal} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#37322F] shrink-0 mt-0.5" />
                <span className="text-sm text-[#605A57] font-sans">{signal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cell 2: Industries */}
        <div className="border-b border-[rgba(55,50,47,0.12)] p-6 sm:p-8 lg:p-12 flex flex-col gap-6">
          <div>
            <h3 className="text-[#37322F] text-lg sm:text-xl font-semibold font-sans">
              Works Across Industries
            </h3>
            <p className="text-[#605A57] text-sm leading-relaxed font-sans mt-2">
              Any team running on repetitive workflows can benefit.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Trades", desc: "Plumbers, electricians, contractors" },
              { name: "Insurance", desc: "Brokers & financial services" },
              { name: "Agencies", desc: "Marketing & creative teams" },
              { name: "Consultants", desc: "Advisory & strategy firms" },
              { name: "Accounting", desc: "CPA firms & bookkeepers" },
              { name: "Legal", desc: "Law practices & paralegals" },
            ].map((industry) => (
              <div
                key={industry.name}
                className="bg-white rounded-lg border border-[rgba(55,50,47,0.08)] p-4"
              >
                <div className="text-sm text-[#37322F] font-semibold font-sans">
                  {industry.name}
                </div>
                <div className="text-xs text-[#605A57] font-sans mt-1">{industry.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cell 3: Pain Point */}
        <div className="md:border-r border-[rgba(55,50,47,0.12)] p-6 sm:p-8 lg:p-12 flex flex-col gap-6 border-b md:border-b-0">
          <div>
            <h3 className="text-[#37322F] text-lg sm:text-xl font-semibold font-sans">
              The Hidden Cost
            </h3>
            <p className="text-[#605A57] text-sm leading-relaxed font-sans mt-2">
              Every hour spent on admin is an hour not spent on growth.
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="space-y-3 w-full">
              {[
                { label: "Manual data entry", hours: "8 hrs/week", pct: 80 },
                { label: "Client follow-ups", hours: "5 hrs/week", pct: 50 },
                { label: "Report generation", hours: "4 hrs/week", pct: 40 },
                { label: "Status updates", hours: "3 hrs/week", pct: 30 },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="text-[#37322F] font-medium">{item.label}</span>
                    <span className="text-[#605A57]">{item.hours}</span>
                  </div>
                  <div className="w-full h-2 bg-[#F0EDEB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#37322F] rounded-full"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cell 4: Stat Card */}
        <div className="p-6 sm:p-8 lg:p-12 flex flex-col gap-6">
          <div>
            <h3 className="text-[#37322F] text-lg sm:text-xl font-semibold font-sans">
              The Impact
            </h3>
            <p className="text-[#605A57] text-sm leading-relaxed font-sans mt-2">
              Teams using FlowAudit see results in the first week.
            </p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="text-center">
              <div className="text-6xl sm:text-7xl text-[#37322F] font-semibold font-sans">
                20+
              </div>
              <div className="text-sm text-[#605A57] font-sans mt-2">
                hours saved per week, on average
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
              <div className="text-center">
                <div className="text-2xl text-[#37322F] font-semibold font-sans">10 days</div>
                <div className="text-xs text-[#605A57] font-sans mt-1">to go live</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-[#37322F] font-semibold font-sans">5x</div>
                <div className="text-xs text-[#605A57] font-sans mt-1">typical ROI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { BentoGrid };
