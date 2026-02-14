import { Badge } from "@/components/ui/badge";
import { Accordion, type AccordionItemData } from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";

const faqItems: AccordionItemData[] = [
  {
    question: "What exactly does FlowAudit do?",
    answer:
      "FlowAudit builds custom AI operations assistants for your business. We identify your most repetitive workflows — things like data entry, follow-ups, reporting, and client updates — and automate them using AI. Your assistant runs in the background, handling tasks that used to eat up hours every week.",
  },
  {
    question: "How is this different from hiring a virtual assistant?",
    answer:
      "A virtual assistant adds another person to manage, train, and pay monthly. An AI assistant works 24/7, doesn't make copy-paste errors, costs a one-time deployment fee, and scales without increasing headcount. It handles the structured, repetitive work so your team can focus on judgment-based tasks.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We work with any team running on repetitive workflows: trades (plumbers, electricians, contractors), insurance, agencies, consultants, accountants, legal practices, and growing service teams of 1-30 people. If your team is copying data between systems or sending the same follow-ups every week, we can help.",
  },
  {
    question: "How long does it take to get set up?",
    answer:
      "From first call to live assistant in about 10 days. We start with a 30-minute workflow call, identify your key automations, build your assistant, test with real data, and go live. You can also start with a 5-day pilot to validate one workflow before committing.",
  },
  {
    question: "What does the pilot include?",
    answer:
      "The pilot is a 5-day test of one automation workflow. We build it, test it with your real data, and show you measurable time savings. You only move forward if you see clear results. It's designed to remove risk from the decision.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We use role-based access controls, secure hosting with encryption at rest and in transit, and maintain complete audit logs. Your data is never sold, shared, or used for training models. You own all your workflows and data.",
  },
  {
    question: "What if I don't know which workflows to automate?",
    answer:
      "That's what the initial workflow call is for. We'll walk through your daily and weekly operations together, identify the biggest time sinks, and recommend where automation will have the most impact. Most teams are surprised by how much repetitive work they've been doing manually.",
  },
  {
    question: "Do I need any technical knowledge?",
    answer:
      "No. We handle all the technical setup, integration, and configuration. Your team interacts with the assistant through tools you already use — email, your CRM, messaging platforms. We train your team on how to work alongside the assistant.",
  },
  {
    question: "What's the pricing model?",
    answer:
      "One-time deployment fee based on scope: Starter ($4,995), Growth ($6,995), Scale ($9,495), or Custom Enterprise ($12,500+). Each package includes a set of automations, integrations, and support. Optional add-ons like quarterly optimization and extended support are available after deployment.",
  },
  {
    question: "What kind of ROI can I expect?",
    answer:
      "Teams typically see 5x ROI on their deployment investment. The average team saves 20+ hours per week on repetitive tasks, which translates to significant cost savings and increased revenue capacity. Most teams break even within the first few weeks.",
  },
];

const leftItems = faqItems.slice(0, 5);
const rightItems = faqItems.slice(5);

function FAQSection() {
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
            text="FAQ"
          />
          <h2 className="text-center font-sans text-2xl leading-tight font-semibold tracking-tight text-[#49423D] sm:text-3xl lg:text-5xl">
            Frequently Asked Questions
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
