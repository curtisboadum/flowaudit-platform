"use client";

import { Badge } from "@/components/ui/badge";
import { Accordion, type AccordionItemData } from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { useLocale } from "@/components/providers/locale-provider";

const faqItems: AccordionItemData[] = [
  {
    question: "What exactly does FlowAudit do?",
    answer:
      "We build a digital assistant that runs your admin in the background. It handles the stuff you do every week — sending quotes, chasing invoices, following up with clients, updating your records. You set it up once and it just runs.",
  },
  {
    question: "How is this different from hiring a virtual assistant?",
    answer:
      "A VA is another person to manage and pay monthly. Our system works 24/7, doesn't make mistakes, and costs a one-time setup fee — not an ongoing salary. It handles the repetitive stuff so you (or your team) can focus on the actual work.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "Mostly trades (plumbers, electricians, HVAC, builders), contractors, and small service businesses with 1-30 people. If you're copying info between apps, chasing invoices, or sending the same follow-up emails every week, we can help.",
  },
  {
    question: "I'm a one-person operation — is this still worth it?",
    answer:
      "Absolutely. Whether you're solo or have a small team, the biggest gains come from removing the admin that eats your day. Even saving 10-15 hours a week means you can take on more jobs or get your evenings back. Most clients — solo or team — say it's like finally having a reliable office manager.",
  },
  {
    question: "I'm not tech-savvy — will I be able to use this?",
    answer:
      "Yes. We handle all the technical setup. Your assistant works through tools you already use — email, text messages, your accounting software. If you can check your email, you can use this. We also walk you through everything and provide support.",
  },
  {
    question: "How long does it take to get set up?",
    answer:
      "About 10 days from first call to live. We start with a 30-minute chat to understand your business, then build your automations, test them with your real data, and go live. You can also start with a 5-day pilot to test one thing before committing.",
  },
  {
    question: "What does the pilot include?",
    answer:
      "The pilot is a 5-day test of one automation. We build it, run it with your real data, and show you exactly how much time it saves. You only move forward if you see clear results. It's designed to take the risk out of the decision.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We use role-based access controls, encrypted hosting, and full audit logs. Your data is never sold, shared, or used for training. You own everything — all your workflows, all your data.",
  },
  {
    question: "What if I don't know which workflows to automate?",
    answer:
      "That's what the first call is for. We'll walk through your day-to-day together, find the biggest time sinks, and recommend where to start. Most people are surprised how much repetitive work they've been doing without realizing it.",
  },
  {
    question: "What's the pricing model?",
    answer:
      "One-time deployment fee based on what you need: Starter ($4,995), Growth ($6,995), Scale ($9,495), or Custom ($12,500+). Each package includes a set number of automations, integrations, and support. No monthly fees for the core build — optional add-ons like quarterly optimization are available after.",
  },
  {
    question: "Do I need any technical knowledge?",
    answer:
      "None at all. We handle all the setup, wiring, and configuration. You interact with your assistant through tools you already use — email, texts, your accounting software. We walk your team through everything.",
  },
  {
    question: "What kind of ROI can I expect?",
    answer:
      "Most clients see 5x return on their investment. The average business saves 20+ hours a week on admin, which means more jobs, faster quoting, and fewer missed opportunities. Most people break even within the first few weeks.",
  },
];

const leftItems = faqItems.slice(0, 6);
const rightItems = faqItems.slice(6);

function FAQSection() {
  const { t } = useLocale();
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
          mainEntity: faqItems.map((item) => ({
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
