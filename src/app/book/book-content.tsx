"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { CalendlyEmbed } from "@/components/book/calendly-embed";

function BookContent() {
  const { t } = useLocale();

  return (
    <>
      <section className="flex flex-col items-center px-4 pt-8 pb-4 text-center sm:px-6 lg:px-0">
        <h1 className="max-w-[600px] font-serif text-3xl leading-[1.1] font-normal text-[#37322F] sm:text-5xl lg:text-6xl">
          {t.book.headline}
        </h1>
        <p className="mt-6 max-w-[500px] font-sans text-base leading-7 text-[rgba(55,50,47,0.80)] sm:text-lg">
          {t.book.subtext}
        </p>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-0">
        <div className="mx-auto w-full max-w-[900px] overflow-hidden rounded-2xl border border-[rgba(55,50,47,0.08)] bg-white">
          <CalendlyEmbed url="https://calendly.com/daniels-flowaudit/30min" />
        </div>
      </section>
    </>
  );
}

export { BookContent };
