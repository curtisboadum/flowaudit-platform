import { Badge } from "@/components/ui/badge";

const logos = [
  "Apex HVAC",
  "Sterling Legal",
  "Cascade Insurance",
  "Summit Electric",
  "Northpoint CPA",
  "Atlas Plumbing",
  "Meridian Agency",
  "Cornerstone Co.",
] as const;

function LogoGrid() {
  return (
    <section className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-[586px] px-4 sm:px-6 py-10 sm:py-14 flex flex-col items-center gap-4 border-b border-[rgba(55,50,47,0.12)]">
        <Badge
          icon={
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <rect x="1" y="3" width="4" height="6" stroke="#37322F" strokeWidth="1" fill="none" />
              <rect x="7" y="1" width="4" height="8" stroke="#37322F" strokeWidth="1" fill="none" />
            </svg>
          }
          text="Social Proof"
        />
        <h2 className="text-center text-[#49423D] text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight font-sans tracking-tight">
          Teams that trust FlowAudit
        </h2>
        <p className="text-center text-[#605A57] text-sm sm:text-base leading-7 font-sans">
          Operators across industries reclaim their time with our AI assistants.
        </p>
      </div>

      {/* Logo Grid */}
      <div className="w-full max-w-[1060px] grid grid-cols-2 sm:grid-cols-4">
        {logos.map((name) => (
          <div
            key={name}
            className="h-24 sm:h-32 lg:h-40 flex items-center justify-center gap-2 border-b border-r border-[rgba(227,226,225,0.5)] last:border-r-0 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(4n)]:border-r-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#F0EDEB] shadow-[0px_-4px_8px_rgba(255,255,255,0.64)_inset] flex items-center justify-center">
              <span className="text-[#37322F] text-xs font-bold font-sans">
                {name.charAt(0)}
              </span>
            </div>
            <span className="text-[#37322F] text-sm sm:text-base lg:text-lg font-medium font-sans">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export { LogoGrid };
