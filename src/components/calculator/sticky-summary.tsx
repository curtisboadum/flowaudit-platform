"use client";

import { cn } from "@/lib/utils";
import type { Currency, ExchangeRates } from "@/lib/currency";
import { convertCurrency, formatCurrency } from "@/lib/currency";
import { EFFICIENCY } from "@/lib/calculator-data";

interface StickySummaryProps {
  hours: number;
  rate: number;
  setupCost: number;
  currency: Currency;
  rates: ExchangeRates;
}

function StickySummary({ hours, rate, setupCost, currency, rates }: StickySummaryProps) {
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
  const isPositive = yearOneROI >= 0;

  const fmt = (usd: number) => formatCurrency(convertCurrency(usd, rates, currency), currency);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[rgba(55,50,47,0.12)] shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="max-w-[1060px] mx-auto px-4 sm:px-6 lg:px-0 py-3">
        <div className="flex items-center justify-between gap-4 overflow-x-auto">
          <SummaryItem label="Setup Investment" value={fmt(setupCost)} />
          <Divider />
          <SummaryItem label="Annual Savings" value={fmt(annualSavings)} positive />
          <Divider />
          <SummaryItem
            label="Break-Even"
            value={breakEvenWeeks === Infinity ? "N/A" : `${breakEvenWeeks}wk`}
          />
          <Divider />
          <SummaryItem
            label="Year 1 Net ROI"
            value={fmt(yearOneROI)}
            positive={isPositive}
            negative={!isPositive}
          />
          <Divider />
          <SummaryItem
            label="ROI %"
            value={`${roiPercent}%`}
            positive={isPositive}
            negative={!isPositive}
            bold
          />
          {roiPercent > 200 && (
            <>
              <Divider />
              <div className="flex flex-col items-center min-w-fit">
                <div className="text-xs font-semibold font-sans text-emerald-600 whitespace-nowrap animate-pulse">
                  Strong ROI!
                </div>
              </div>
            </>
          )}
          {roiPercent > 0 && roiPercent <= 200 && (
            <>
              <Divider />
              <div className="flex flex-col items-center min-w-fit">
                <div className="text-xs font-semibold font-sans text-emerald-600 whitespace-nowrap">
                  Looking good!
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

interface SummaryItemProps {
  label: string;
  value: string;
  positive?: boolean;
  negative?: boolean;
  bold?: boolean;
}

function SummaryItem({ label, value, positive, negative, bold }: SummaryItemProps) {
  return (
    <div className="flex flex-col items-center min-w-fit">
      <div className="text-[10px] sm:text-xs text-[#605A57] font-sans whitespace-nowrap">
        {label}
      </div>
      <div
        className={cn(
          "text-sm sm:text-base font-sans tabular-nums whitespace-nowrap",
          bold ? "font-bold" : "font-semibold",
          positive ? "text-emerald-600" : negative ? "text-red-500" : "text-[#37322F]",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-8 bg-[rgba(55,50,47,0.08)] shrink-0 hidden sm:block" />;
}

export { StickySummary };
