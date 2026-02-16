"use client";

import { cn } from "@/lib/utils";
import { ADDONS } from "@/lib/calculator-data";
import type { Currency, ExchangeRates } from "@/lib/currency";
import { convertCurrency, formatCurrency } from "@/lib/currency";

interface AddonSelectorProps {
  selectedAddOns: Set<string>;
  onToggleAddOn: (name: string) => void;
  onSelectAllAddOns: () => void;
  onDeselectAllAddOns: () => void;
  currency: Currency;
  rates: ExchangeRates;
}

function AddonSelector({
  selectedAddOns,
  onToggleAddOn,
  onSelectAllAddOns,
  onDeselectAllAddOns,
  currency,
  rates,
}: AddonSelectorProps) {
  const allSelected = ADDONS.every((a) => selectedAddOns.has(a.name));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-sans text-sm font-semibold text-[#37322F]">Add-On Services</h3>
        <button
          onClick={allSelected ? onDeselectAllAddOns : onSelectAllAddOns}
          className={cn(
            "rounded-full px-3 py-1 font-sans text-xs font-medium transition-colors",
            allSelected
              ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
              : "bg-[#F0EDEB] text-[#605A57] hover:bg-[#e8e4e1]",
          )}
        >
          {allSelected ? "Deselect All" : "Select All"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {ADDONS.map((addon) => {
          const isSelected = selectedAddOns.has(addon.name);
          return (
            <button
              key={addon.name}
              onClick={() => onToggleAddOn(addon.name)}
              className={cn(
                "relative flex h-full flex-col rounded-xl border p-5 text-left transition-all",
                isSelected
                  ? "border-amber-300 bg-amber-50/50 shadow-sm"
                  : "border-[rgba(55,50,47,0.08)] bg-white hover:border-[rgba(55,50,47,0.16)]",
              )}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500">
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
              <div
                className={cn(
                  "font-sans text-sm font-medium",
                  isSelected ? "text-amber-800" : "text-[#37322F]",
                )}
              >
                {addon.name}
              </div>
              <div
                className={cn(
                  "mt-1 font-sans text-base font-semibold",
                  isSelected ? "text-amber-700" : "text-[#37322F]",
                )}
              >
                {addon.price > 0
                  ? formatCurrency(convertCurrency(addon.price, rates, currency), currency)
                  : "Get a Quote"}
              </div>
              <div className="mt-1 line-clamp-3 flex-grow font-sans text-xs leading-relaxed text-[#605A57]">
                {addon.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { AddonSelector };
