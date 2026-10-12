import { LegalPage } from "@/components/marketing/legal-page";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Privacy policy | Revenue Recovery Desk",
  "FlowAudit service information, including Revenue Recovery Desk.",
  "/revenue-recovery/privacy",
);
export default function Page() {
  return <LegalPage kind="privacy" />;
}
