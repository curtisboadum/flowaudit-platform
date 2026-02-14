"use client";

import { cn } from "@/lib/utils";
import type { Currency, ExchangeRates } from "@/lib/currency";
import { convertCurrency, formatCurrency } from "@/lib/currency";
import { EFFICIENCY } from "@/lib/calculator-data";

interface ROICalculatorProps {
  hours: number;
  rate: number;
  setupCost: number;
  currency: Currency;
  rates: ExchangeRates;
  onHoursChange: (hours: number) => void;
  onRateChange: (rate: number) => void;
}

function ROICalculator({
  hours,
  rate,
  setupCost,
  currency,
  rates,
  onHoursChange,
  onRateChange,
}: ROICalculatorProps) {
  // Calculations (all in USD first)
  const weeklyCost = hours * rate;
  const annualCost = weeklyCost * 52;
  const automatedHours = hours * EFFICIENCY;
  const remainingHours = hours - automatedHours;
  const annualAfter = remainingHours * rate * 52;
  const annualSavings = annualCost - annualAfter;
  const weeklySavings = annualSavings / 52;
  const breakEvenWeeks = weeklySavings > 0 ? Math.ceil(setupCost / weeklySavings) : Infinity;
  const yearOneROI = annualSavings - setupCost;
  const roiPercent = setupCost > 0 ? Math.round((yearOneROI / setupCost) * 100) : 0;

  const fmt = (usd: number) => formatCurrency(convertCurrency(usd, rates, currency), currency);
  const isPositive = yearOneROI >= 0;

  return (
    <div className="rounded-2xl border border-[rgba(55,50,47,0.08)] bg-white p-6 sm:p-8">
      <h2 className="mb-6 font-sans text-xl font-semibold text-[#37322F]">ROI Calculator</h2>

      {/* Sliders */}
      <div className="mb-8 space-y-6">
        <SliderField
          label="Manual Hours per Week"
          value={hours}
          onChange={onHoursChange}
          min={5}
          max={80}
          suffix="hrs/week"
        />
        <SliderField
          label="Hourly Rate"
          value={rate}
          onChange={onRateChange}
          min={15}
          max={100}
          prefix="$"
          suffix="/hr"
        />
        <div className="flex items-center justify-between rounded-lg bg-[#F7F5F3] px-4 py-3">
          <span className="font-sans text-sm text-[#605A57]">Automation Efficiency</span>
          <span className="font-sans text-sm font-semibold text-[#37322F]">
            {Math.round(EFFICIENCY * 100)}%
          </span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-2 gap-3">
        <ResultCell label="Weekly Cost" value={fmt(weeklyCost)} />
        <ResultCell label="Annual Cost" value={fmt(annualCost)} />
        <ResultCell label="Automated Hours" value={`${automatedHours.toFixed(1)} hrs`} />
        <ResultCell label="Remaining Hours" value={`${remainingHours.toFixed(1)} hrs`} />
        <ResultCell label="Annual After" value={fmt(annualAfter)} />
        <ResultCell label="Annual Savings" value={fmt(annualSavings)} highlight="green" />
        <ResultCell label="Build & Deployment Fee" value={fmt(setupCost)} />
        <ResultCell
          label="Break-Even"
          value={breakEvenWeeks === Infinity ? "N/A" : `${breakEvenWeeks} weeks`}
        />
        <ResultCell
          label="Year 1 Net ROI"
          value={fmt(yearOneROI)}
          highlight={isPositive ? "green" : "red"}
          large
        />
        <ResultCell
          label="ROI %"
          value={`${roiPercent}%`}
          highlight={isPositive ? "green" : "red"}
          large
        />
      </div>
      <p className="mt-4 text-center font-sans text-[10px] text-[#605A57]/60">
        *Based on conservative assumptions.
      </p>
    </div>
  );
}

interface SliderFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  prefix?: string;
  suffix?: string;
}

function SliderField({ label, value, onChange, min, max, prefix, suffix }: SliderFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="font-sans text-sm font-medium text-[#37322F]">{label}</label>
        <span className="font-sans text-sm font-semibold text-[#37322F] tabular-nums">
          {prefix ?? ""}
          {value}
          {suffix ? ` ${suffix}` : ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#F0EDEB] [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:shadow-md"
      />
      <div className="flex justify-between font-sans text-xs text-[#605A57]">
        <span>
          {prefix ?? ""}
          {min}
        </span>
        <span>
          {prefix ?? ""}
          {max}
        </span>
      </div>
    </div>
  );
}

interface ResultCellProps {
  label: string;
  value: string;
  highlight?: "green" | "red";
  large?: boolean;
}

function ResultCell({ label, value, highlight, large }: ResultCellProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        large ? "col-span-1" : "",
        highlight === "green"
          ? "border-emerald-200 bg-emerald-50"
          : highlight === "red"
            ? "border-red-200 bg-red-50"
            : "border-[rgba(55,50,47,0.08)] bg-white",
      )}
    >
      <div className="mb-1 font-sans text-xs text-[#605A57]">{label}</div>
      <div
        className={cn(
          "font-sans font-semibold tabular-nums",
          large ? "text-xl sm:text-2xl" : "text-base",
          highlight === "green"
            ? "text-emerald-700"
            : highlight === "red"
              ? "text-red-600"
              : "text-[#37322F]",
        )}
      >
        {value}
      </div>
    </div>
  );
}

export { ROICalculator };
