"use client";

import { cn } from "@/lib/utils";
import { TIERS, ADDONS } from "@/lib/calculator-data";
import type { Currency, ExchangeRates } from "@/lib/currency";
import { TierGrid } from "@/components/calculator/tier-grid";
import { PackageSelector } from "@/components/calculator/package-selector";
import { AddonSelector } from "@/components/calculator/addon-selector";

interface AutomationsSelectorProps {
  selectedAutomations: Set<string>;
  selectedAddOns: Set<string>;
  selectedPackage: string | null;
  onToggleAutomation: (name: string) => void;
  onSelectAllTier: (tierKey: string, names: string[]) => void;
  onDeselectAll: (names: string[]) => void;
  onToggleAddOn: (name: string) => void;
  onSelectAllAddOns: () => void;
  onDeselectAllAddOns: () => void;
  onSelectPackage: (name: string | null) => void;
  currency: Currency;
  rates: ExchangeRates;
}

function AutomationsSelector({
  selectedAutomations,
  selectedAddOns,
  selectedPackage,
  onToggleAutomation,
  onSelectAllTier,
  onDeselectAll,
  onToggleAddOn,
  onSelectAllAddOns,
  onDeselectAllAddOns,
  onSelectPackage,
  currency,
  rates,
}: AutomationsSelectorProps) {
  const mode = selectedPackage ? "package" : "a-la-carte";

  // Count selected items
  const automationCount = selectedAutomations.size;
  const addonCount = selectedAddOns.size;
  const totalAutomationCost = Array.from(selectedAutomations).reduce((sum, name) => {
    for (const tier of Object.values(TIERS)) {
      const found = tier.automations.find((a) => a.name === name);
      if (found) return sum + found.price;
    }
    return sum;
  }, 0);
  const totalAddonCost = ADDONS.filter((a) => selectedAddOns.has(a.name)).reduce(
    (sum, a) => sum + a.price,
    0,
  );
  return (
    <div className="bg-white rounded-2xl border border-[rgba(55,50,47,0.08)] p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#37322F] text-xl font-semibold font-sans">Automation Selection</h2>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-xs font-medium font-sans px-2.5 py-1 rounded-full",
              mode === "package"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-[#F0EDEB] text-[#605A57]",
            )}
          >
            {mode === "package" ? `Package: ${selectedPackage}` : "A-la-carte"}
          </span>
          {automationCount > 0 && mode === "a-la-carte" && (
            <span className="text-xs font-sans text-[#605A57]">
              {automationCount} selected
            </span>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {/* Packages */}
        <PackageSelector
          selectedPackage={selectedPackage}
          onSelectPackage={onSelectPackage}
          currency={currency}
          rates={rates}
        />

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[rgba(55,50,47,0.08)]" />
          <span className="text-xs text-[#605A57] font-sans">or choose individual automations</span>
          <div className="flex-1 h-px bg-[rgba(55,50,47,0.08)]" />
        </div>

        {/* Tiers */}
        {Object.entries(TIERS).map(([key, tier]) => (
          <TierGrid
            key={key}
            tier={tier}
            tierKey={key}
            selectedAutomations={selectedAutomations}
            onToggleAutomation={onToggleAutomation}
            onSelectAll={onSelectAllTier}
            onDeselectAll={onDeselectAll}
            currency={currency}
            rates={rates}
          />
        ))}

        {/* Divider */}
        <div className="h-px bg-[rgba(55,50,47,0.08)]" />

        {/* Add-ons */}
        <AddonSelector
          selectedAddOns={selectedAddOns}
          onToggleAddOn={onToggleAddOn}
          onSelectAllAddOns={onSelectAllAddOns}
          onDeselectAllAddOns={onDeselectAllAddOns}
          currency={currency}
          rates={rates}
        />

        {/* Summary strip */}
        <div className="rounded-lg bg-[#F7F5F3] p-4 flex flex-wrap gap-4 text-sm font-sans">
          {mode === "package" && (
            <div>
              <span className="text-[#605A57]">Package: </span>
              <span className="font-semibold text-[#37322F]">{selectedPackage}</span>
            </div>
          )}
          {mode === "a-la-carte" && automationCount > 0 && (
            <div>
              <span className="text-[#605A57]">Automations ({automationCount}): </span>
              <span className="font-semibold text-[#37322F]">
                ${totalAutomationCost.toLocaleString()}
              </span>
            </div>
          )}
          {addonCount > 0 && (
            <div>
              <span className="text-[#605A57]">Add-ons ({addonCount}): </span>
              <span className="font-semibold text-[#37322F]">
                ${totalAddonCost.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { AutomationsSelector };
