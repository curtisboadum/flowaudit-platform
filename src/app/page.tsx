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

export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full max-w-[1060px] relative">
        {/* Left vertical line */}
        <div className="hidden lg:block w-[1px] h-full absolute left-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0" />
        {/* Right vertical line */}
        <div className="hidden lg:block w-[1px] h-full absolute right-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0" />

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
    </div>
  );
}
