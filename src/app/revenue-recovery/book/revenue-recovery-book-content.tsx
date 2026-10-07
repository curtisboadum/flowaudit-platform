/**
 * @file revenue-recovery-book-content.tsx
 * @description Client content for the Revenue Recovery booking page. Warm RR
 *   styling (amber accent, serif headline) with a short reassurance list and a
 *   link to the Google Calendar appointment schedule (Google Meet on booking).
 * @status Stable.
 * @issues None.
 * @todo None.
 */
"use client";

import { Banknote, CalendarCheck, Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/providers/locale-provider";
import { BOOKING_URL } from "@/lib/booking";

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
        <div className="mx-auto w-full max-w-[720px] rounded-2xl border border-amber-200 bg-white p-6 text-center sm:p-10">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
            <CalendarCheck className="h-5 w-5 text-amber-600" />
          </div>
          <h2 className="font-sans text-xl font-semibold text-[#37322F] sm:text-2xl">
            {locale === "es" ? "Elige un horario" : "Pick a time"}
          </h2>
          <p className="mx-auto mt-3 max-w-[460px] font-sans text-sm leading-7 text-[#605A57]">
            {locale === "es"
              ? "Reserva un hueco en el calendario. Tu confirmación incluye un enlace de Google Meet. ¿Prefieres email? Escribe a support@flowaudit.co.uk."
              : "Choose a slot on the calendar. Your confirmation includes a Google Meet link. Prefer email? Write to support@flowaudit.co.uk."}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                {locale === "es" ? "Elige un horario" : "Pick a time"}
              </a>
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto" asChild>
              <a href="mailto:support@flowaudit.co.uk">
                <Mail className="mr-2 h-4 w-4" />
                {locale === "es" ? "Escribir por email" : "Email us instead"}
              </a>
            </Button>
          </div>
          <p className="mt-4 font-sans text-xs text-[rgba(55,50,47,0.50)]">
            {locale === "es"
              ? "Tu confirmación de reserva incluye un enlace de Google Meet."
              : "Your booking confirmation includes a Google Meet link."}
          </p>
        </div>
      </section>
    </>
  );
}

export { RevenueRecoveryBookContent };
