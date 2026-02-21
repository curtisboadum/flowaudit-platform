import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumbs";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CalendarCheck, Search, FileText, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Call — FlowAudit",
  description:
    "Book a free 30-minute strategy call. See how automation can cut your admin workload — quoting, invoicing, follow-ups, all handled.",
  alternates: {
    canonical: "/book",
  },
};

const expectations = [
  {
    icon: Search,
    title: "Quick Chat About Your Business",
    description:
      "We'll ask about your typical week — what takes up your time, what falls through the cracks.",
  },
  {
    icon: CalendarCheck,
    title: "Spot the Quick Wins",
    description:
      "We'll find 2-3 things that can be automated straight away — usually quoting, invoicing, or follow-ups.",
  },
  {
    icon: FileText,
    title: "Get a Clear Plan",
    description:
      "You'll get a plain-English proposal showing what we'll build, what it costs, and how much time you'll save.",
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
            See how automation can handle your admin. 30 minutes. No jargon. No pressure.
          </p>
        </section>

        {/* Email CTA */}
        <section className="px-4 pb-16 sm:px-6 lg:px-0">
          <div className="mx-auto w-full max-w-[800px]">
            <div className="flex flex-col items-center gap-6 rounded-2xl border border-[rgba(55,50,47,0.08)] bg-white p-8 text-center sm:p-12">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0EDEB]">
                <Mail className="h-7 w-7 text-[#37322F]" />
              </div>
              <div>
                <h2 className="font-sans text-xl font-semibold text-[#37322F] sm:text-2xl">
                  Schedule Your Free Strategy Call
                </h2>
                <p className="mx-auto mt-3 max-w-[440px] font-sans text-sm leading-relaxed text-[#605A57]">
                  Email us at hello@flowaudit.co and we&apos;ll find a time that works for you. Or
                  call us directly.
                </p>
              </div>
              <a
                href="mailto:hello@flowaudit.co?subject=Strategy%20Call%20Request"
                className="inline-flex items-center gap-2 rounded-lg bg-[#37322F] px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-[#605A57]"
              >
                <Mail className="h-4 w-4" />
                Email Us to Book
              </a>
            </div>
            <p className="mt-4 text-center font-sans text-sm text-[#605A57]">
              We respond to all enquiries within 24 hours.
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
