import { OfferPage } from "@/components/marketing/offer-page";
import { pageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
export const metadata = pageMetadata(
  "Custom website design",
  "See a bounded custom website demonstration before payment. Explore the scope, enquiry journey and managed 12-month arrangement.",
  "/web-design",
);
export default function Page() {
  return (
    <>
      <OfferPage service="web-design" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Custom website design",
          description:
            "See a bounded custom website demonstration before payment. Explore the scope, enquiry journey and managed 12-month arrangement.",
          url: canonicalUrl("/web-design"),
          provider: { "@type": "Organization", name: "FlowAudit", url: canonicalUrl("/") },
        }}
      />
    </>
  );
}
