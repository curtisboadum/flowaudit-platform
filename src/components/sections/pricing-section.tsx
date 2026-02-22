"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PACKAGES } from "@/lib/calculator-data";
import { useLocale } from "@/components/providers/locale-provider";
import { applyAgencyDiscount } from "@/lib/i18n";

function PricingSection() {
  const { locale, t } = useLocale();
  return (
    <section
      id="pricing"
      className="flex w-full flex-col items-center border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0 lg:py-24"
    >
      <div className="w-full max-w-[1060px]">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center gap-4 sm:mb-16">
          <Badge
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="#37322F" strokeWidth="1" fill="none" />
                <text
                  x="7"
                  y="10"
                  textAnchor="middle"
                  fill="#37322F"
                  fontSize="8"
                  fontFamily="sans-serif"
                >
                  $
                </text>
              </svg>
            }
            text={t.pricing.badge}
          />
          <h2 className="text-center font-sans text-2xl leading-tight font-semibold tracking-tight text-[#49423D] sm:text-3xl lg:text-5xl">
            {t.pricing.headline}
          </h2>
          <p className="max-w-[500px] text-center font-sans text-sm leading-7 text-[#605A57] sm:text-base">
            {t.pricing.subtext}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PACKAGES.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "flex flex-col rounded-2xl p-6 sm:p-8",
                plan.featured
                  ? "bg-[#37322F] text-white shadow-[0px_4px_16px_rgba(55,50,47,0.2)]"
                  : "border border-[rgba(55,50,47,0.08)] bg-white",
              )}
            >
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "mb-2 font-sans text-sm font-semibold",
                      plan.featured ? "text-[rgba(255,255,255,0.7)]" : "text-[#605A57]",
                    )}
                  >
                    {plan.name}
                  </div>
                  {plan.featured && (
                    <span className="mb-2 inline-flex items-center rounded-full bg-emerald-400 px-2 py-0.5 text-[10px] font-semibold text-[#37322F]">
                      Most Popular
                    </span>
                  )}
                </div>
                <div
                  className={cn(
                    "font-sans text-3xl font-semibold sm:text-4xl",
                    plan.featured ? "text-white" : "text-[#37322F]",
                  )}
                >
                  {locale === "es"
                    ? `$${applyAgencyDiscount(plan.price).toLocaleString()}`
                    : plan.displayPrice}
                </div>
                <div
                  className={cn(
                    "mt-2 font-sans text-sm",
                    plan.featured ? "text-[rgba(255,255,255,0.6)]" : "text-[#605A57]",
                  )}
                >
                  {plan.description}
                </div>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        plan.featured ? "text-emerald-400" : "text-[#37322F]",
                      )}
                    />
                    <span
                      className={cn(
                        "font-sans text-sm",
                        plan.featured ? "text-[rgba(255,255,255,0.85)]" : "text-[#605A57]",
                      )}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2">
                <Button
                  variant={plan.featured ? "secondary" : "default"}
                  className={cn(
                    "w-full",
                    plan.featured && "bg-white text-[#37322F] hover:bg-[#F7F5F3]",
                  )}
                  asChild
                >
                  <Link href="/book">Book a Call</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-full text-xs",
                    plan.featured
                      ? "text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.1)] hover:text-white"
                      : "text-[#605A57] hover:text-[#37322F]",
                  )}
                  asChild
                >
                  <Link href="/calculator">Customize &rarr;</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center font-sans text-xs text-[#605A57]">
          {t.pricing.guarantee}
        </p>
        <div className="mt-3 flex justify-center">
          <Link
            href="/book"
            className="font-sans text-xs font-medium text-emerald-600 transition-colors hover:text-emerald-700"
          >
            {t.pricing.notSure}
          </Link>
        </div>
      </div>
    </section>
  );
}

export { PricingSection };
