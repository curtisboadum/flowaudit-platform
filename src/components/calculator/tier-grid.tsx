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
        <h3 className="text-sm font-semibold font-sans text-[#37322F]">{tier.name}</h3>
        <button
          onClick={() =>
            allSelected ? onDeselectAll(tierNames) : onSelectAll(tierKey, tierNames)
          }
          className={cn(
            "text-xs font-medium font-sans px-3 py-1 rounded-full transition-colors",
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
        "relative text-left w-full rounded-lg border-l-4 border p-3 transition-all",
        borderColor,
        isSelected
          ? "bg-emerald-50/50 border-emerald-300 shadow-sm"
          : "bg-white border-[rgba(55,50,47,0.08)] hover:border-[rgba(55,50,47,0.16)]",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium font-sans text-[#37322F] truncate">{name}</div>
          <div className="text-xs text-[#605A57] font-sans mt-0.5">
            {formatCurrency(convertCurrency(price, rates, currency), currency)}
          </div>
        </div>
        <div
          className="relative shrink-0"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Info className="w-3.5 h-3.5 text-[#605A57]/50 hover:text-[#605A57]" />
          {showTooltip && (
            <div className="absolute z-50 bottom-full right-0 mb-2 w-52 p-2 bg-[#37322F] text-white text-xs font-sans leading-relaxed rounded-lg shadow-lg pointer-events-none">
              {description}
              <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#37322F]" />
            </div>
          )}
        </div>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
}

export { TierGrid };
