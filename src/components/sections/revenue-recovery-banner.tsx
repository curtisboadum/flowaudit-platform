/**
 * @file revenue-recovery-banner.tsx
 * @description Homepage callout that surfaces the Revenue Recovery Desk offer and
 *   links through to the dedicated /revenue-recovery landing page. Bilingual via
 *   the active locale; styled with FlowAudit's warm theme + amber accent.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
"use client";

import Link from "next/link";
import { ArrowRight, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/providers/locale-provider";

const COPY = {
  en: {
    eyebrow: "New: Revenue Recovery Desk",
    headline: "Unpaid invoices piling up? We'll collect them for you.",
    subtext:
      "A done-for-you desk that chases overdue invoices automatically, escalates disputes carefully, and reports recovered cash every week, without you lifting a finger.",
    button: "See Revenue Recovery",
  },
  es: {
    eyebrow: "Nuevo: Mesa de Recuperación de Ingresos",
    headline: "¿Facturas sin pagar acumulándose? Las cobramos por ti.",
    subtext:
      "Una mesa hecha por nosotros que persigue facturas vencidas automáticamente, escala disputas con cuidado y reporta el dinero recuperado cada semana, sin que muevas un dedo.",
    button: "Ver Recuperación de Ingresos",
  },
} as const;

function RevenueRecoveryBanner() {
  const { locale } = useLocale();
  const c = COPY[locale] ?? COPY.en;

  return (
    <section className="flex w-full flex-col items-center px-4 py-12 sm:px-6 sm:py-16 lg:px-0">
      <div className="relative w-full max-w-[1000px] overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-[#F7F5F3] px-6 py-10 sm:px-12 sm:py-12">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-[620px]">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-3 py-1.5">
              <Banknote className="h-3.5 w-3.5 text-amber-600" />
              <span className="font-sans text-xs font-medium text-amber-700">{c.eyebrow}</span>
            </div>
            <h2 className="font-sans text-2xl leading-tight font-semibold tracking-tight text-[#37322F] sm:text-3xl">
              {c.headline}
            </h2>
            <p className="mt-3 font-sans text-sm leading-7 text-[#605A57] sm:text-base">
              {c.subtext}
            </p>
          </div>
          <Button size="lg" className="w-full shrink-0 sm:w-auto" asChild>
            <Link href="/revenue-recovery">
              {c.button} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export { RevenueRecoveryBanner };
