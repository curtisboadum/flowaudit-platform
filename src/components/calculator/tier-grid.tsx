"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TierData } from "@/lib/calculator-data";
import type { Currency, ExchangeRates } from "@/lib/currency";
import { convertCurrency, formatCurrency } from "@/lib/currency";

interface TierGridProps {
  tier: TierData;
  selectedAutomations: Set<string>;
  onToggleAutomation: (name: string) => void;
  onSelectAll: (tierKey: string, names: string[]) => void;
  onDeselectAll: (names: string[]) => void;
  tierKey: string;
  currency: Currency;
  rates: ExchangeRates;
}

function TierGrid({
  tier,
  selectedAutomations,
  onToggleAutomation,
  onSelectAll,
  onDeselectAll,
  tierKey,
  currency,
  rates,
}: TierGridProps) {
  const tierNames = tier.automations.map((a) => a.name);
  const allSelected = tierNames.every((n) => selectedAutomations.has(n));
  const someSelected = tierNames.some((n) => selectedAutomations.has(n));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-sans text-sm font-semibold text-[#37322F]">{tier.name}</h3>
        <button
          onClick={() => (allSelected ? onDeselectAll(tierNames) : onSelectAll(tierKey, tierNames))}
          className={cn(
            "rounded-full px-3 py-1 font-sans text-xs font-medium transition-colors",
            allSelected
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              : someSelected
                ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                : "bg-[#F0EDEB] text-[#605A57] hover:bg-[#e8e4e1]",
          )}
        >
          {allSelected ? "Deselect All" : "Select All"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {tier.automations.map((automation) => (
          <AutomationCard
            key={automation.name}
            name={automation.name}
            price={automation.price}
            description={automation.description}
            isSelected={selectedAutomations.has(automation.name)}
            onToggle={() => onToggleAutomation(automation.name)}
            borderColor={tier.colorClass}
            currency={currency}
            rates={rates}
          />
        ))}
      </div>
    </div>
  );
}

interface AutomationCardProps {
  name: string;
  price: number;
  description: string;
  isSelected: boolean;
  onToggle: () => void;
  borderColor: string;
  currency: Currency;
  rates: ExchangeRates;
}

function AutomationCard({
  name,
  price,
  description,
  isSelected,
  onToggle,
  borderColor,
  currency,
  rates,
}: AutomationCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <button
      onClick={onToggle}
      className={cn(
        "relative w-full rounded-lg border border-l-4 p-3 text-left transition-all",
        borderColor,
        isSelected
          ? "border-emerald-300 bg-emerald-50/50 shadow-sm"
          : "border-[rgba(55,50,47,0.08)] bg-white hover:border-[rgba(55,50,47,0.16)]",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="line-clamp-2 font-sans text-sm font-medium text-[#37322F]">{name}</div>
          <div className="mt-0.5 font-sans text-xs text-[#605A57]">
            {formatCurrency(convertCurrency(price, rates, currency), currency)}
          </div>
        </div>
        <div
          className="relative shrink-0"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Info className="h-3.5 w-3.5 text-[#605A57]/50 hover:text-[#605A57]" />
          {showTooltip && (
            <div className="pointer-events-none absolute right-0 bottom-full z-50 mb-2 w-52 rounded-lg bg-[#37322F] p-2 font-sans text-xs leading-relaxed text-white shadow-lg">
              {description}
              <div className="absolute top-full right-3 h-0 w-0 border-t-4 border-r-4 border-l-4 border-transparent border-t-[#37322F]" />
            </div>
          )}
        </div>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500">
          <svg
            className="h-2.5 w-2.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
}

export { TierGrid };
