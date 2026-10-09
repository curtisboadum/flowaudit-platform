import { LegalPage } from "@/components/marketing/legal-page";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Terms of service | Revenue Recovery Desk",
  "FlowAudit service information, including Revenue Recovery Desk.",
  "/revenue-recovery/terms",
);
export default function Page() {
  return <LegalPage kind="terms" />;
}
