import { OfferPage } from "@/components/marketing/offer-page";
import { pageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
export const metadata = pageMetadata(
  "Operations automation",
  "Explore clearly scoped automation for enquiries, administration and follow-up, built around supported system access and your team.",
  "/solutions",
);
export default function Page() {
  return (
    <>
      <OfferPage service="automation" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Operations automation",
          description:
            "Explore clearly scoped automation for enquiries, administration and follow-up, built around supported system access and your team.",
          url: canonicalUrl("/solutions"),
          provider: { "@type": "Organization", name: "FlowAudit", url: canonicalUrl("/") },
        }}
      />
    </>
  );
}
