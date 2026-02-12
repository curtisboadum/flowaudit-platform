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
    <div className="bg-white rounded-2xl border border-[rgba(55,50,47,0.08)] p-6 sm:p-8">
      <h2 className="text-[#37322F] text-xl font-semibold font-sans mb-6">ROI Calculator</h2>

      {/* Sliders */}
      <div className="space-y-6 mb-8">
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
        <div className="flex justify-between items-center py-3 px-4 bg-[#F7F5F3] rounded-lg">
          <span className="text-sm text-[#605A57] font-sans">Automation Efficiency</span>
          <span className="text-sm text-[#37322F] font-semibold font-sans">
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
        <ResultCell label="Setup Investment" value={fmt(setupCost)} />
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
      <div className="flex justify-between items-center">
        <label className="text-sm text-[#37322F] font-medium font-sans">{label}</label>
        <span className="text-sm text-[#37322F] font-semibold font-sans tabular-nums">
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
        className="w-full h-2 bg-[#F0EDEB] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-emerald-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none"
      />
      <div className="flex justify-between text-xs text-[#605A57] font-sans">
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
          ? "bg-emerald-50 border-emerald-200"
          : highlight === "red"
            ? "bg-red-50 border-red-200"
            : "bg-white border-[rgba(55,50,47,0.08)]",
      )}
    >
      <div className="text-xs text-[#605A57] font-sans mb-1">{label}</div>
      <div
        className={cn(
          "font-semibold font-sans tabular-nums",
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
