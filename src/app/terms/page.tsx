import { LegalPage } from "@/components/marketing/legal-page";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Terms of service",
  "FlowAudit service information, including Revenue Recovery Desk.",
  "/terms",
);
export default function Page() {
  return <LegalPage kind="terms" />;
}
