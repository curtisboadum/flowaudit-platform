import type { Metadata } from "next";
import { CalculatorApp } from "@/app/calculator/calculator-app";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumbs";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = {
  title: "ROI Calculator | FlowAudit",
  description:
    "Calculate your automation savings with FlowAudit. See how much time and money you could save by automating your quoting, invoicing, and admin. Built for trades, contractors, and small businesses.",
  alternates: {
    canonical: "/calculator",
  },
};

export default function CalculatorPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-[1060px] px-4 pt-24 sm:px-6 sm:pt-28 lg:px-0 lg:pt-32">
        <Breadcrumbs items={[{ name: "ROI Calculator", href: "/calculator" }]} />
      </div>
      <CalculatorApp />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: canonicalUrl("/") },
          { name: "ROI Calculator", url: canonicalUrl("/calculator") },
        ])}
      />
    </>
  );
}
