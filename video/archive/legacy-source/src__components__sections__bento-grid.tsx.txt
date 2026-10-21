"use client";

import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";

function BentoGrid() {
  const { t } = useLocale();
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
          text={t.bento.badge}
        />
        <h2 className="text-center font-sans text-2xl leading-tight font-semibold tracking-tight text-[#49423D] sm:text-3xl lg:text-5xl">
          {t.bento.headline}
        </h2>
        <p className="text-center font-sans text-sm leading-7 text-[#605A57] sm:text-base">
          {t.bento.subtext}
        </p>
      </div>

      {/* 2x2 Grid */}
      <div className="grid w-full max-w-[1060px] grid-cols-1 md:grid-cols-2">
        {/* Cell 1: Common Signals */}
        <div className="flex flex-col gap-6 border-b border-[rgba(55,50,47,0.12)] p-6 sm:p-8 md:border-r lg:p-12">
          <div>
            <h3 className="font-sans text-lg font-semibold text-[#37322F] sm:text-xl">
              {t.bento.signalsTitle}
            </h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-[#605A57]">
              {t.bento.signalsSubtext}
            </p>
          </div>
          <ul className="space-y-3">
            {t.bento.signals.map((signal) => (
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
              {t.bento.industriesTitle}
            </h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-[#605A57]">
              {t.bento.industriesSubtext}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {t.bento.industries.map((industry) => (
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
              {t.bento.hiddenCostTitle}
            </h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-[#605A57]">
              {t.bento.hiddenCostSubtext}
            </p>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full space-y-3">
              {t.bento.hiddenCostItems.map((item, idx) => {
                const pcts = [60, 50, 40, 30];
                return { ...item, pct: pcts[idx] ?? 30 };
              }).map((item) => (
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
              {t.bento.impactTitle}
            </h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-[#605A57]">
              {t.bento.impactSubtext}
            </p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <div className="text-center">
              <div className="font-sans text-6xl font-semibold text-[#37322F] sm:text-7xl">{t.bento.impactHours}</div>
              <div className="mt-2 font-sans text-sm text-[#605A57]">
                {t.bento.impactHoursLabel}
              </div>
            </div>
            <div className="mt-4 grid w-full grid-cols-2 gap-4">
              <div className="text-center">
                <div className="font-sans text-2xl font-semibold text-[#37322F]">{t.bento.impactDays}</div>
                <div className="mt-1 font-sans text-xs text-[#605A57]">{t.bento.impactDaysLabel}</div>
              </div>
              <div className="text-center">
                <div className="font-sans text-2xl font-semibold text-[#37322F]">{t.bento.impactRoi}</div>
                <div className="mt-1 font-sans text-xs text-[#605A57]">{t.bento.impactRoiLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { BentoGrid };
