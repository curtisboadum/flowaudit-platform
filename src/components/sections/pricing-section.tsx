import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PACKAGES } from "@/lib/calculator-data";

function PricingSection() {
  return (
    <section
      id="pricing"
      className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col items-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-0"
    >
      <div className="w-full max-w-[1060px]">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-12 sm:mb-16">
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
            text="Pricing"
          />
          <h2 className="text-center text-[#49423D] text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight font-sans tracking-tight">
            Simple Deployment Pricing
          </h2>
          <p className="text-center text-[#605A57] text-sm sm:text-base leading-7 font-sans max-w-[500px]">
            One-time deployment fee. Optional monthly optimization & monitoring available.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PACKAGES.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "rounded-2xl p-6 sm:p-8 flex flex-col",
                plan.featured
                  ? "bg-[#37322F] text-white shadow-[0px_4px_16px_rgba(55,50,47,0.2)]"
                  : "bg-white border border-[rgba(55,50,47,0.08)]",
              )}
            >
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "text-sm font-semibold font-sans mb-2",
                      plan.featured ? "text-[rgba(255,255,255,0.7)]" : "text-[#605A57]",
                    )}
                  >
                    {plan.name}
                  </div>
                  {plan.featured && (
                    <span className="mb-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-400 text-[#37322F]">
                      Most Popular
                    </span>
                  )}
                </div>
                <div
                  className={cn(
                    "text-3xl sm:text-4xl font-semibold font-sans",
                    plan.featured ? "text-white" : "text-[#37322F]",
                  )}
                >
                  {plan.displayPrice}
                </div>
                <div
                  className={cn(
                    "text-sm font-sans mt-2",
                    plan.featured ? "text-[rgba(255,255,255,0.6)]" : "text-[#605A57]",
                  )}
                >
                  {plan.description}
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className={cn(
                        "w-4 h-4 shrink-0 mt-0.5",
                        plan.featured ? "text-emerald-400" : "text-[#37322F]",
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm font-sans",
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
                      ? "text-[rgba(255,255,255,0.6)] hover:text-white hover:bg-[rgba(255,255,255,0.1)]"
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

        <p className="text-center text-[#605A57] text-xs font-sans mt-8">
          100% satisfaction guarantee. Optional optimization & monitoring packages available.
        </p>
        <div className="flex justify-center mt-3">
          <Link
            href="/book"
            className="text-emerald-600 hover:text-emerald-700 text-xs font-medium font-sans transition-colors"
          >
            Not sure? Start with a free pilot &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

export { PricingSection };
