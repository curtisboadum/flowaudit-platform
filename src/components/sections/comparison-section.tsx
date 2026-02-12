import { Badge } from "@/components/ui/badge";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const comparisons = [
  { category: "Admin workload", manual: "Grows with revenue", automated: "Stays flat" },
  { category: "Hiring needs", manual: "Constant new hires", automated: "Minimal additions" },
  { category: "Error rate", manual: "Increases with volume", automated: "Near-zero" },
  { category: "Follow-up speed", manual: "Hours to days", automated: "Minutes" },
  { category: "Team stress", manual: "Compounds over time", automated: "Significantly reduced" },
  { category: "Revenue leakage", manual: "Growing blind spots", automated: "Fully tracked" },
  { category: "Scalability", manual: "Linear cost growth", automated: "Marginal cost only" },
] as const;

function ComparisonSection() {
  return (
    <section className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col items-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-0">
      <div className="w-full max-w-[800px]">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-12 sm:mb-16">
          <Badge
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7h8M7 3v8"
                  stroke="#37322F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            }
            text="Compare"
          />
          <h2 className="text-center text-[#49423D] text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight font-sans tracking-tight">
            What Happens If You Do Nothing
          </h2>
          <p className="text-center text-[#605A57] text-sm sm:text-base leading-7 font-sans max-w-[500px]">
            Manual work scales with you. Here&apos;s the 3-year comparison.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl border border-[rgba(55,50,47,0.08)] overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-3 border-b border-[rgba(55,50,47,0.12)] bg-[#F7F5F3]">
            <div className="p-4 sm:p-5" />
            <div className="p-4 sm:p-5 text-center border-l border-[rgba(55,50,47,0.12)]">
              <div className="text-xs text-[#605A57] font-sans font-medium uppercase tracking-wider">
                Manual Path
              </div>
            </div>
            <div className="p-4 sm:p-5 text-center border-l border-[rgba(55,50,47,0.12)]">
              <div className="text-xs text-[#37322F] font-sans font-semibold uppercase tracking-wider">
                With FlowAudit
              </div>
            </div>
          </div>

          {/* Table Rows */}
          {comparisons.map((row, index) => (
            <div
              key={row.category}
              className={cn(
                "grid grid-cols-3",
                index < comparisons.length - 1 && "border-b border-[rgba(55,50,47,0.06)]",
              )}
            >
              <div className="p-4 sm:p-5">
                <span className="text-sm text-[#37322F] font-medium font-sans">
                  {row.category}
                </span>
              </div>
              <div className="p-4 sm:p-5 flex items-center justify-center gap-2 border-l border-[rgba(55,50,47,0.06)]">
                <X className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span className="text-xs sm:text-sm text-[#605A57] font-sans">{row.manual}</span>
              </div>
              <div className="p-4 sm:p-5 flex items-center justify-center gap-2 border-l border-[rgba(55,50,47,0.06)] bg-[rgba(16,185,129,0.03)]">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="text-xs sm:text-sm text-[#37322F] font-medium font-sans">
                  {row.automated}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { ComparisonSection };
