import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Results — FlowAudit Case Studies",
  description:
    "Proven results across multiple industries. See how teams save 20+ hours per week with FlowAudit.",
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
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full max-w-[1060px]">
        {/* Hero */}
        <section className="pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-0 flex flex-col items-center text-center border-b border-[rgba(55,50,47,0.12)]">
          <Badge text="Case Studies" />
          <h1 className="text-[#37322F] text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] font-serif max-w-[600px] mt-4">
            Proven Results Across Multiple Industries
          </h1>
        </section>

        {/* Impact Metrics */}
        <section className="py-12 px-4 sm:px-6 lg:px-0 border-b border-[rgba(55,50,47,0.12)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center p-6">
                <div className="text-4xl sm:text-5xl text-[#37322F] font-semibold font-sans">
                  {metric.value}
                </div>
                <div className="text-sm text-[#37322F] font-semibold font-sans mt-2">
                  {metric.label}
                </div>
                <div className="text-xs text-[#605A57] font-sans mt-1">{metric.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-0 border-b border-[rgba(55,50,47,0.12)]">
          <h2 className="text-center text-[#49423D] text-2xl sm:text-3xl font-semibold font-sans mb-12">
            Client Success Stories
          </h2>
          <div className="space-y-8">
            {caseStudies.map((study) => (
              <div
                key={study.client}
                className="bg-white rounded-xl border border-[rgba(55,50,47,0.08)] p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#37322F] flex items-center justify-center">
                    <span className="text-white text-xs font-bold font-sans">
                      {study.initials}
                    </span>
                  </div>
                  <div>
                    <div className="text-[#37322F] text-base font-semibold font-sans">
                      {study.client}
                    </div>
                    <div className="text-[#605A57] text-xs font-sans">{study.industry}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <div className="text-xs text-[#605A57] font-sans font-medium uppercase tracking-wider mb-2">
                      Problem
                    </div>
                    <p className="text-sm text-[#37322F] font-sans leading-6">{study.problem}</p>
                  </div>
                  <div>
                    <div className="text-xs text-[#605A57] font-sans font-medium uppercase tracking-wider mb-2">
                      Solution
                    </div>
                    <p className="text-sm text-[#37322F] font-sans leading-6">{study.solution}</p>
                  </div>
                  <div>
                    <div className="text-xs text-[#605A57] font-sans font-medium uppercase tracking-wider mb-2">
                      Results
                    </div>
                    <ul className="space-y-1">
                      {study.results.map((result) => (
                        <li
                          key={result}
                          className="text-sm text-emerald-700 font-medium font-sans"
                        >
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
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-0 border-b border-[rgba(55,50,47,0.12)]">
          <h2 className="text-center text-[#49423D] text-2xl sm:text-3xl font-semibold font-sans mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-xl border border-[rgba(55,50,47,0.08)] p-6"
              >
                <p className="text-[#37322F] text-sm font-serif italic leading-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[rgba(55,50,47,0.06)]">
                  <div className="w-8 h-8 rounded-full bg-[#37322F] flex items-center justify-center">
                    <span className="text-white text-xs font-sans">{t.initials}</span>
                  </div>
                  <div>
                    <div className="text-[#37322F] text-xs font-semibold font-sans">{t.name}</div>
                    <div className="text-[#605A57] text-xs font-sans">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-0 flex flex-col items-center text-center">
          <h2 className="text-[#37322F] text-2xl sm:text-3xl font-normal font-serif">
            Get Results Like These
          </h2>
          <Button size="lg" className="mt-6" asChild>
            <Link href="/book">Book a Call</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
