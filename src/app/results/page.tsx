import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "Results — FlowAudit Case Studies",
  description:
    "Proven results across multiple industries. See how teams save 20+ hours per week with FlowAudit.",
  alternates: {
    canonical: "/results",
  },
};

const metrics = [
  { value: "20+", label: "Hours Saved Per Week", sub: "Average across all clients" },
  { value: "40%", label: "Operational Cost Reduction", sub: "Within first 90 days" },
  { value: "10", label: "Days to Go Live", sub: "From first call to production" },
  { value: "5x", label: "Average ROI", sub: "On deployment investment" },
] as const;

const caseStudies = [
  {
    industry: "Electrical Services",
    client: "Summit Electrical",
    problem:
      "Managing 50+ active jobs with manual quote follow-ups, CRM updates, and scheduling coordination. 25 hours/week lost to admin.",
    solution:
      "Deployed 4 automation workflows: quote follow-ups, CRM sync, job scheduling notifications, and weekly reporting.",
    results: [
      "18 hours/week saved",
      "Quote-to-close ratio improved 22%",
      "$4,200/month in recovered revenue",
      "Zero missed follow-ups",
    ],
    initials: "SE",
  },
  {
    industry: "Insurance Brokerage",
    client: "Cascade Insurance Group",
    problem:
      "200+ policy renewals tracked manually in spreadsheets. Missed renewals costing $15K+/quarter in lost commissions.",
    solution:
      "Built automated renewal tracking, client notification system, and commission tracking dashboard.",
    results: [
      "12 hours/week saved",
      "Zero missed renewals",
      "$15K/quarter in recovered commissions",
      "95% client retention rate",
    ],
    initials: "CI",
  },
  {
    industry: "Property Management",
    client: "Atlas Property Management",
    problem:
      "150 rental units with manual tenant communications, maintenance tracking, and payment follow-ups across 3 different systems.",
    solution:
      "End-to-end operations automation: tenant communications, maintenance dispatching, payment tracking, and owner reporting.",
    results: [
      "30 hours/week saved",
      "Maintenance response time cut 60%",
      "Payment collection improved 35%",
      "Owner satisfaction score: 9.4/10",
    ],
    initials: "AP",
  },
  {
    industry: "Marketing Agency",
    client: "Meridian Creative Agency",
    problem:
      "Client reporting, project status updates, and invoice generation consuming 20% of team capacity.",
    solution:
      "Automated weekly client reports, project milestone notifications, and invoice generation from project management data.",
    results: [
      "15 hours/week saved",
      "Client reporting now real-time",
      "Invoice accuracy improved to 99%",
      "Team capacity increased 20%",
    ],
    initials: "MC",
  },
] as const;

const testimonials = [
  {
    quote:
      "I was spending Sunday evenings preparing Monday morning reports. Now they're automatically generated and in my inbox before I wake up.",
    name: "Marcus Rodriguez",
    title: "Owner, Summit Electrical Services",
    initials: "MR",
  },
  {
    quote:
      "We tried three different CRMs before realizing the problem wasn't the tool — it was the manual work. FlowAudit solved the actual problem.",
    name: "Sarah Chen",
    title: "Managing Partner, Cascade Insurance",
    initials: "SC",
  },
  {
    quote:
      "My team went from dreading admin days to barely noticing them. The assistant handles everything we used to do manually.",
    name: "David Okafor",
    title: "Operations Director, Atlas PM",
    initials: "DO",
  },
] as const;

export default function ResultsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full max-w-[1060px]">
        {/* Hero */}
        <section className="flex flex-col items-center border-b border-[rgba(55,50,47,0.12)] px-4 pt-28 pb-16 text-center sm:px-6 sm:pt-36 sm:pb-20 lg:px-0 lg:pt-44">
          <Badge text="Case Studies" />
          <h1 className="mt-4 max-w-[600px] font-serif text-3xl leading-[1.1] font-normal text-[#37322F] sm:text-5xl lg:text-6xl">
            Proven Results Across Multiple Industries
          </h1>
        </section>

        {/* Impact Metrics */}
        <section className="border-b border-[rgba(55,50,47,0.12)] px-4 py-12 sm:px-6 lg:px-0">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="p-6 text-center">
                <div className="font-sans text-4xl font-semibold text-[#37322F] sm:text-5xl">
                  {metric.value}
                </div>
                <div className="mt-2 font-sans text-sm font-semibold text-[#37322F]">
                  {metric.label}
                </div>
                <div className="mt-1 font-sans text-xs text-[#605A57]">{metric.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Case Studies */}
        <section className="border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0">
          <h2 className="mb-12 text-center font-sans text-2xl font-semibold text-[#49423D] sm:text-3xl">
            Client Success Stories
          </h2>
          <div className="space-y-8">
            {caseStudies.map((study) => (
              <div
                key={study.client}
                className="rounded-xl border border-[rgba(55,50,47,0.08)] bg-white p-6 sm:p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#37322F]">
                    <span className="font-sans text-xs font-bold text-white">{study.initials}</span>
                  </div>
                  <div>
                    <div className="font-sans text-base font-semibold text-[#37322F]">
                      {study.client}
                    </div>
                    <div className="font-sans text-xs text-[#605A57]">{study.industry}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div>
                    <div className="mb-2 font-sans text-xs font-medium tracking-wider text-[#605A57] uppercase">
                      Problem
                    </div>
                    <p className="font-sans text-sm leading-6 text-[#37322F]">{study.problem}</p>
                  </div>
                  <div>
                    <div className="mb-2 font-sans text-xs font-medium tracking-wider text-[#605A57] uppercase">
                      Solution
                    </div>
                    <p className="font-sans text-sm leading-6 text-[#37322F]">{study.solution}</p>
                  </div>
                  <div>
                    <div className="mb-2 font-sans text-xs font-medium tracking-wider text-[#605A57] uppercase">
                      Results
                    </div>
                    <ul className="space-y-1">
                      {study.results.map((result) => (
                        <li key={result} className="font-sans text-sm font-medium text-emerald-700">
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0">
          <h2 className="mb-12 text-center font-sans text-2xl font-semibold text-[#49423D] sm:text-3xl">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-[rgba(55,50,47,0.08)] bg-white p-6"
              >
                <p className="font-serif text-sm leading-6 text-[#37322F] italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3 border-t border-[rgba(55,50,47,0.06)] pt-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#37322F]">
                    <span className="font-sans text-xs text-white">{t.initials}</span>
                  </div>
                  <div>
                    <div className="font-sans text-xs font-semibold text-[#37322F]">{t.name}</div>
                    <div className="font-sans text-xs text-[#605A57]">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-0">
          <h2 className="font-serif text-2xl font-normal text-[#37322F] sm:text-3xl">
            Get Results Like These
          </h2>
          <Button size="lg" className="mt-6" asChild>
            <Link href="/book">Book a Call</Link>
          </Button>
        </section>
      </div>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: canonicalUrl("/") },
          { name: "Results", url: canonicalUrl("/results") },
        ])}
      />
    </div>
  );
}
