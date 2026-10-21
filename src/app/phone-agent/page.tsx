import { PhonePlatform } from "@/components/marketing/phone-platform";
import { pageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
export const metadata = pageMetadata(
  "AI phone agents for service businesses",
  "Inbound enquiry handling, approved bookings, callbacks and handoffs. See a recorded demonstration, then assess your workflow with FlowAudit.",
  "/phone-agent",
);
export default function Page() {
  return (
    <>
      <PhonePlatform />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "AI phone agents and voice automation",
          url: canonicalUrl("/phone-agent"),
          provider: { "@type": "Organization", name: "FlowAudit", url: canonicalUrl("/") },
          description:
            "Phone agents configured around agreed inbound call workflows, subject to compatibility assessment, testing and approval.",
        }}
      />
    </>
  );
}
