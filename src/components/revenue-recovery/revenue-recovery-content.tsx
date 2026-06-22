/**
 * @file revenue-recovery-content.tsx
 * @description Client renderer for the /revenue-recovery landing page. Reads the
 *   active locale and composes the themed marketing sections (hero, problem,
 *   steps, audience, alignment, FAQ, CTA) in FlowAudit's warm light theme.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
"use client";

import Link from "next/link";
import { ArrowRight, Search, Send, ShieldAlert, FileText, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { useLocale } from "@/components/providers/locale-provider";
import {
  getRevenueRecoveryCopy,
  type RevenueRecoveryCopy,
} from "@/components/revenue-recovery/revenue-recovery-copy";

const STEP_ICONS = [Search, Send, ShieldAlert, FileText];

function RevenueRecoveryContent() {
  const { locale } = useLocale();
  const c = getRevenueRecoveryCopy(locale);

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="relative w-full max-w-[1060px]">
        <div className="absolute top-0 left-0 z-0 hidden h-full w-[1px] bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] lg:block" />
        <div className="absolute top-0 right-0 z-0 hidden h-full w-[1px] bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] lg:block" />

        <HeroBlock c={c} />
        <StatsBar c={c} />
        <ProblemBlock c={c} />
        <StepsBlock c={c} />
        <AudienceBlock c={c} />
        <AlignmentBlock c={c} />
        <FaqBlock c={c} />
        <FinalCtaBlock c={c} />
      </div>
    </div>
  );
}

function HeroBlock({ c }: { c: RevenueRecoveryCopy }) {
  return (
    <section className="flex w-full flex-col items-center px-4 pt-24 pb-12 text-center sm:px-6 sm:pt-32 sm:pb-16 lg:px-0 lg:pt-40">
      <Badge text={c.badge} />
      <h1 className="mt-6 max-w-[820px] font-serif text-4xl leading-[1.05] font-normal text-[#37322F] sm:text-6xl lg:text-7xl">
        {c.headlineTop}{" "}
        <span className="text-amber-600">{c.headlineAccent}</span>
      </h1>
      <p className="mt-6 max-w-[620px] font-sans text-base leading-7 font-medium text-[rgba(55,50,47,0.80)] sm:text-lg">
        {c.subtext}
      </p>
      <div className="mt-9 flex w-full max-w-[400px] flex-col items-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4">
        <Button size="lg" className="w-full sm:w-auto" asChild>
          <Link href="/book">
            {c.ctaPrimary} <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="secondary" size="lg" className="w-full sm:w-auto" asChild>
          <Link href="#how-it-works">{c.ctaSecondary}</Link>
        </Button>
      </div>
    </section>
  );
}

function StatsBar({ c }: { c: RevenueRecoveryCopy }) {
  return (
    <section className="grid w-full grid-cols-1 gap-px border-y border-[rgba(55,50,47,0.12)] bg-[rgba(55,50,47,0.12)] sm:grid-cols-3">
      {c.stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center gap-1 bg-[#F7F5F3] px-6 py-8 text-center"
        >
          <div className="font-serif text-3xl font-normal text-amber-600 sm:text-4xl">
            {stat.value}
          </div>
          <div className="font-sans text-sm text-[#605A57]">{stat.label}</div>
        </div>
      ))}
    </section>
  );
}

function ProblemBlock({ c }: { c: RevenueRecoveryCopy }) {
  return (
    <section className="flex w-full flex-col items-center border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0 lg:py-24">
      <div className="grid w-full max-w-[900px] grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16">
        <div>
          <div className="mb-3 font-sans text-xs font-semibold tracking-wider text-amber-600 uppercase">
            {c.problem.eyebrow}
          </div>
          <h2 className="font-sans text-2xl leading-tight font-semibold tracking-tight text-[#49423D] sm:text-3xl lg:text-4xl">
            {c.problem.headline}
          </h2>
          <p className="mt-5 font-sans text-sm leading-7 text-[#605A57] sm:text-base">
            {c.problem.intro}
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {c.problem.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                <span className="font-sans text-sm leading-6 text-[#37322F]">{b}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-sans text-sm font-semibold text-[#37322F]">
            {c.problem.closing}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 px-8 py-12 text-center">
          <div className="font-serif text-4xl font-normal text-amber-700 sm:text-5xl">
            {c.problem.calloutValue}
          </div>
          <div className="mt-3 max-w-[220px] font-sans text-sm leading-6 text-[#8a6d3b]">
            {c.problem.calloutLabel}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepsBlock({ c }: { c: RevenueRecoveryCopy }) {
  return (
    <section
      id="how-it-works"
      className="flex w-full flex-col items-center border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0 lg:py-24"
    >
      <div className="w-full max-w-[1060px]">
        <SectionHeader eyebrow={c.steps.eyebrow} headline={c.steps.headline} subtext={c.steps.subtext} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {c.steps.items.map((step, index) => {
            const Icon = STEP_ICONS[index] ?? Search;
            return (
              <div
                key={step.number}
                className="flex flex-col rounded-2xl border border-[rgba(55,50,47,0.08)] bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7F5F3]">
                  <Icon className="h-5 w-5 text-amber-600" />
                </div>
                <div className="mb-1 font-sans text-xs font-medium text-[#605A57]">{step.number}</div>
                <h3 className="mb-2 font-sans text-base font-semibold text-[#37322F]">{step.title}</h3>
                <p className="font-sans text-sm leading-6 text-[#605A57]">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AudienceBlock({ c }: { c: RevenueRecoveryCopy }) {
  return (
    <section className="flex w-full flex-col items-center border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0 lg:py-24">
      <div className="w-full max-w-[1060px]">
        <SectionHeader
          eyebrow={c.audience.eyebrow}
          headline={c.audience.headline}
          subtext={c.audience.subtext}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.audience.cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-[rgba(55,50,47,0.08)] bg-white p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="font-sans text-base font-semibold text-[#37322F]">{card.title}</h3>
              <p className="mt-2 font-sans text-sm leading-6 text-[#605A57]">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AlignmentBlock({ c }: { c: RevenueRecoveryCopy }) {
  return (
    <section
      id="pricing"
      className="flex w-full flex-col items-center border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0 lg:py-24"
    >
      <div className="w-full max-w-[760px]">
        <SectionHeader eyebrow={c.alignment.eyebrow} headline={c.alignment.headline} subtext={c.alignment.subtext} />
        <div className="rounded-3xl border border-[rgba(55,50,47,0.08)] bg-white p-8 shadow-sm sm:p-10">
          <div className="flex flex-col gap-6">
            {c.alignment.points.map((point) => (
              <div key={point.title} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100">
                  <Check className="h-4 w-4 text-amber-700" />
                </span>
                <div>
                  <div className="font-sans text-base font-semibold text-[#37322F]">{point.title}</div>
                  <div className="mt-1 font-sans text-sm leading-6 text-[#605A57]">{point.description}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 rounded-xl bg-[#F7F5F3] px-5 py-4 font-sans text-sm leading-6 text-[#49423D]">
            {c.alignment.contrast}
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg" asChild>
              <Link href="/book">
                {c.alignment.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqBlock({ c }: { c: RevenueRecoveryCopy }) {
  const items = c.faq.items.map((item) => ({ question: item.q, answer: item.a }));
  return (
    <section
      id="faq"
      className="flex w-full flex-col items-center border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0 lg:py-24"
    >
      <div className="w-full max-w-[760px]">
        <SectionHeader eyebrow={c.faq.eyebrow} headline={c.faq.headline} />
        <Accordion items={items} />
      </div>
    </section>
  );
}

function FinalCtaBlock({ c }: { c: RevenueRecoveryCopy }) {
  return (
    <section className="flex w-full flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-0">
      <div className="flex w-full max-w-[680px] flex-col items-center">
        <h2 className="font-serif text-3xl leading-tight font-normal text-[#37322F] sm:text-4xl lg:text-5xl">
          {c.finalCta.headline}
        </h2>
        <p className="mt-4 max-w-[520px] font-sans text-sm leading-7 text-[#605A57] sm:text-base">
          {c.finalCta.subtext}
        </p>
        <div className="mt-8">
          <Button size="lg" asChild>
            <Link href="/book">
              {c.finalCta.button} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <p className="mt-4 font-sans text-xs text-[rgba(55,50,47,0.50)]">{c.finalCta.note}</p>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  headline,
  subtext,
}: {
  eyebrow: string;
  headline: string;
  subtext?: string;
}) {
  return (
    <div className="mb-12 flex flex-col items-center gap-3 text-center sm:mb-16">
      <div className="font-sans text-xs font-semibold tracking-wider text-amber-600 uppercase">
        {eyebrow}
      </div>
      <h2 className="max-w-[640px] font-sans text-2xl leading-tight font-semibold tracking-tight text-[#49423D] sm:text-3xl lg:text-4xl">
        {headline}
      </h2>
      {subtext && (
        <p className="max-w-[540px] font-sans text-sm leading-7 text-[#605A57] sm:text-base">
          {subtext}
        </p>
      )}
    </div>
  );
}

export { RevenueRecoveryContent };
