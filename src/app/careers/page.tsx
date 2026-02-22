import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumbs";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CareersContent } from "./careers-content";

export const metadata: Metadata = {
  title: "Careers | FlowAudit",
  description:
    "Join the FlowAudit team. We're building AI-powered business tools that save businesses thousands of hours. Remote-first, founder-mentality.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full max-w-[1060px]">
        <div className="px-4 pt-24 sm:px-6 sm:pt-28 lg:px-0 lg:pt-32">
          <Breadcrumbs items={[{ name: "Careers", href: "/careers" }]} />
        </div>
        <CareersContent />
      </div>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: canonicalUrl("/") },
          { name: "Careers", url: canonicalUrl("/careers") },
        ])}
      />
    </div>
  );
}
