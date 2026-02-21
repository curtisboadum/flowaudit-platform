import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumbs";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WebDesignContent } from "./web-design-content";

export const metadata: Metadata = {
  title: "Custom Websites & AI Tools — FlowAudit",
  description:
    "Custom-designed websites and AI-powered business tools. Website, chatbot, booking, invoicing — everything your business needs online. From £149/mo.",
  alternates: { canonical: "/web-design" },
  openGraph: {
    title: "Custom Websites & AI Tools — FlowAudit",
    description:
      "Custom-designed websites and AI-powered business tools for your business. From £149/mo.",
    type: "website",
    url: "https://flowaudit.co.uk/web-design",
  },
};

export default function WebDesignPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full max-w-[1060px]">
        <div className="px-4 pt-24 sm:px-6 sm:pt-28 lg:px-0 lg:pt-32">
          <Breadcrumbs items={[{ name: "Web Design", href: "/web-design" }]} />
        </div>
        <WebDesignContent />
      </div>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: canonicalUrl("/") },
          { name: "Web Design", url: canonicalUrl("/web-design") },
        ])}
      />
    </div>
  );
}
