import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumbs";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CalendlyEmbed } from "@/components/book/calendly-embed";

export const metadata: Metadata = {
  title: "Book a Call — FlowAudit",
  description:
    "Book a free 30-minute strategy call. See how automation can cut your admin workload — quoting, invoicing, follow-ups, all handled.",
  alternates: {
    canonical: "/book",
  },
};

export default function BookPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full max-w-[1060px]">
        <div className="px-4 pt-24 sm:px-6 sm:pt-28 lg:px-0 lg:pt-32">
          <Breadcrumbs items={[{ name: "Book a Call", href: "/book" }]} />
        </div>

        <section className="flex flex-col items-center px-4 pt-8 pb-4 text-center sm:px-6 lg:px-0">
          <h1 className="max-w-[600px] font-serif text-3xl leading-[1.1] font-normal text-[#37322F] sm:text-5xl lg:text-6xl">
            Book a Free Strategy Call
          </h1>
          <p className="mt-6 max-w-[500px] font-sans text-base leading-7 text-[rgba(55,50,47,0.80)] sm:text-lg">
            See how automation can handle your admin. 30 minutes. No jargon. No pressure.
          </p>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-0">
          <div className="mx-auto w-full max-w-[900px] overflow-hidden rounded-2xl border border-[rgba(55,50,47,0.08)] bg-white">
            <CalendlyEmbed url="https://calendly.com/daniels-flowaudit/30min" />
          </div>
        </section>
      </div>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: canonicalUrl("/") },
          { name: "Book a Call", url: canonicalUrl("/book") },
        ])}
      />
    </div>
  );
}
