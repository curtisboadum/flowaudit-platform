import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Linkedin } from "lucide-react";

export const metadata: Metadata = {
  title: "About — FlowAudit",
  description:
    "We help operators reclaim time through structured automation. Meet the team behind FlowAudit.",
};

const teamMembers = [
  {
    name: "Curtis Boadum",
    title: "CTO / CEO",
    description: "Systems thinker. Builds the AI infrastructure that powers every FlowAudit assistant.",
    initials: "CB",
    isAI: false,
  },
  {
    name: "Kofi Owusu",
    title: "CEO / COO & Lawyer",
    description: "Operations and legal strategy. Ensures every deployment is compliant and scalable.",
    initials: "KO",
    isAI: false,
  },
  {
    name: "Boadum",
    title: "Sales Advisor",
    description: "Client relationships and growth strategy. Connects operators with the right solutions.",
    initials: "BA",
    isAI: false,
  },
  {
    name: "Casper",
    title: "AI Agent",
    description: "Handles workflow automation, data syncing, and client communication tasks.",
    initials: "C",
    isAI: true,
  },
  {
    name: "Klaus",
    title: "AI Agent",
    description: "Manages reporting, analytics, and operational visibility across client workflows.",
    initials: "K",
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
      "Every feature is designed for people who run real operations — not tech demos.",
  },
  {
    title: "Practical Implementation",
    description:
      "We start with the workflow that saves you the most time, then expand from there.",
  },
  {
    title: "Margin-First Mindset",
    description:
      "Every automation is measured by its impact on your bottom line, not vanity metrics.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full max-w-[1060px]">
        {/* Hero */}
        <section className="pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-0 flex flex-col items-center text-center border-b border-[rgba(55,50,47,0.12)]">
          <h1 className="text-[#37322F] text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] font-serif max-w-[600px]">
            We help operators reclaim time through structured automation
          </h1>
          <p className="text-[rgba(55,50,47,0.80)] text-base sm:text-lg font-sans leading-7 mt-6 max-w-[500px]">
            FlowAudit is the AI assistant layer for teams drowning in repetitive work.
          </p>
        </section>

        {/* Mission */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-0 border-b border-[rgba(55,50,47,0.12)]">
          <div className="max-w-[700px] mx-auto">
            <Badge text="Our Approach" />
            <h2 className="text-[#49423D] text-2xl sm:text-3xl font-semibold font-sans mt-4">
              Systems thinking meets practical automation
            </h2>
            <p className="text-[#605A57] text-base font-sans leading-7 mt-4">
              Most businesses don&apos;t need another SaaS tool. They need someone to look at their
              operations, identify the repetitive bottlenecks, and build solutions that remove them
              permanently. That&apos;s what we do.
            </p>
            <p className="text-[#605A57] text-base font-sans leading-7 mt-4">
              We combine AI engineering with operational understanding to build assistants that
              actually work in real business environments — not just demos.
            </p>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-0 border-b border-[rgba(55,50,47,0.12)]">
          <div className="text-center mb-12">
            <Badge text="Our Team" />
            <h2 className="text-[#49423D] text-2xl sm:text-3xl font-semibold font-sans mt-4">
              Humans + AI, working together
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl border border-[rgba(55,50,47,0.08)] p-6 flex flex-col items-center text-center"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-[#37322F] flex items-center justify-center mb-4">
                    <span className="text-white text-lg font-semibold font-sans">
                      {member.initials}
                    </span>
                  </div>
                  {member.isAI && (
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full">
                      AI
                    </span>
                  )}
                </div>
                <h3 className="text-[#37322F] text-base font-semibold font-sans">{member.name}</h3>
                <p className="text-[#605A57] text-sm font-sans mt-1">{member.title}</p>
                <p className="text-[#605A57] text-xs font-sans leading-5 mt-3">
                  {member.description}
                </p>
                {!member.isAI && (
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-[#605A57] hover:text-[#37322F] transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-0 border-b border-[rgba(55,50,47,0.12)]">
          <div className="text-center mb-12">
            <Badge text="Our Values" />
            <h2 className="text-[#49423D] text-2xl sm:text-3xl font-semibold font-sans mt-4">
              What we believe
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[800px] mx-auto">
            {values.map((value) => (
              <div key={value.title} className="p-6">
                <h3 className="text-[#37322F] text-base font-semibold font-sans">{value.title}</h3>
                <p className="text-[#605A57] text-sm font-sans leading-6 mt-2">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-0 flex flex-col items-center text-center">
          <h2 className="text-[#37322F] text-2xl sm:text-3xl font-normal font-serif">
            Ready to reclaim your time?
          </h2>
          <p className="text-[#605A57] text-sm sm:text-base font-sans mt-4 max-w-[400px]">
            Book a free strategy call and see exactly how AI can cut your operational workload.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link href="/book">Book a Strategy Call</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
