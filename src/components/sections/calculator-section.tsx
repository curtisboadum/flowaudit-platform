"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/components/providers/locale-provider";

function CalculatorSection() {
  const { t } = useLocale();
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [hourlyValue, setHourlyValue] = useState(75);
  const [teamSize, setTeamSize] = useState(3);

  const weeklyValue = hoursPerWeek * hourlyValue * teamSize;
  const monthlyValue = weeklyValue * 4.33;
  const annualValue = weeklyValue * 52;
  const hiringAvoided = Math.round((hoursPerWeek * teamSize) / 40);
  const breakEvenWeeks = Math.max(1, Math.round(3500 / weeklyValue));

  return (
    <section
      id="calculator"
      className="flex w-full flex-col items-center border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0 lg:py-24"
    >
      <div className="w-full max-w-[1060px]">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center gap-4 sm:mb-16">
          <Badge
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect
                  x="2"
                  y="2"
                  width="10"
                  height="10"
                  rx="1"
                  stroke="#37322F"
                  strokeWidth="1"
                  fill="none"
                />
                <line x1="5" y1="5" x2="9" y2="5" stroke="#37322F" strokeWidth="1" />
                <line x1="5" y1="7" x2="9" y2="7" stroke="#37322F" strokeWidth="1" />
                <line x1="5" y1="9" x2="9" y2="9" stroke="#37322F" strokeWidth="1" />
              </svg>
            }
            text={t.calc.badge}
          />
          <h2 className="text-center font-sans text-2xl leading-tight font-semibold tracking-tight text-[#49423D] sm:text-3xl lg:text-5xl">
            {t.calc.headline}
          </h2>
          <p className="max-w-[500px] text-center font-sans text-sm leading-7 text-[#605A57] sm:text-base">
            {t.calc.subtext}
          </p>
          <p className="mt-2 text-center font-sans text-xs text-[rgba(55,50,47,0.40)]">
            {t.calc.note}
          </p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Inputs */}
          <div className="space-y-8 rounded-xl border border-[rgba(55,50,47,0.08)] bg-white p-6 sm:p-8">
            <SliderInput
              label={t.calc.slider1}
              value={hoursPerWeek}
              onChange={setHoursPerWeek}
              min={1}
              max={40}
              unit={t.calc.hrs}
            />
            <SliderInput
              label={t.calc.slider2}
              value={hourlyValue}
              onChange={setHourlyValue}
              min={25}
              max={300}
              step={5}
              unit="$"
              prefix
            />
            <SliderInput
              label={t.calc.slider3}
              value={teamSize}
              onChange={setTeamSize}
              min={1}
              max={30}
              unit={t.calc.people}
            />
          </div>

          {/* Results */}
          <div className="space-y-4">
            <ResultCard
              label={t.calc.result1}
              value={`$${Math.round(monthlyValue).toLocaleString()}`}
              highlight
            />
            <ResultCard
              label={t.calc.result2}
              value={`$${Math.round(annualValue).toLocaleString()}`}
            />
            <div className="grid grid-cols-2 gap-4">
              <ResultCard
                label={t.calc.result3}
                value={hiringAvoided > 0 ? `${hiringAvoided}` : "< 1"}
              />
              <ResultCard
                label={t.calc.result4}
                value={`${breakEvenWeeks} ${breakEvenWeeks !== 1 ? t.calc.weeks : t.calc.week}`}
              />
            </div>

            <a
              href="/calculator"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              {t.calc.cta}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <p className="mt-4 text-center font-sans text-[10px] text-[#605A57]/60">
              {t.calc.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit: string;
  prefix?: boolean;
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  prefix = false,
}: SliderInputProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="font-sans text-sm font-medium text-[#37322F]">{label}</label>
        <span className="font-sans text-sm font-semibold text-[#37322F] tabular-nums">
          {prefix ? `${unit}${value}` : `${value} ${unit}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#F0EDEB] [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-[#37322F] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#37322F] [&::-webkit-slider-thumb]:shadow-md"
      />
      <div className="flex justify-between font-sans text-xs text-[#605A57]">
        <span>{prefix ? `${unit}${min}` : min}</span>
        <span>{prefix ? `${unit}${max}` : max}</span>
      </div>
    </div>
  );
}

interface ResultCardProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function ResultCard({ label, value, highlight = false }: ResultCardProps) {
  return (
    <div
      className={`rounded-xl border p-7 sm:p-8 ${highlight ? "border-[#37322F] bg-[#37322F]" : "border-[rgba(55,50,47,0.08)] bg-white"}`}
    >
      <div
        className={`mb-3 font-sans text-xs ${highlight ? "text-[rgba(255,255,255,0.6)]" : "text-[#605A57]"}`}
      >
        {label}
      </div>
      <div
        className={`font-sans text-3xl font-semibold tabular-nums sm:text-4xl ${highlight ? "text-white" : "text-[#37322F]"}`}
      >
        {value}
      </div>
    </div>
  );
}

export { CalculatorSection };
