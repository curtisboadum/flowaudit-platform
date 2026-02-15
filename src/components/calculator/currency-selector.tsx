"use client";

import { cn } from "@/lib/utils";
import type { Currency, RateStatus } from "@/lib/currency";

interface CurrencySelectorProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  rateStatus: RateStatus;
}

const currencies: Currency[] = ["USD", "GBP", "EUR", "CAD", "AED", "SAR", "QAR"];

const statusLabels: Record<RateStatus, { label: string; className: string }> = {
  live: { label: "Live rates", className: "text-emerald-600" },
  cached: { label: "Cached rates", className: "text-emerald-600" },
  stale: { label: "Stale rates", className: "text-amber-600" },
  fallback: { label: "Fallback rates", className: "text-red-500" },
};

function CurrencySelector({ currency, onCurrencyChange, rateStatus }: CurrencySelectorProps) {
  const status = statusLabels[rateStatus];

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-wrap rounded-lg bg-[#F0EDEB] p-0.5">
        {currencies.map((c) => (
          <button
            key={c}
            onClick={() => onCurrencyChange(c)}
            className={cn(
              "rounded-md px-3 py-1.5 font-sans text-sm font-medium transition-all",
              currency === c
                ? "bg-white text-[#37322F] shadow-sm"
                : "text-[#605A57] hover:text-[#37322F]",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <span className={cn("font-sans text-xs", status.className)}>{status.label}</span>
    </div>
  );
}

export { CurrencySelector };
