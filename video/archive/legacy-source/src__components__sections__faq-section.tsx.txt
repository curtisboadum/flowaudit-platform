"use client";

import { Badge } from "@/components/ui/badge";
import { Accordion, type AccordionItemData } from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { useLocale } from "@/components/providers/locale-provider";

function FAQSection() {
  const { t } = useLocale();
  const translatedItems: AccordionItemData[] = t.faqItems.map((item) => ({
    question: item.q,
    answer: item.a,
  }));
  const leftItems = translatedItems.slice(0, 6);
  const rightItems = translatedItems.slice(6);
  return (
    <section
      id="faq"
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
                  y="10.5"
                  textAnchor="middle"
                  fill="#37322F"
                  fontSize="8"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  ?
                </text>
              </svg>
            }
            text={t.faq.badge}
          />
          <h2 className="text-center font-sans text-2xl leading-tight font-semibold tracking-tight text-[#49423D] sm:text-3xl lg:text-5xl">
            {t.faq.headline}
          </h2>
        </div>

        {/* Two-column FAQ */}
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-12">
          <Accordion items={leftItems} />
          <Accordion items={rightItems} />
        </div>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: translatedItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />
    </section>
  );
}

export { FAQSection };
