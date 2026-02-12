import { Badge } from "@/components/ui/badge";
import { Phone, Search, Bot, TestTube, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "30-Minute Workflow Call",
    description: "We map your current workflows and identify the biggest time sinks.",
    icon: Phone,
  },
  {
    number: "02",
    title: "Identify Repetitive Tasks",
    description: "We pinpoint exactly which tasks can be automated for maximum impact.",
    icon: Search,
  },
  {
    number: "03",
    title: "Build Your AI Assistant",
    description: "We configure and train your custom AI operations assistant.",
    icon: Bot,
  },
  {
    number: "04",
    title: "Test With Real Data",
    description: "We validate the assistant works correctly with your actual workflows.",
    icon: TestTube,
  },
  {
    number: "05",
    title: "Go Live",
    description: "Your assistant starts handling tasks. You start saving time immediately.",
    icon: Rocket,
  },
] as const;

function ProcessSection() {
  return (
    <section
      id="how-it-works"
      className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col items-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-0"
    >
      <div className="w-full max-w-[1060px]">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-12 sm:mb-16">
          <Badge
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7h10M9 4l3 3-3 3"
                  stroke="#37322F"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            text="How It Works"
          />
          <h2 className="text-center text-[#49423D] text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight font-sans tracking-tight">
            From Manual to Automated in 10 Days
          </h2>
          <p className="text-center text-[#605A57] text-sm sm:text-base leading-7 font-sans max-w-[500px]">
            We do the heavy lifting — you just show up for a 30-minute call.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {/* Connector line (desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+24px)] w-[calc(100%-48px)] h-[1px] bg-[rgba(55,50,47,0.12)]" />
                )}
                <div className="w-16 h-16 rounded-2xl bg-white border border-[rgba(55,50,47,0.08)] flex items-center justify-center mb-4 shadow-sm relative z-10">
                  <Icon className="w-6 h-6 text-[#37322F]" />
                </div>
                <div className="text-xs text-[#605A57] font-sans font-medium mb-1">
                  {step.number}
                </div>
                <h3 className="text-sm text-[#37322F] font-semibold font-sans mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#605A57] font-sans leading-5">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { ProcessSection };
