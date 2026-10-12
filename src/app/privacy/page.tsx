import { LegalPage } from "@/components/marketing/legal-page";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Privacy policy",
  "FlowAudit service information, including Revenue Recovery Desk.",
  "/privacy",
);
export default function Page() {
  return <LegalPage kind="privacy" />;
}
