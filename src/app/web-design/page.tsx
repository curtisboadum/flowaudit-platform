import { OfferPage } from "@/components/marketing/offer-page";
import { pageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
export const metadata = pageMetadata(
  "Custom website design",
  "Explore a considered website, a clearer enquiry journey and support requirements. Scope and commercial arrangements are agreed privately.",
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
            "Explore a considered website, a clearer enquiry journey and support requirements. Scope and commercial arrangements are agreed privately.",
          url: canonicalUrl("/web-design"),
          provider: { "@type": "Organization", name: "FlowAudit", url: canonicalUrl("/") },
        }}
      />
    </>
  );
}
