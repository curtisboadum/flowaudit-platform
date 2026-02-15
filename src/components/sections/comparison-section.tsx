import { Badge } from "@/components/ui/badge";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const comparisons = [
  { category: "Admin workload", manual: "Grows with revenue", automated: "Stays flat" },
  { category: "Quoting speed", manual: "Hours to prepare", automated: "Minutes" },
  {
    category: "Missed quotes",
    manual: "Deals fall through the cracks",
    automated: "Every quote gets chased",
  },
  {
    category: "Follow-up speed",
    manual: "Days (if you remember)",
    automated: "Same day, automatic",
  },
  {
    category: "Evening/weekend work",
    manual: "Doing invoices at 10pm",
    automated: "Done during work hours",
  },
  {
    category: "Money left on the table",
    manual: "Jobs billed late, quotes forgotten",
    automated: "Everything tracked and chased",
  },
  {
    category: "Taking on more work",
    manual: "Can't grow without more staff",
    automated: "Handle more with the same crew",
  },
] as const;

function ComparisonSection() {
  return (
    <section className="flex w-full flex-col items-center border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0 lg:py-24">
      <div className="w-full max-w-[800px]">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center gap-4 sm:mb-16">
          <Badge
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3v8" stroke="#37322F" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            }
            text="Compare"
          />
          <h2 className="text-center font-sans text-2xl leading-tight font-semibold tracking-tight text-[#49423D] sm:text-3xl lg:text-5xl">
            What Happens If You Do Nothing
          </h2>
          <p className="max-w-[500px] text-center font-sans text-sm leading-7 text-[#605A57] sm:text-base">
            Manual work scales with your business. Here&apos;s the 3-year comparison.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-hidden rounded-2xl border border-[rgba(55,50,47,0.08)] bg-white">
          {/* Table Header */}
          <div className="grid grid-cols-3 border-b border-[rgba(55,50,47,0.12)] bg-[#F7F5F3]">
            <div className="p-4 sm:p-5" />
            <div className="border-l border-[rgba(55,50,47,0.12)] p-4 text-center sm:p-5">
              <div className="font-sans text-xs font-medium tracking-wider text-[#605A57] uppercase">
                Manual Path
              </div>
            </div>
            <div className="border-l border-[rgba(55,50,47,0.12)] p-4 text-center sm:p-5">
              <div className="font-sans text-xs font-semibold tracking-wider text-[#37322F] uppercase">
                With FlowAudit_
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
                <span className="font-sans text-sm font-medium text-[#37322F]">{row.category}</span>
              </div>
              <div className="flex items-center justify-center gap-2 border-l border-[rgba(55,50,47,0.06)] p-4 sm:p-5">
                <X className="h-3.5 w-3.5 shrink-0 text-red-400" />
                <span className="font-sans text-xs text-[#605A57] sm:text-sm">{row.manual}</span>
              </div>
              <div className="flex items-center justify-center gap-2 border-l border-[rgba(55,50,47,0.06)] bg-[rgba(16,185,129,0.03)] p-4 sm:p-5">
                <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                <span className="font-sans text-xs font-medium text-[#37322F] sm:text-sm">
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
