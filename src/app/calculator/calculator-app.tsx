"use client";

import { useState, useEffect, useCallback } from "react";
import { TIERS, PACKAGES, ADDONS, BASE_FEE } from "@/lib/calculator-data";
import { fetchExchangeRates } from "@/lib/currency";
import type { Currency, ExchangeRates, RateStatus } from "@/lib/currency";
import { CurrencySelector } from "@/components/calculator/currency-selector";
import { ROICalculator } from "@/components/calculator/roi-calculator";
import { AutomationsSelector } from "@/components/calculator/automations-selector";
import { StickySummary } from "@/components/calculator/sticky-summary";
import { PDFExport } from "@/components/calculator/pdf-export";

function CalculatorApp() {
  // ROI inputs
  const [hours, setHours] = useState(20);
  const [rate, setRate] = useState(42);

  // Selection state
  const [selectedAutomations, setSelectedAutomations] = useState<Set<string>>(new Set());
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  // Currency state
  const [currency, setCurrency] = useState<Currency>("USD");
  const [rates, setRates] = useState<ExchangeRates>({ USD: 1, GBP: 0.79, EUR: 0.92, CAD: 1.35 });
  const [rateStatus, setRateStatus] = useState<RateStatus>("fallback");

  // Fetch exchange rates on mount
  useEffect(() => {
    fetchExchangeRates().then(({ rates: fetchedRates, status }) => {
      setRates(fetchedRates);
      setRateStatus(status);
    });
  }, []);

  // Calculate setup cost
  const setupCost = (() => {
    const addonTotal = ADDONS.filter((a) => selectedAddOns.has(a.name)).reduce(
      (sum, a) => sum + a.price,
      0,
    );

    if (selectedPackage) {
      const pkg = PACKAGES.find((p) => p.name === selectedPackage);
      return (pkg?.price ?? 0) + addonTotal;
    }

    const automationTotal = Array.from(selectedAutomations).reduce((sum, name) => {
      for (const tier of Object.values(TIERS)) {
        const found = tier.automations.find((a) => a.name === name);
        if (found) return sum + found.price;
      }
      return sum;
    }, 0);

    if (automationTotal === 0 && addonTotal === 0) {
      return BASE_FEE;
    }

    return BASE_FEE + automationTotal + addonTotal;
  })();

  // Automation handlers
  const handleToggleAutomation = useCallback(
    (name: string) => {
      // If in package mode, switch to a-la-carte
      if (selectedPackage) {
        setSelectedPackage(null);
      }
      setSelectedAutomations((prev) => {
        const next = new Set(prev);
        if (next.has(name)) {
          next.delete(name);
        } else {
          next.add(name);
        }
        return next;
      });
    },
    [selectedPackage],
  );

  const handleSelectAllTier = useCallback(
    (_tierKey: string, names: string[]) => {
      if (selectedPackage) {
        setSelectedPackage(null);
      }
      setSelectedAutomations((prev) => {
        const next = new Set(prev);
        for (const name of names) {
          next.add(name);
        }
        return next;
      });
    },
    [selectedPackage],
  );

  const handleDeselectAll = useCallback((names: string[]) => {
    setSelectedAutomations((prev) => {
      const next = new Set(prev);
      for (const name of names) {
        next.delete(name);
      }
      return next;
    });
  }, []);

  const handleSelectPackage = useCallback((name: string | null) => {
    setSelectedPackage(name);
    if (name) {
      // Clear individual selections when choosing a package
      setSelectedAutomations(new Set());
    }
  }, []);

  // Add-on handlers
  const handleToggleAddOn = useCallback((name: string) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  }, []);

  const handleSelectAllAddOns = useCallback(() => {
    setSelectedAddOns(new Set(ADDONS.map((a) => a.name)));
  }, []);

  const handleDeselectAllAddOns = useCallback(() => {
    setSelectedAddOns(new Set());
  }, []);

  const handleReset = useCallback(() => {
    setHours(20);
    setRate(42);
    setSelectedAutomations(new Set());
    setSelectedAddOns(new Set());
    setSelectedPackage(null);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full max-w-[1060px] px-4 sm:px-6 lg:px-0">
        {/* Hero */}
        <section className="flex flex-col items-center pt-8 pb-12 text-center sm:pb-16">
          <h1 className="max-w-[700px] font-serif text-3xl leading-[1.1] font-normal text-[#37322F] sm:text-5xl lg:text-6xl">
            Calculate Your Automation ROI
          </h1>
          <p className="mt-6 max-w-[550px] font-sans text-base leading-7 text-[rgba(55,50,47,0.80)] sm:text-lg">
            Let&apos;s find the perfect automation package for your business. Customize your
            selection and get a detailed ROI breakdown.
          </p>
          <p className="mt-3 font-sans text-xs text-[rgba(55,50,47,0.40)]">
            Takes 30 seconds. No email required.
          </p>

          {/* Currency Selector */}
          <div className="mt-8">
            <CurrencySelector
              currency={currency}
              onCurrencyChange={setCurrency}
              rateStatus={rateStatus}
            />
          </div>
        </section>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-6 pb-32 lg:grid-cols-[400px_1fr] lg:gap-8">
          {/* Left: ROI Calculator + PDF */}
          <div className="space-y-6">
            <ROICalculator
              hours={hours}
              rate={rate}
              setupCost={setupCost}
              currency={currency}
              rates={rates}
              onHoursChange={setHours}
              onRateChange={setRate}
            />
            <PDFExport
              hours={hours}
              rate={rate}
              setupCost={setupCost}
              selectedAutomations={selectedAutomations}
              selectedAddOns={selectedAddOns}
              selectedPackage={selectedPackage}
              currency={currency}
              rates={rates}
              onReset={handleReset}
            />
          </div>

          {/* Right: Automations Selector */}
          <div>
            <AutomationsSelector
              selectedAutomations={selectedAutomations}
              selectedAddOns={selectedAddOns}
              selectedPackage={selectedPackage}
              onToggleAutomation={handleToggleAutomation}
              onSelectAllTier={handleSelectAllTier}
              onDeselectAll={handleDeselectAll}
              onToggleAddOn={handleToggleAddOn}
              onSelectAllAddOns={handleSelectAllAddOns}
              onDeselectAllAddOns={handleDeselectAllAddOns}
              onSelectPackage={handleSelectPackage}
              currency={currency}
              rates={rates}
            />
          </div>
        </div>
      </div>

      {/* Sticky Summary */}
      <StickySummary
        hours={hours}
        rate={rate}
        setupCost={setupCost}
        currency={currency}
        rates={rates}
      />
    </div>
  );
}

export { CalculatorApp };
