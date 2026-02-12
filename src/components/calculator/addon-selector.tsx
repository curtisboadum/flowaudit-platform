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
        <h3 className="text-sm font-semibold font-sans text-[#37322F]">Add-On Services</h3>
        <button
          onClick={allSelected ? onDeselectAllAddOns : onSelectAllAddOns}
          className={cn(
            "text-xs font-medium font-sans px-3 py-1 rounded-full transition-colors",
            allSelected
              ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
              : "bg-[#F0EDEB] text-[#605A57] hover:bg-[#e8e4e1]",
          )}
        >
          {allSelected ? "Deselect All" : "Select All"}
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {ADDONS.map((addon) => {
          const isSelected = selectedAddOns.has(addon.name);
          return (
            <button
              key={addon.name}
              onClick={() => onToggleAddOn(addon.name)}
              className={cn(
                "text-left rounded-xl border p-4 transition-all",
                isSelected
                  ? "bg-amber-50/50 border-amber-300 shadow-sm"
                  : "bg-white border-[rgba(55,50,47,0.08)] hover:border-[rgba(55,50,47,0.16)]",
              )}
            >
              <div
                className={cn(
                  "text-sm font-medium font-sans",
                  isSelected ? "text-amber-800" : "text-[#37322F]",
                )}
              >
                {addon.name}
              </div>
              <div
                className={cn(
                  "text-base font-semibold font-sans mt-1",
                  isSelected ? "text-amber-700" : "text-[#37322F]",
                )}
              >
                {formatCurrency(convertCurrency(addon.price, rates, currency), currency)}
              </div>
              <div className="text-xs text-[#605A57] font-sans mt-1 leading-relaxed">
                {addon.description}
              </div>
              {isSelected && (
                <div className="mt-2 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-2.5 h-2.5 text-white"
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
        })}
      </div>
    </div>
  );
}

export { AddonSelector };
