/**
 * @file page.tsx
 * @description Home page composition, stacks marketing sections and emits
 *   WebSite + ProfessionalService JSON-LD. Pricing/calculator sections removed.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import { HeroSection } from "@/components/sections/hero-section";
import { BentoGrid } from "@/components/sections/bento-grid";
import { ProblemSection } from "@/components/sections/problem-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { RevenueRecoveryBanner } from "@/components/sections/revenue-recovery-banner";
import { CalculatorSection } from "@/components/sections/calculator-section";
import { ProcessSection } from "@/components/sections/process-section";
import { PilotSection } from "@/components/sections/pilot-section";
import { ImpactMetrics } from "@/components/sections/impact-metrics";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { SecuritySection } from "@/components/sections/security-section";
import { ComparisonSection } from "@/components/sections/comparison-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "FlowAudit builds AI assistants that handle your repetitive admin, without losing quality, control, or oversight.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const PROFESSIONAL_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.png`,
  description:
    "AI operations assistants that handle repetitive admin for teams drowning in manual work. Turn 10 hours of manual work into 10 minutes.",
  email: "support@flowaudit.co.uk",
  areaServed: [
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Paraguay" },
  ],
  serviceType: [
    "AI Operations Assistants",
    "Business Process Automation",
    "Custom Website Design",
    "AI Chatbots",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Business Automation",
    "Operations Management",
    "Web Design",
  ],
  sameAs: ["https://www.linkedin.com/company/flowaudit"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: `${SITE_URL}/book`,
    email: "support@flowaudit.co.uk",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "FlowAudit Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Operations Assistant",
          description:
            "Custom AI assistant that handles repetitive admin tasks for your team.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Website Design",
          description:
            "Custom-designed websites and AI-powered business tools.",
        },
      },
    ],
  },
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="relative w-full max-w-[1060px]">
        {/* Left vertical line */}
        <div className="absolute top-0 left-0 z-0 hidden h-full w-[1px] bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] lg:block" />
        {/* Right vertical line */}
        <div className="absolute top-0 right-0 z-0 hidden h-full w-[1px] bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] lg:block" />

        <HeroSection />
        <RevenueRecoveryBanner />
        <BentoGrid />
        <ProblemSection />
        <FeaturesSection />
        <CalculatorSection />
        <ProcessSection />
        <PilotSection />
        <ImpactMetrics />
        <TestimonialsSection />
        <SecuritySection />
        <ComparisonSection />
        <FAQSection />
        <CTASection />
      </div>
      <JsonLd data={WEBSITE_SCHEMA} />
      <JsonLd data={PROFESSIONAL_SERVICE_SCHEMA} />
    </div>
  );
}
