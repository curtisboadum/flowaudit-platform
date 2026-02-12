"use client";

import { cn } from "@/lib/utils";
import { PACKAGES } from "@/lib/calculator-data";
import type { Package } from "@/lib/calculator-data";
import type { Currency, ExchangeRates } from "@/lib/currency";
import { convertCurrency, formatCurrency } from "@/lib/currency";
import { Check } from "lucide-react";

// Re-export for convenience
export type { Package };

interface PackageSelectorProps {
  selectedPackage: string | null;
  onSelectPackage: (name: string | null) => void;
  currency: Currency;
  rates: ExchangeRates;
}

function PackageSelector({
  selectedPackage,
  onSelectPackage,
  currency,
  rates,
}: PackageSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold font-sans text-[#37322F]">Package Bundles</h3>
        {selectedPackage && (
          <button
            onClick={() => onSelectPackage(null)}
            className="text-xs font-medium font-sans text-red-500 hover:text-red-600 transition-colors"
          >
            Clear Package
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {PACKAGES.map((pkg) => {
          const isSelected = selectedPackage === pkg.name;
          const displayPrice = formatCurrency(
            convertCurrency(pkg.price, rates, currency),
            currency,
          );

          return (
            <button
              key={pkg.name}
              onClick={() => onSelectPackage(isSelected ? null : pkg.name)}
              className={cn(
                "text-left rounded-xl border p-4 transition-all",
                isSelected
                  ? "bg-emerald-50/50 border-emerald-300 shadow-sm"
                  : pkg.featured
                    ? "bg-[#37322F] border-[#37322F] hover:shadow-md"
                    : "bg-white border-[rgba(55,50,47,0.08)] hover:border-[rgba(55,50,47,0.16)]",
              )}
            >
              <div
                className={cn(
                  "text-xs font-semibold font-sans mb-1",
                  isSelected
                    ? "text-emerald-700"
                    : pkg.featured
                      ? "text-[rgba(255,255,255,0.7)]"
                      : "text-[#605A57]",
                )}
              >
                {pkg.name}
              </div>
              <div
                className={cn(
                  "text-lg font-semibold font-sans",
                  isSelected
                    ? "text-emerald-700"
                    : pkg.featured
                      ? "text-white"
                      : "text-[#37322F]",
                )}
              >
                {displayPrice}
              </div>
              <div
                className={cn(
                  "text-xs font-sans mt-1",
                  isSelected
                    ? "text-emerald-600"
                    : pkg.featured
                      ? "text-[rgba(255,255,255,0.6)]"
                      : "text-[#605A57]",
                )}
              >
                {pkg.description}
              </div>

              {/* Feature list (collapsed) */}
              <ul className="mt-3 space-y-1">
                {pkg.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex items-start gap-1.5">
                    <Check
                      className={cn(
                        "w-3 h-3 shrink-0 mt-0.5",
                        isSelected
                          ? "text-emerald-500"
                          : pkg.featured
                            ? "text-emerald-400"
                            : "text-[#605A57]",
                      )}
                    />
                    <span
                      className={cn(
                        "text-[10px] font-sans leading-tight",
                        isSelected
                          ? "text-emerald-700"
                          : pkg.featured
                            ? "text-[rgba(255,255,255,0.7)]"
                            : "text-[#605A57]",
                      )}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
                {pkg.features.length > 3 && (
                  <li
                    className={cn(
                      "text-[10px] font-sans",
                      isSelected
                        ? "text-emerald-600"
                        : pkg.featured
                          ? "text-[rgba(255,255,255,0.5)]"
                          : "text-[#605A57]/50",
                    )}
                  >
                    +{pkg.features.length - 3} more
                  </li>
                )}
              </ul>

              {isSelected && (
                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600 font-sans">
                  <Check className="w-3.5 h-3.5" />
                  Selected
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { PackageSelector };
