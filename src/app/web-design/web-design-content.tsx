"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/components/providers/locale-provider";
import type { LucideIcon } from "lucide-react";
import {
  Globe,
  MessageSquare,
  Moon,
  PhoneMissed,
  Calendar,
  FileText,
  ClipboardList,
  Star,
  Search,
  Code,
  CheckCircle,
  Headphones,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const productIcons: LucideIcon[] = [Globe, MessageSquare, Moon, PhoneMissed, Calendar, FileText, ClipboardList, Star];

function WebDesignContent() {
  const { t } = useLocale();
  const wd = t.webDesign;

  const products = [
    { name: wd.product1, price: wd.product1Price, desc: wd.product1Desc },
    { name: wd.product2, price: wd.product2Price, desc: wd.product2Desc },
    { name: wd.product3, price: wd.product3Price, desc: wd.product3Desc },
    { name: wd.product4, price: wd.product4Price, desc: wd.product4Desc },
    { name: wd.product5, price: wd.product5Price, desc: wd.product5Desc },
    { name: wd.product6, price: wd.product6Price, desc: wd.product6Desc },
    { name: wd.product7, price: wd.product7Price, desc: wd.product7Desc },
    { name: wd.product8, price: wd.product8Price, desc: wd.product8Desc },
  ];

  const steps: { icon: LucideIcon; title: string; desc: string }[] = [
    { icon: Search, title: wd.step1Title, desc: wd.step1Desc },
    { icon: Code, title: wd.step2Title, desc: wd.step2Desc },
    { icon: CheckCircle, title: wd.step3Title, desc: wd.step3Desc },
    { icon: Headphones, title: wd.step4Title, desc: wd.step4Desc },
  ];

  const whyUs = [
    { title: wd.why1Title, desc: wd.why1Desc },
    { title: wd.why2Title, desc: wd.why2Desc },
    { title: wd.why3Title, desc: wd.why3Desc },
    { title: wd.why4Title, desc: wd.why4Desc },
  ];

  const faqs = [
    { q: wd.faq1Q, a: wd.faq1A },
    { q: wd.faq2Q, a: wd.faq2A },
    { q: wd.faq3Q, a: wd.faq3A },
    { q: wd.faq4Q, a: wd.faq4A },
    { q: wd.faq5Q, a: wd.faq5A },
    { q: wd.faq6Q, a: wd.faq6A },
  ];

  return (
    <>
      {/* Hero */}
      <section className="flex flex-col items-center px-4 pt-8 pb-16 text-center sm:px-6 sm:pb-20 lg:px-0">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(55,50,47,0.12)] bg-white px-4 py-1.5">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
          <span className="font-sans text-xs font-medium text-[#605A57]">{wd.heroNote}</span>
        </div>
        <h1 className="max-w-[700px] font-serif text-3xl leading-[1.1] font-normal text-[#37322F] sm:text-5xl lg:text-6xl">
          {wd.heroHeadline}
        </h1>
        <p className="mt-6 max-w-[560px] font-sans text-base leading-7 text-[rgba(55,50,47,0.80)] sm:text-lg">
          {wd.heroSubtext}
        </p>
        <div className="mt-8 flex w-full max-w-[400px] flex-col items-center gap-3 sm:mt-10 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/book">{wd.heroCta}</Link>
          </Button>
          <Button variant="secondary" size="lg" className="w-full sm:w-auto" asChild>
            <Link href="#products">{wd.heroCtaSecondary}</Link>
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0">
        <div className="mb-12 flex flex-col items-center gap-4">
          <Badge
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7h12" stroke="#37322F" strokeWidth="1.2" />
              </svg>
            }
            text={wd.howItWorksTitle}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center">
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

      {/* Products & Pricing */}
      <section
        id="products"
        className="border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0"
      >
        <div className="mb-12 flex flex-col items-center gap-4">
          <Badge
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="12" height="12" rx="2" stroke="#37322F" strokeWidth="1" fill="none" />
                <path d="M4 7h6M7 4v6" stroke="#37322F" strokeWidth="1" />
              </svg>
            }
            text={wd.productsTitle}
          />
          <p className="max-w-[500px] text-center font-sans text-sm leading-7 text-[#605A57] sm:text-base">
            {wd.productsSubtext}
          </p>
        </div>

        {/* Everything card */}
        <div className="mx-auto mb-8 max-w-[400px] rounded-2xl bg-[#37322F] p-6 text-center text-white shadow-[0px_4px_16px_rgba(55,50,47,0.2)] sm:p-8">
          <div className="mb-1 font-sans text-sm font-semibold text-emerald-400">
            {wd.everythingLabel}
          </div>
          <div className="font-sans text-4xl font-semibold sm:text-5xl">{wd.everythingPrice}</div>
          <div className="mt-2 font-sans text-sm text-[rgba(255,255,255,0.6)]">
            {wd.everythingDesc}
          </div>
          <Button variant="secondary" className="mt-6 bg-white text-[#37322F] hover:bg-[#F7F5F3]" asChild>
            <Link href="/book">{wd.heroCta}</Link>
          </Button>
        </div>

        {/* Individual products grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => {
            const Icon = productIcons[i] as LucideIcon;
            return (
              <div
                key={i}
                className="flex flex-col rounded-2xl border border-[rgba(55,50,47,0.08)] bg-white p-5 sm:p-6"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0EDEB]">
                  <Icon className="h-5 w-5 text-[#37322F]" />
                </div>
                <h3 className="font-sans text-sm font-semibold text-[#37322F]">{product.name}</h3>
                <div className="mt-1 font-sans text-xl font-semibold text-[#37322F]">
                  {product.price}
                </div>
                <p className="mt-2 flex-1 font-sans text-xs leading-5 text-[#605A57]">
                  {product.desc}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center font-sans text-xs text-[#605A57]">{wd.priceNote}</p>
      </section>

      {/* Why Us */}
      <section className="border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0">
        <div className="mb-12 flex flex-col items-center gap-4">
          <h2 className="text-center font-sans text-2xl leading-tight font-semibold tracking-tight text-[#49423D] sm:text-3xl">
            {wd.whyUsTitle}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {whyUs.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[rgba(55,50,47,0.08)] bg-white p-6 sm:p-8"
            >
              <h3 className="font-sans text-base font-semibold text-[#37322F] sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-[#605A57]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0">
        <h2 className="mb-10 text-center font-sans text-2xl font-semibold text-[#49423D] sm:text-3xl">
          FAQ
        </h2>
        <div className="mx-auto max-w-[700px] space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-0">
        <h2 className="max-w-[500px] font-serif text-2xl leading-tight font-normal text-[#37322F] sm:text-4xl">
          {wd.ctaHeadline}
        </h2>
        <p className="mt-4 max-w-[440px] font-sans text-sm leading-7 text-[#605A57] sm:text-base">
          {wd.ctaSubtext}
        </p>
        <Button size="lg" className="mt-8" asChild>
          <Link href="/book">{wd.ctaButton}</Link>
        </Button>
      </section>
    </>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-[rgba(55,50,47,0.08)] bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-sans text-sm font-semibold text-[#37322F]">{question}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#605A57] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-[rgba(55,50,47,0.06)] px-5 pb-4 pt-3">
          <p className="font-sans text-sm leading-relaxed text-[#605A57]">{answer}</p>
        </div>
      )}
    </div>
  );
}

export { WebDesignContent };
