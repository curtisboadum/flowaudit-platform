/**
 * @file revenue-recovery-book-content.tsx
 * @description Client content for the Revenue Recovery booking page. Warm RR
 *   styling (amber accent, serif headline) with a short reassurance list and the
 *   shared Calendly inline widget. Bilingual via the active locale, mirroring the
 *   inline-copy pattern used by revenue-recovery-banner.tsx.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
"use client";

import { Banknote, Check } from "lucide-react";
import { CalendlyEmbed } from "@/components/book/calendly-embed";
import { useLocale } from "@/components/providers/locale-provider";

const CALENDLY_URL = "https://calendly.com/flowaudit-info/30min";

const COPY = {
  en: {
    eyebrow: "Revenue Recovery Desk",
    headline: "Let's recover what's yours",
    subtext:
      "Book a free 30-minute call. We'll show you how the done-for-you Revenue Recovery Desk works, whether it's the right fit for your business, and how fast we can get it running so you start collecting what you're owed. No pressure.",
    points: [
      "See exactly how the done-for-you desk works",
      "Find out if it's the right fit for your business",
      "Leave with a clear plan to start recovering cash",
    ],
  },
  es: {
    eyebrow: "Mesa de Recuperación de Ingresos",
    headline: "Recuperemos lo que es tuyo",
    subtext:
      "Agenda una llamada gratuita de 30 minutos. Te mostramos cómo funciona la Mesa de Recuperación de Ingresos hecha por nosotros, si encaja con tu negocio, y qué tan rápido podemos ponerla en marcha para que empieces a cobrar lo que te deben. Sin presión.",
    points: [
      "Descubre cómo funciona la mesa hecha por nosotros",
      "Confirma si encaja con tu negocio",
      "Termina con un plan claro para empezar a recuperar dinero",
    ],
  },
} as const;

function RevenueRecoveryBookContent() {
  const { locale } = useLocale();
  const c = COPY[locale] ?? COPY.en;

  return (
    <>
      <section className="flex flex-col items-center px-4 pt-8 pb-4 text-center sm:px-6 lg:px-0">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5">
          <Banknote className="h-3.5 w-3.5 text-amber-600" />
          <span className="font-sans text-xs font-medium text-amber-700">{c.eyebrow}</span>
        </div>
        <h1 className="max-w-[600px] font-serif text-3xl leading-[1.1] font-normal text-[#37322F] sm:text-5xl lg:text-6xl">
          {c.headline}
        </h1>
        <p className="mt-6 max-w-[520px] font-sans text-base leading-7 text-[rgba(55,50,47,0.80)] sm:text-lg">
          {c.subtext}
        </p>
        <ul className="mt-6 flex flex-col items-start gap-2 text-left">
          {c.points.map((point) => (
            <li key={point} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <span className="font-sans text-sm leading-6 text-[#605A57] sm:text-base">{point}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-0">
        <div className="mx-auto w-full max-w-[900px] overflow-hidden rounded-2xl border border-amber-200 bg-white">
          <CalendlyEmbed url={CALENDLY_URL} />
        </div>
      </section>
    </>
  );
}

export { RevenueRecoveryBookContent };
