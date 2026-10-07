/**
 * @file book-content.tsx
 * @description Booking page content. Renders the cal.com inline booking
 *   calendar (Cal Video link on confirmation) with an email fallback.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { CalEmbed } from "@/components/booking/cal-embed";
import { CalendarCheck, Mail } from "lucide-react";

function BookContent() {
  const { t } = useLocale();

  const steps = [
    { title: t.book.step1Title, desc: t.book.step1Desc },
    { title: t.book.step2Title, desc: t.book.step2Desc },
    { title: t.book.step3Title, desc: t.book.step3Desc },
  ];

  return (
    <>
      <section className="flex flex-col items-center px-4 pt-8 pb-4 text-center sm:px-6 lg:px-0">
        <h1 className="max-w-[600px] font-serif text-3xl leading-[1.1] font-normal text-[#37322F] sm:text-5xl lg:text-6xl">
          {t.book.headline}
        </h1>
        <p className="mt-6 max-w-[520px] font-sans text-base leading-7 text-[rgba(55,50,47,0.80)] sm:text-lg">
          {t.book.subtext}
        </p>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-0">
        <div className="mx-auto w-full max-w-[720px] rounded-2xl border border-[rgba(55,50,47,0.08)] bg-white p-6 text-center sm:p-10">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0EDEB]">
            <CalendarCheck className="h-5 w-5 text-[#37322F]" />
          </div>
          <h2 className="font-sans text-xl font-semibold text-[#37322F] sm:text-2xl">
            {t.book.scheduleTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-[480px] font-sans text-sm leading-7 text-[#605A57]">
            {t.book.scheduleSubtext}
          </p>
          <div className="mt-6 text-left">
            <CalEmbed />
          </div>
          <div className="mt-6 flex flex-col items-center justify-center">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto" asChild>
              <a href="mailto:support@flowaudit.co.uk">
                <Mail className="mr-2 h-4 w-4" />
                {t.book.emailButton}
              </a>
            </Button>
          </div>
          <p className="mt-4 font-sans text-xs text-[rgba(55,50,47,0.50)]">{t.book.responseNote}</p>
        </div>

        <div className="mx-auto mt-14 w-full max-w-[860px]">
          <h3 className="text-center font-sans text-sm font-semibold text-[#37322F]">
            {t.book.expectTitle}
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="mb-2 font-sans text-xs font-semibold text-emerald-600">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h4 className="font-sans text-sm font-semibold text-[#37322F]">{step.title}</h4>
                <p className="mt-2 font-sans text-xs leading-5 text-[#605A57]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export { BookContent };
