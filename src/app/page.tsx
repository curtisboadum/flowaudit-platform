import { HeroSection } from "@/components/sections/hero-section";
import { LogoGrid } from "@/components/sections/logo-grid";
import { BentoGrid } from "@/components/sections/bento-grid";
import { ProblemSection } from "@/components/sections/problem-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { CalculatorSection } from "@/components/sections/calculator-section";
import { ProcessSection } from "@/components/sections/process-section";
import { PilotSection } from "@/components/sections/pilot-section";
import { ImpactMetrics } from "@/components/sections/impact-metrics";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { SecuritySection } from "@/components/sections/security-section";
import { ComparisonSection } from "@/components/sections/comparison-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="relative w-full max-w-[1060px]">
        {/* Left vertical line */}
        <div className="absolute top-0 left-0 z-0 hidden h-full w-[1px] bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] lg:block" />
        {/* Right vertical line */}
        <div className="absolute top-0 right-0 z-0 hidden h-full w-[1px] bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] lg:block" />

        <HeroSection />
        <LogoGrid />
        <BentoGrid />
        <ProblemSection />
        <FeaturesSection />
        <CalculatorSection />
        <ProcessSection />
        <PilotSection />
        <ImpactMetrics />
        <TestimonialsSection />
        <PricingSection />
        <SecuritySection />
        <ComparisonSection />
        <FAQSection />
        <CTASection />
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
          description:
            "FlowAudit_ builds AI assistants that handle your repetitive admin — without losing quality, control, or oversight.",
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/blog?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />
    </div>
  );
}
