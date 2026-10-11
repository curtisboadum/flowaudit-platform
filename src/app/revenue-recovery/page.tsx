import { OfferPage } from "@/components/marketing/offer-page";
import { pageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
export const metadata = pageMetadata(
  "Revenue Recovery Desk",
  "Accounts-receivable operational support with reviewed follow-ups, client approvals and clear scope. No recovered-revenue guarantee.",
  "/revenue-recovery",
);
export default function Page() {
  return (
    <>
      <OfferPage service="revenue-recovery" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Revenue Recovery Desk",
          description:
            "Accounts-receivable operational support with reviewed follow-ups, client approvals and clear scope. No recovered-revenue guarantee.",
          url: canonicalUrl("/revenue-recovery"),
          provider: { "@type": "Organization", name: "FlowAudit", url: canonicalUrl("/") },
        }}
      />
    </>
  );
}
