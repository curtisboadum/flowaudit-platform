import { OfferPage } from "@/components/marketing/offer-page";
import { pageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
export const metadata = pageMetadata(
  "AI receptionist for dental practices",
  "Hear a recorded dental booking call. Review the enquiry, appointment choices and demonstrated Google Calendar booking, then discuss your practice’s requirements.",
  "/industries/dental",
);
export default function Page() {
  return (
    <>
      <OfferPage service="phone-agent" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: "FlowAudit dental booking demonstration",
          description:
            "A recorded new-patient enquiry, appointment choices and a Google Calendar booking. Includes privacy edits; this is a demonstration, not customer evidence.",
          thumbnailUrl: canonicalUrl("/media/routine.jpg"),
          contentUrl: canonicalUrl("/media/routine.mp4"),
          uploadDate: "2026-10-09T00:00:00Z",
          duration: "PT90.833333S",
          inLanguage: "en",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "AI receptionist for dental practices",
          description:
            "Hear a recorded dental booking call. Review the enquiry, appointment choices and demonstrated Google Calendar booking, then discuss your practice’s requirements.",
          url: canonicalUrl("/industries/dental"),
          provider: { "@type": "Organization", name: "FlowAudit", url: canonicalUrl("/") },
        }}
      />
    </>
  );
}
