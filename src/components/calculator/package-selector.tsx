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
        <h3 className="font-sans text-sm font-semibold text-[#37322F]">Package Bundles</h3>
        {selectedPackage && (
          <button
            onClick={() => onSelectPackage(null)}
            className="font-sans text-xs font-medium text-red-500 transition-colors hover:text-red-600"
          >
            Clear Package
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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
                "rounded-xl border p-4 text-left transition-all",
                isSelected
                  ? "border-emerald-300 bg-emerald-50/50 shadow-sm"
                  : pkg.featured
                    ? "border-[#37322F] bg-[#37322F] hover:shadow-md"
                    : "border-[rgba(55,50,47,0.08)] bg-white hover:border-[rgba(55,50,47,0.16)]",
              )}
            >
              <div className="flex items-center gap-1.5">
                <div
                  className={cn(
                    "font-sans text-xs font-semibold",
                    isSelected
                      ? "text-emerald-700"
                      : pkg.featured
                        ? "text-[rgba(255,255,255,0.7)]"
                        : "text-[#605A57]",
                  )}
                >
                  {pkg.name}
                </div>
                {pkg.featured && !isSelected && (
                  <span className="inline-flex items-center rounded-full bg-emerald-400 px-1.5 py-0.5 text-[8px] leading-none font-semibold text-[#37322F]">
                    Popular
                  </span>
                )}
              </div>
              <div
                className={cn(
                  "font-sans text-lg font-semibold",
                  isSelected ? "text-emerald-700" : pkg.featured ? "text-white" : "text-[#37322F]",
                )}
              >
                {displayPrice}
              </div>
              <div
                className={cn(
                  "mt-1 font-sans text-xs",
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
                        "mt-0.5 h-3 w-3 shrink-0",
                        isSelected
                          ? "text-emerald-500"
                          : pkg.featured
                            ? "text-emerald-400"
                            : "text-[#605A57]",
                      )}
                    />
                    <span
                      className={cn(
                        "font-sans text-[10px] leading-tight",
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
                  <li className="group/more relative">
                    <span
                      className={cn(
                        "cursor-default font-sans text-[10px]",
                        isSelected
                          ? "text-emerald-600"
                          : pkg.featured
                            ? "text-[rgba(255,255,255,0.5)]"
                            : "text-[#605A57]/50",
                      )}
                    >
                      +{pkg.features.length - 3} more
                    </span>
                    <div className="pointer-events-none absolute bottom-full left-0 z-50 mb-2 w-48 rounded-lg border border-[rgba(55,50,47,0.08)] bg-white p-2.5 opacity-0 shadow-lg transition-opacity group-hover/more:opacity-100">
                      <ul className="space-y-1">
                        {pkg.features.slice(3).map((feature) => (
                          <li key={feature} className="flex items-start gap-1.5">
                            <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
                            <span className="font-sans text-[10px] leading-tight text-[#37322F]">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="absolute top-full left-4 h-2 w-2 -translate-y-1 rotate-45 border-r border-b border-[rgba(55,50,47,0.08)] bg-white" />
                    </div>
                  </li>
                )}
              </ul>

              {isSelected && (
                <div className="mt-3 flex items-center gap-1 font-sans text-xs font-medium text-emerald-600">
                  <Check className="h-3.5 w-3.5" />
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
