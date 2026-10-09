import { OfferPage } from "@/components/marketing/offer-page";
import { pageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
export const metadata = pageMetadata(
  "AI receptionist for dental practices",
  "Watch a recorded Google Calendar booking demonstration and discuss configuration, compatibility and investment for your dental practice.",
  "/phone-agent",
);
export default function Page() {
  return (
    <>
      <OfferPage service="phone-agent" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "AI receptionist for dental practices",
          description:
            "Watch a recorded Google Calendar booking demonstration and discuss configuration, compatibility and investment for your dental practice.",
          url: canonicalUrl("/phone-agent"),
          provider: { "@type": "Organization", name: "FlowAudit", url: canonicalUrl("/") },
        }}
      />
    </>
  );
}
