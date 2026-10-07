"use client";

/**
 * @file phone-agent-content.tsx
 * @description AI Phone Agent offer page for dental practices. Hero, the missed-
 *   call leak, what the agent handles, the demo call video, setup steps,
 *   guardrails, audience, FAQ, and the closing booking CTA.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/providers/locale-provider";
import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  CalendarClock,
  ChevronDown,
  MessageSquare,
  PhoneCall,
  Rocket,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  X,
} from "lucide-react";

const handleIcons: LucideIcon[] = [
  PhoneCall,
  UserCheck,
  ShieldCheck,
  CalendarCheck,
  MessageSquare,
  Users,
];

const stepIcons: LucideIcon[] = [Search, Settings, CalendarClock, Rocket];

function PhoneAgentContent() {
  const { t } = useLocale();
  const pa = t.phoneAgent;

  return (
    <>
      {/* Hero */}
      <section className="flex flex-col items-center px-4 pt-8 pb-16 text-center sm:px-6 sm:pb-20 lg:px-0">
        <Badge
          icon={<PhoneCall className="h-3.5 w-3.5 text-emerald-600" />}
          text={pa.hero.badge}
        />
        <h1 className="mt-6 max-w-[760px] font-serif text-3xl leading-[1.1] font-normal text-[#37322F] sm:text-5xl lg:text-6xl">
          {pa.hero.headline}
        </h1>
        <p className="mt-6 max-w-[620px] font-sans text-base leading-7 text-[rgba(55,50,47,0.80)] sm:text-lg">
          {pa.hero.subtext}
        </p>
        <div className="mt-8 flex w-full max-w-[420px] flex-col items-center gap-3 sm:mt-10 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link href="#demo">{pa.hero.ctaPrimary}</Link>
          </Button>
          <Button variant="secondary" size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/book">{pa.hero.ctaSecondary}</Link>
          </Button>
        </div>
        <p className="mt-4 font-sans text-xs text-[rgba(55,50,47,0.50)]">{pa.hero.note}</p>
      </section>

      {/* The leak */}
      <section className="border-t border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0">
        <div className="mb-12 flex flex-col items-center gap-4">
          <Badge
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12" stroke="#37322F" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M4 4l3 3-3 3" stroke="#37322F" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            }
            text={pa.leak.badge}
          />
          <h2 className="text-center font-sans text-2xl leading-tight font-semibold tracking-tight text-[#49423D] sm:text-3xl lg:text-5xl">
            {pa.leak.headline}
          </h2>
          <p className="max-w-[520px] text-center font-sans text-sm leading-7 text-[#605A57] sm:text-base">
            {pa.leak.subtext}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pa.leak.moments.map((moment, i) => (
            <div
              key={moment.title}
              className="rounded-2xl border border-[rgba(55,50,47,0.08)] bg-white p-6 sm:p-8"
            >
              <div className="mb-3 font-sans text-xs font-semibold text-emerald-600">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-sans text-base font-semibold text-[#37322F] sm:text-lg">
                {moment.title}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-[#605A57]">{moment.desc}</p>
            </div>
          ))}
        </div>
        <figure className="mx-auto mt-10 max-w-[760px] rounded-2xl bg-[#37322F] p-6 text-center sm:p-8">
          <blockquote className="font-serif text-lg leading-relaxed font-normal text-white sm:text-xl">
            {pa.leak.stat}
          </blockquote>
          <figcaption className="mt-3 font-sans text-xs text-[rgba(255,255,255,0.55)]">
            {pa.leak.statSource}
          </figcaption>
        </figure>
      </section>

      {/* What it handles */}
      <section className="border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0">
        <div className="mb-12 flex flex-col items-center gap-4">
          <Badge
            icon={<Sparkles className="h-3.5 w-3.5 text-emerald-600" />}
            text={pa.handles.badge}
          />
          <h2 className="text-center font-sans text-2xl leading-tight font-semibold tracking-tight text-[#49423D] sm:text-3xl lg:text-5xl">
            {pa.handles.headline}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pa.handles.items.map((item, i) => {
            const Icon = handleIcons[i] as LucideIcon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-[rgba(55,50,47,0.08)] bg-white p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0EDEB]">
                  <Icon className="h-5 w-5 text-[#37322F]" />
                </div>
                <h3 className="font-sans text-sm font-semibold text-[#37322F]">{item.title}</h3>
                <p className="mt-2 font-sans text-xs leading-5 text-[#605A57]">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Demo */}
      <section
        id="demo"
        className="border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0"
      >
        <div className="mb-10 flex flex-col items-center gap-4">
          <Badge
            icon={<PhoneCall className="h-3.5 w-3.5 text-emerald-600" />}
            text={pa.demo.badge}
          />
          <h2 className="text-center font-sans text-2xl leading-tight font-semibold tracking-tight text-[#49423D] sm:text-3xl lg:text-5xl">
            {pa.demo.headline}
          </h2>
          <p className="max-w-[560px] text-center font-sans text-sm leading-7 text-[#605A57] sm:text-base">
            {pa.demo.subtext}
          </p>
        </div>
        <div className="mx-auto w-full max-w-[900px] overflow-hidden rounded-2xl border border-[rgba(55,50,47,0.08)] bg-black">
          <video
            className="h-auto w-full"
            width={1920}
            height={1038}
            controls
            playsInline
            preload="metadata"
            poster="/assets/phone-agent/phone-agent-demo-poster.jpg"
          >
            <source src="/assets/phone-agent/phone-agent-demo.mp4" type="video/mp4" />
            <track
              kind="captions"
              src="/assets/phone-agent/phone-agent-demo.en.vtt"
              srcLang="en"
              label="English"
              default
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="mt-4 text-center font-sans text-xs text-[rgba(55,50,47,0.50)]">
          {pa.demo.note}
        </p>
      </section>

      {/* How it works */}
      <section className="border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0">
        <div className="mb-12 flex flex-col items-center gap-4">
          <h2 className="text-center font-sans text-2xl leading-tight font-semibold tracking-tight text-[#49423D] sm:text-3xl">
            {pa.how.headline}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pa.how.steps.map((step, i) => {
            const Icon = stepIcons[i] as LucideIcon;
            return (
              <div key={step.title} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0EDEB]">
                  <Icon className="h-5 w-5 text-[#37322F]" />
                </div>
                <div className="mb-1 font-sans text-xs font-semibold text-emerald-600">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-sans text-sm font-semibold text-[#37322F]">{step.title}</h3>
                <p className="mt-2 max-w-[240px] font-sans text-xs leading-5 text-[#605A57]">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Guardrails */}
      <section className="border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0">
        <div className="mx-auto max-w-[760px] rounded-2xl border border-[rgba(55,50,47,0.08)] bg-white p-6 sm:p-10">
          <div className="mb-6 flex flex-col items-center gap-3 text-center">
            <Badge
              icon={<ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />}
              text={pa.guardrails.badge}
            />
            <h2 className="font-sans text-2xl leading-tight font-semibold tracking-tight text-[#49423D] sm:text-3xl">
              {pa.guardrails.headline}
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {pa.guardrails.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#F0EDEB]">
                  <X className="h-2.5 w-2.5 text-[#37322F]" />
                </span>
                <span className="font-sans text-sm leading-relaxed text-[#605A57]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Audience */}
      <section className="border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0">
        <div className="mb-12 flex flex-col items-center gap-4">
          <Badge
            icon={<Users className="h-3.5 w-3.5 text-emerald-600" />}
            text={pa.audience.badge}
          />
          <h2 className="text-center font-sans text-2xl leading-tight font-semibold tracking-tight text-[#49423D] sm:text-3xl lg:text-5xl">
            {pa.audience.headline}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pa.audience.items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[rgba(55,50,47,0.08)] bg-white p-6 sm:p-8"
            >
              <h3 className="font-sans text-base font-semibold text-[#37322F] sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-[#605A57]">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center font-sans text-xs text-[rgba(55,50,47,0.50)]">
          {pa.audience.markets}
        </p>
      </section>

      {/* FAQ */}
      <section className="border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0">
        <h2 className="mb-10 text-center font-sans text-2xl font-semibold text-[#49423D] sm:text-3xl">
          FAQ
        </h2>
        <div className="mx-auto max-w-[700px] space-y-3">
          {pa.faqItems.map((faq) => (
            <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-0">
        <h2 className="max-w-[560px] font-serif text-2xl leading-tight font-normal text-[#37322F] sm:text-4xl">
          {pa.cta.headline}
        </h2>
        <p className="mt-4 max-w-[480px] font-sans text-sm leading-7 text-[#605A57] sm:text-base">
          {pa.cta.subtext}
        </p>
        <Button size="lg" className="mt-8" asChild>
          <Link href="/book">{pa.cta.button}</Link>
        </Button>
        <p className="mt-4 font-sans text-xs text-[rgba(55,50,47,0.50)]">{pa.cta.note}</p>
      </section>
    </>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-[rgba(55,50,47,0.08)] bg-white">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
        aria-expanded={open}
      >
        <span className="font-sans text-sm font-medium text-[#37322F]">{question}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#605A57] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="font-sans text-sm leading-relaxed text-[#605A57]">{answer}</p>
        </div>
      )}
    </div>
  );
}

export { PhoneAgentContent };
