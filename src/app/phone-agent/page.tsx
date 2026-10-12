import filmMetadata from "@/lib/film-metadata.json";
import { OfferPage } from "@/components/marketing/offer-page";
import { pageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
export const metadata = pageMetadata(
  "AI receptionist for dental practices",
  "Watch the dental AI phone-agent overview. Review booking evidence, setup requirements and investment, then book a 15-minute demo and fit assessment.",
  "/phone-agent",
);
export default function Page() {
  return (
    <>
      <OfferPage service="phone-agent" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: "FlowAudit dental phone-agent overview",
          description:
            "The offer, separate booking recording, evidence limits, implementation requirements and next step for dental practices.",
          thumbnailUrl: canonicalUrl("/media/overview.jpg"),
          contentUrl: canonicalUrl("/media/overview.mp4"),
          uploadDate: "2026-10-12T00:00:00Z",
          duration: `PT${filmMetadata.duration}S`,
          inLanguage: "en",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "AI receptionist for dental practices",
          description:
            "Watch the dental AI phone-agent overview. Review booking evidence, setup requirements and investment, then book a 15-minute demo and fit assessment.",
          url: canonicalUrl("/phone-agent"),
          provider: { "@type": "Organization", name: "FlowAudit", url: canonicalUrl("/") },
        }}
      />
    </>
  );
}
