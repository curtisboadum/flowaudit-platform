import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumbs";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BookContent } from "./book-content";

export const metadata: Metadata = {
  title: "Book a Call — FlowAudit",
  description:
    "Book a free 30-minute strategy call. See how automation can cut your admin workload — quoting, invoicing, follow-ups, all handled.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full max-w-[1060px]">
        <div className="px-4 pt-24 sm:px-6 sm:pt-28 lg:px-0 lg:pt-32">
          <Breadcrumbs items={[{ name: "Book a Call", href: "/book" }]} />
        </div>
        <BookContent />
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
