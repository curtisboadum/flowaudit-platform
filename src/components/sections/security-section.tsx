"use client";

import { Shield, Lock, Eye, Database, User, type LucideIcon } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";

const icons: LucideIcon[] = [Lock, Shield, Eye, Database, User];

function SecuritySection() {
  const { t } = useLocale();
  return (
    <section
      id="security"
      className="flex w-full flex-col items-center border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0 lg:py-24"
    >
      <div className="w-full max-w-[800px]">
        <div className="rounded-2xl border border-[rgba(55,50,47,0.08)] bg-white p-8 sm:p-10 lg:p-12">
          <h2 className="mb-2 text-center font-sans text-2xl font-semibold text-[#49423D] sm:text-3xl">
            {t.security.headline}
          </h2>
          <p className="mb-8 text-center font-sans text-sm text-[#605A57]">
            {t.security.subtext}
          </p>

          <div className="space-y-5">
            {t.security.items.map((item, index) => {
              const Icon = icons[index]!;
              return (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F0EDEB]">
                    <Icon className="h-5 w-5 text-[#37322F]" />
                  </div>
                  <div>
                    <div className="font-sans text-sm font-semibold text-[#37322F]">
                      {item.title}
                    </div>
                    <div className="mt-0.5 font-sans text-sm leading-relaxed text-[#605A57]">
                      {item.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export { SecuritySection };
