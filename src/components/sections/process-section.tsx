"use client";

import { Badge } from "@/components/ui/badge";
import { Phone, Search, Bot, TestTube, Rocket } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";

function ProcessSection() {
  const { t } = useLocale();

  const steps = [
    { number: "01", title: t.process.step1, description: t.process.step1Desc, icon: Phone },
    { number: "02", title: t.process.step2, description: t.process.step2Desc, icon: Search },
    { number: "03", title: t.process.step3, description: t.process.step3Desc, icon: Bot },
    { number: "04", title: t.process.step4, description: t.process.step4Desc, icon: TestTube },
    { number: "05", title: t.process.step5, description: t.process.step5Desc, icon: Rocket },
  ];

  return (
    <section
      id="how-it-works"
      className="flex w-full flex-col items-center border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0 lg:py-24"
    >
      <div className="w-full max-w-[1060px]">
        <div className="mb-12 flex flex-col items-center gap-4 sm:mb-16">
          <Badge
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M9 4l3 3-3 3" stroke="#37322F" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            text={t.process.badge}
          />
          <h2 className="text-center font-sans text-2xl leading-tight font-semibold tracking-tight text-[#49423D] sm:text-3xl lg:text-5xl">
            {t.process.headline}
          </h2>
          <p className="max-w-[500px] text-center font-sans text-sm leading-7 text-[#605A57] sm:text-base">
            {t.process.subtext}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-[calc(50%+24px)] hidden h-[1px] w-[calc(100%-48px)] bg-[rgba(55,50,47,0.12)] lg:block" />
                )}
                <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[rgba(55,50,47,0.08)] bg-white shadow-sm">
                  <Icon className="h-6 w-6 text-[#37322F]" />
                </div>
                <div className="mb-1 font-sans text-xs font-medium text-[#605A57]">{step.number}</div>
                <h3 className="mb-2 font-sans text-sm font-semibold text-[#37322F]">{step.title}</h3>
                <p className="max-w-[180px] font-sans text-xs leading-relaxed text-[#605A57]">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { ProcessSection };
