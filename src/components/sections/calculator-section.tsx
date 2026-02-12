"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";

function CalculatorSection() {
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
      className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col items-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-0"
    >
      <div className="w-full max-w-[1060px]">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-12 sm:mb-16">
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
            text="Calculator"
          />
          <h2 className="text-center text-[#49423D] text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight font-sans tracking-tight">
            What Is Your Time Actually Worth?
          </h2>
          <p className="text-center text-[#605A57] text-sm sm:text-base leading-7 font-sans max-w-[500px]">
            See exactly how much repetitive work is costing your business.
          </p>
          <p className="text-center text-[rgba(55,50,47,0.40)] text-xs font-sans mt-2">
            Takes 30 seconds. No email required.
          </p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Inputs */}
          <div className="bg-white rounded-xl border border-[rgba(55,50,47,0.08)] p-6 sm:p-8 space-y-8">
            <SliderInput
              label="Hours per week on repetitive tasks"
              value={hoursPerWeek}
              onChange={setHoursPerWeek}
              min={1}
              max={40}
              unit="hrs"
            />
            <SliderInput
              label="Average hourly value of your time"
              value={hourlyValue}
              onChange={setHourlyValue}
              min={25}
              max={300}
              step={5}
              unit="$"
              prefix
            />
            <SliderInput
              label="Team members affected"
              value={teamSize}
              onChange={setTeamSize}
              min={1}
              max={30}
              unit="people"
            />
          </div>

          {/* Results */}
          <div className="space-y-4">
            <ResultCard
              label="Monthly Time Value Recovered"
              value={`$${Math.round(monthlyValue).toLocaleString()}`}
              highlight
            />
            <ResultCard
              label="Annual Value Recovered"
              value={`$${Math.round(annualValue).toLocaleString()}`}
            />
            <div className="grid grid-cols-2 gap-4">
              <ResultCard
                label="Full-Time Hires Avoided"
                value={hiringAvoided > 0 ? `${hiringAvoided}` : "< 1"}
              />
              <ResultCard
                label="Break-Even Timeline"
                value={`${breakEvenWeeks} week${breakEvenWeeks !== 1 ? "s" : ""}`}
              />
            </div>

            {/* CTA to full calculator */}
            <a
              href="/calculator"
              className="flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold font-sans rounded-xl transition-colors mt-2"
            >
              Get Detailed ROI Analysis
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
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
      <div className="flex justify-between items-center">
        <label className="text-sm text-[#37322F] font-medium font-sans">{label}</label>
        <span className="text-sm text-[#37322F] font-semibold font-sans tabular-nums">
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
        className="w-full h-2 bg-[#F0EDEB] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-[#37322F] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-[#37322F] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none"
      />
      <div className="flex justify-between text-xs text-[#605A57] font-sans">
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
      className={`rounded-xl border p-6 ${highlight ? "bg-[#37322F] border-[#37322F]" : "bg-white border-[rgba(55,50,47,0.08)]"}`}
    >
      <div
        className={`text-xs font-sans mb-2 ${highlight ? "text-[rgba(255,255,255,0.6)]" : "text-[#605A57]"}`}
      >
        {label}
      </div>
      <div
        className={`text-3xl sm:text-4xl font-semibold font-sans tabular-nums ${highlight ? "text-white" : "text-[#37322F]"}`}
      >
        {value}
      </div>
    </div>
  );
}

export { CalculatorSection };
