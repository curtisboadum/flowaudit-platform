import { OfferPage } from "@/components/marketing/offer-page";
import { pageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
export const metadata = pageMetadata(
  "AI receptionist for dental practices",
  "Watch the five-minute dental AI phone-agent walkthrough. Review booking evidence, setup requirements and investment, then book a 15-minute demo and fit assessment.",
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
          name: "FlowAudit dental phone-agent walkthrough",
          description:
            "A recorded Google Calendar appointment-booking demonstration, implementation requirements and the next step for dental practices.",
          thumbnailUrl: canonicalUrl("/media/main.jpg"),
          contentUrl: canonicalUrl("/media/main.mp4"),
          uploadDate: "2026-10-09T03:36:53+01:00",
          duration: "PT5M",
          inLanguage: "en",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "AI receptionist for dental practices",
          description:
            "Watch the five-minute dental AI phone-agent walkthrough. Review booking evidence, setup requirements and investment, then book a 15-minute demo and fit assessment.",
          url: canonicalUrl("/phone-agent"),
          provider: { "@type": "Organization", name: "FlowAudit", url: canonicalUrl("/") },
        }}
      />
    </>
  );
}
