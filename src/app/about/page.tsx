import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumbs";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Linkedin } from "lucide-react";

export const metadata: Metadata = {
  title: "About — FlowAudit",
  description:
    "We help operators reclaim time through structured automation. Meet the team behind FlowAudit.",
  alternates: {
    canonical: "/about",
  },
};

const teamMembers = [
  {
    name: "Curtis Kusi Boadum",
    title: "Founder & CEO",
    description:
      "Systems thinker. Builds the AI infrastructure that powers every FlowAudit assistant.",
    initials: "CB",
    image: "/team/curtis.jpg",
    isAI: false,
  },
  {
    name: "Ephraim (Kofi) Owusu",
    title: "Co-founder & COO",
    description:
      "Operations and legal strategy. Ensures every deployment is compliant and scalable.",
    initials: "KO",
    image: "/team/kofi.jpg",
    isAI: false,
  },
  {
    name: "Lawyer Boadum",
    title: "Sales Advisor",
    description:
      "Client relationships and growth strategy. Connects operators with the right solutions.",
    initials: "LB",
    image: null,
    isAI: false,
  },
  {
    name: "Casper",
    title: "AI Agent",
    description:
      "Manages reporting, analytics, and operational visibility across client workflows.",
    initials: "C",
    image: "/team/casper.svg",
    isAI: true,
  },
  {
    name: "Klaus",
    title: "AI Agent",
    description: "Handles workflow automation, data syncing, and client communication tasks.",
    initials: "K",
    image: "/team/klaus.svg",
    isAI: true,
  },
] as const;

const values = [
  {
    title: "No Enterprise Bloat",
    description:
      "We don't sell 6-month implementation cycles. We deploy working assistants in 10 days.",
  },
  {
    title: "Built for Serious Operators",
    description:
      "Every feature is designed for tradespeople, contractors, and small teams who run real businesses — whether you're solo or have 30 people.",
  },
  {
    title: "Practical Implementation",
    description: "We start with the workflow that saves you the most time, then expand from there.",
  },
  {
    title: "Margin-First Mindset",
    description:
      "Every automation is measured by its impact on your bottom line, not vanity metrics.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full max-w-[1060px]">
        <div className="px-4 pt-24 sm:px-6 sm:pt-28 lg:px-0 lg:pt-32">
          <Breadcrumbs items={[{ name: "About", href: "/about" }]} />
        </div>
        {/* Hero */}
        <section className="flex flex-col items-center border-b border-[rgba(55,50,47,0.12)] px-4 pt-8 pb-16 text-center sm:px-6 sm:pb-20 lg:px-0">
          <h1 className="max-w-[600px] font-serif text-3xl leading-[1.1] font-normal text-[#37322F] sm:text-5xl lg:text-6xl">
            We help operators reclaim time through structured automation
          </h1>
          <p className="mt-6 max-w-[500px] font-sans text-base leading-7 text-[rgba(55,50,47,0.80)] sm:text-lg">
            FlowAudit is the back-office assistant for tradespeople and small businesses drowning
            in admin.
          </p>
        </section>

        {/* Mission */}
        <section className="border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0">
          <div className="mx-auto max-w-[700px]">
            <Badge text="Our Approach" />
            <h2 className="mt-4 font-sans text-2xl font-semibold text-[#49423D] sm:text-3xl">
              We get it — you didn&apos;t start your business to do paperwork
            </h2>
            <p className="mt-4 font-sans text-base leading-7 text-[#605A57]">
              Most tradespeople and small operators don&apos;t need another app. They need someone
              to look at how they work, find the stuff that eats their time, and fix it permanently.
              That&apos;s what we do.
            </p>
            <p className="mt-4 font-sans text-base leading-7 text-[#605A57]">
              We combine smart automation with an understanding of how real businesses run — the
              quoting, the invoicing, the follow-ups, the scheduling. We build systems that handle
              all of it, so you can focus on the work that actually pays.
            </p>
          </div>
        </section>

        {/* Team */}
        <section className="border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0">
          <div className="mb-12 text-center">
            <Badge text="Our Team" />
            <h2 className="mt-4 font-sans text-2xl font-semibold text-[#49423D] sm:text-3xl">
              Humans + AI, working together
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center rounded-xl border border-[rgba(55,50,47,0.08)] bg-white p-6 text-center"
              >
                <div className="relative">
                  {member.image ? (
                    <div className="mb-4 h-28 w-28 overflow-hidden rounded-full bg-[#F0EDEB]">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={112}
                        height={112}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-[#37322F]">
                      <span className="font-sans text-2xl font-semibold text-white">
                        {member.initials}
                      </span>
                    </div>
                  )}
                  {member.isAI && (
                    <span className="absolute -top-1 -right-1 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      AI
                    </span>
                  )}
                </div>
                <h3 className="font-sans text-base font-semibold text-[#37322F]">{member.name}</h3>
                <p className="mt-1 font-sans text-sm text-[#605A57]">{member.title}</p>
                <p className="mt-3 font-sans text-xs leading-5 text-[#605A57]">
                  {member.description}
                </p>
                {!member.isAI && (
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-[#605A57] transition-colors hover:text-[#37322F]"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0">
          <div className="mb-12 text-center">
            <Badge text="Our Values" />
            <h2 className="mt-4 font-sans text-2xl font-semibold text-[#49423D] sm:text-3xl">
              What we believe
            </h2>
          </div>

          <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="p-6">
                <h3 className="font-sans text-base font-semibold text-[#37322F]">{value.title}</h3>
                <p className="mt-2 font-sans text-sm leading-6 text-[#605A57]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-0">
          <h2 className="font-serif text-2xl font-normal text-[#37322F] sm:text-3xl">
            Ready to reclaim your time?
          </h2>
          <p className="mt-4 max-w-[400px] font-sans text-sm text-[#605A57] sm:text-base">
            Book a free strategy call and see exactly how AI can cut your operational workload.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link href="/book">Book a Strategy Call</Link>
          </Button>
        </section>
      </div>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: canonicalUrl("/") },
          { name: "About", url: canonicalUrl("/about") },
        ])}
      />
    </div>
  );
}
