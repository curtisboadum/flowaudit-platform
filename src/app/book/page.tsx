import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumbs";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CalendarCheck, Search, FileText } from "lucide-react";
import { CalendlyEmbed } from "@/components/book/calendly-embed";

export const metadata: Metadata = {
  title: "Book a Call — FlowAudit",
  description:
    "Book a free 30-minute strategy call. See exactly how AI can cut your operational workload.",
  alternates: {
    canonical: "/book",
  },
};

const CALENDLY_URL = "https://calendly.com/flowaudit/30min";

const expectations = [
  {
    icon: Search,
    title: "Workflow Audit",
    description: "We'll map your current processes and identify the biggest time sinks.",
  },
  {
    icon: CalendarCheck,
    title: "Identify Quick Wins",
    description: "We'll pinpoint 2-3 workflows that can be automated immediately.",
  },
  {
    icon: FileText,
    title: "Custom Proposal",
    description: "You'll get a tailored plan with expected time savings and ROI.",
  },
] as const;

export default function BookPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full max-w-[1060px]">
        <div className="px-4 pt-24 sm:px-6 sm:pt-28 lg:px-0 lg:pt-32">
          <Breadcrumbs items={[{ name: "Book a Call", href: "/book" }]} />
        </div>
        {/* Hero */}
        <section className="flex flex-col items-center px-4 pt-8 pb-12 text-center sm:px-6 lg:px-0">
          <h1 className="max-w-[600px] font-serif text-3xl leading-[1.1] font-normal text-[#37322F] sm:text-5xl lg:text-6xl">
            Book a Free Strategy Call
          </h1>
          <p className="mt-6 max-w-[500px] font-sans text-base leading-7 text-[rgba(55,50,47,0.80)] sm:text-lg">
            See exactly how AI can cut your operational workload. 30 minutes. No pressure.
          </p>
        </section>

        {/* Calendar Embed */}
        <section className="px-4 pb-16 sm:px-6 lg:px-0">
          <div className="mx-auto w-full max-w-[800px]">
            <div className="overflow-hidden rounded-2xl border border-[rgba(55,50,47,0.08)] bg-white">
              <CalendlyEmbed url={CALENDLY_URL} />
            </div>
            {/* Fallback */}
            <p className="mt-4 text-center font-sans text-sm text-[#605A57]">
              Can&apos;t see the calendar?{" "}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#37322F] underline"
              >
                Open scheduling page directly
              </a>
            </p>
          </div>
        </section>

        {/* What to Expect */}
        <section className="border-b border-[rgba(55,50,47,0.12)] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-0">
          <div className="mx-auto max-w-[800px]">
            <h2 className="mb-8 text-center font-sans text-xl font-semibold text-[#49423D] sm:text-2xl">
              What to Expect
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {expectations.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0EDEB]">
                      <Icon className="h-5 w-5 text-[#37322F]" />
                    </div>
                    <div className="mb-1 font-sans text-xs text-[#605A57]">Step {index + 1}</div>
                    <h3 className="font-sans text-sm font-semibold text-[#37322F]">{item.title}</h3>
                    <p className="mt-2 font-sans text-xs leading-5 text-[#605A57]">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: canonicalUrl("/") },
          { name: "Book a Call", url: canonicalUrl("/book") },
        ])}
      />
    </div>
  );
}
