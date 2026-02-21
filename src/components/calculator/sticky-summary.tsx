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
    <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-[rgba(55,50,47,0.12)] bg-white/95 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] backdrop-blur-xl">
      <div className="mx-auto max-w-[1060px] px-4 py-3 sm:px-6 lg:px-0">
        <div className="flex items-center justify-between gap-3 overflow-x-auto sm:gap-4">
          <SummaryItem label="Setup Fee" value={fmt(setupCost)} />
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
              <div className="flex min-w-fit flex-col items-center">
                <div className="animate-pulse font-sans text-xs font-semibold whitespace-nowrap text-emerald-600">
                  Strong ROI!
                </div>
              </div>
            </>
          )}
          {roiPercent > 0 && roiPercent <= 200 && (
            <>
              <Divider />
              <div className="flex min-w-fit flex-col items-center">
                <div className="font-sans text-xs font-semibold whitespace-nowrap text-emerald-600">
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
    <div className="flex min-w-fit flex-col items-center">
      <div className="font-sans text-[10px] whitespace-nowrap text-[#605A57] sm:text-xs">
        {label}
      </div>
      <div
        className={cn(
          "font-sans text-sm whitespace-nowrap tabular-nums sm:text-base",
          bold ? "font-bold" : "font-semibold",
          positive ? "text-emerald-600" : negative ? "text-red-500" : "text-[#37322F]",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function Divider({ className }: { className?: string }) {
  return <div className={cn("hidden h-8 w-px shrink-0 bg-[rgba(55,50,47,0.08)] sm:block", className)} />;
}

export { StickySummary };
