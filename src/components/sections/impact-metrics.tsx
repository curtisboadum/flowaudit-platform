import { Badge } from "@/components/ui/badge";

const metrics = [
  {
    value: "20+",
    unit: "hrs/week",
    label: "Hours Saved",
    description: "Average time recovered per team",
  },
  {
    value: "40%",
    unit: "",
    label: "Cost Reduction",
    description: "Operational cost decrease",
  },
  {
    value: "10",
    unit: "days",
    label: "Deployment Time",
    description: "From first call to live assistant",
  },
  {
    value: "5x",
    unit: "",
    label: "ROI Multiple",
    description: "Typical return on investment",
  },
] as const;

function ImpactMetrics() {
  return (
    <section className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col items-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-0">
      <div className="w-full max-w-[1060px]">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-12 sm:mb-16">
          <Badge
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 2v10M4 5l3-3 3 3"
                  stroke="#37322F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            text="Results"
          />
          <h2 className="text-center text-[#49423D] text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight font-sans tracking-tight">
            More Time. More Margin. Less Chaos.
          </h2>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-white rounded-xl border border-[rgba(55,50,47,0.08)] p-6 sm:p-8 text-center"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl text-[#37322F] font-semibold font-sans">
                {metric.value}
              </div>
              {metric.unit && (
                <div className="text-sm text-[#605A57] font-sans mt-1">{metric.unit}</div>
              )}
              <div className="text-sm text-[#37322F] font-semibold font-sans mt-3">
                {metric.label}
              </div>
              <div className="text-xs text-[#605A57] font-sans mt-1">{metric.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { ImpactMetrics };
