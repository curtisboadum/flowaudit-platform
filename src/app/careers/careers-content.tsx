"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import { Rocket, Shield, Lightbulb, MapPin, Mail, Share2 } from "lucide-react";

const valueIcons: LucideIcon[] = [Rocket, Shield, Lightbulb, MapPin];

function CareersContent() {
  const { t } = useLocale();
  const c = t.careers;

  const values = [
    { icon: valueIcons[0] as LucideIcon, title: c.value1Title, desc: c.value1Desc },
    { icon: valueIcons[1] as LucideIcon, title: c.value2Title, desc: c.value2Desc },
    { icon: valueIcons[2] as LucideIcon, title: c.value3Title, desc: c.value3Desc },
    { icon: valueIcons[3] as LucideIcon, title: c.value4Title, desc: c.value4Desc },
  ];

  return (
    <>
      {/* Hero */}
      <section className="flex flex-col items-center px-4 pt-8 pb-16 text-center sm:px-6 sm:pb-20 lg:px-0">
        <h1 className="max-w-[600px] font-serif text-3xl leading-[1.1] font-normal text-[#37322F] sm:text-5xl lg:text-6xl">
          {c.headline}
        </h1>
        <p className="mt-6 max-w-[500px] font-sans text-base leading-7 text-[rgba(55,50,47,0.80)] sm:text-lg">
          {c.subtext}
        </p>
      </section>

      {/* Values */}
      <section className="border-t border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0">
        <h2 className="mb-10 text-center font-sans text-2xl font-semibold text-[#49423D] sm:text-3xl">
          {c.valuesTitle}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border border-[rgba(55,50,47,0.08)] bg-white p-6 sm:p-8"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0EDEB]">
                  <Icon className="h-5 w-5 text-[#37322F]" />
                </div>
                <h3 className="font-sans text-base font-semibold text-[#37322F] sm:text-lg">
                  {value.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-[#605A57]">
                  {value.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Open Positions */}
      <section className="border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0">
        <h2 className="mb-10 text-center font-sans text-2xl font-semibold text-[#49423D] sm:text-3xl">
          {c.openingsTitle}
        </h2>
        <div className="mx-auto max-w-[600px]">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-[rgba(55,50,47,0.08)] bg-white p-8 text-center sm:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0EDEB]">
              <Mail className="h-7 w-7 text-[#37322F]" />
            </div>
            <p className="max-w-[400px] font-sans text-sm leading-relaxed text-[#605A57]">
              {c.noOpenings}
            </p>
            <Button asChild>
              <a href="mailto:hello@flowaudit.co?subject=Career%20Enquiry">
                <Mail className="mr-2 h-4 w-4" />
                {c.sendCv}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Share CTA */}
      <section className="flex flex-col items-center px-4 py-12 text-center sm:px-6 lg:px-0">
        <Share2 className="mb-4 h-6 w-6 text-[#605A57]" />
        <h3 className="font-sans text-lg font-semibold text-[#37322F]">{c.ctaHeadline}</h3>
        <p className="mt-2 font-sans text-sm text-[#605A57]">{c.ctaSubtext}</p>
      </section>
    </>
  );
}

export { CareersContent };
