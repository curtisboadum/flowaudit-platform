import type { Metadata } from "next";
import { CalendarCheck, Search, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Call — FlowAudit",
  description:
    "Book a free 30-minute strategy call. See exactly how AI can cut your operational workload.",
};

const CALENDLY_URL = "https://calendly.com/flowaudit/30min";

const expectations = [
  {
    icon: Search,
    title: "Workflow Audit",
    description: "We'll map your current processes and identify the biggest time sinks.",
  },
  {
    icon: CalendarCheck,
    title: "Identify Quick Wins",
    description: "We'll pinpoint 2-3 workflows that can be automated immediately.",
  },
  {
    icon: FileText,
    title: "Custom Proposal",
    description: "You'll get a tailored plan with expected time savings and ROI.",
  },
] as const;

export default function BookPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full max-w-[1060px]">
        {/* Hero */}
        <section className="pt-28 sm:pt-36 lg:pt-44 pb-12 px-4 sm:px-6 lg:px-0 flex flex-col items-center text-center">
          <h1 className="text-[#37322F] text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] font-serif max-w-[600px]">
            Book a Free Strategy Call
          </h1>
          <p className="text-[rgba(55,50,47,0.80)] text-base sm:text-lg font-sans leading-7 mt-6 max-w-[500px]">
            See exactly how AI can cut your operational workload. 30 minutes. No pressure.
          </p>
        </section>

        {/* Calendar Embed */}
        <section className="px-4 sm:px-6 lg:px-0 pb-16">
          <div className="w-full max-w-[800px] mx-auto">
            <div className="bg-white rounded-2xl border border-[rgba(55,50,47,0.08)] overflow-hidden">
              <iframe
                src={CALENDLY_URL}
                width="100%"
                height="700"
                frameBorder="0"
                title="Schedule a call with FlowAudit"
                className="w-full"
              />
            </div>
            {/* Fallback */}
            <p className="text-center text-[#605A57] text-sm font-sans mt-4">
              Can&apos;t see the calendar?{" "}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#37322F] font-medium underline"
              >
                Open scheduling page directly
              </a>
            </p>
          </div>
        </section>

        {/* What to Expect */}
        <section className="px-4 sm:px-6 lg:px-0 pb-16 sm:pb-20 border-b border-[rgba(55,50,47,0.12)]">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-center text-[#49423D] text-xl sm:text-2xl font-semibold font-sans mb-8">
              What to Expect
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {expectations.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-[#F0EDEB] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#37322F]" />
                    </div>
                    <div className="text-xs text-[#605A57] font-sans mb-1">
                      Step {index + 1}
                    </div>
                    <h3 className="text-[#37322F] text-sm font-semibold font-sans">{item.title}</h3>
                    <p className="text-[#605A57] text-xs font-sans leading-5 mt-2">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
