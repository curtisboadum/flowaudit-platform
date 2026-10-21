import { TrustPage } from "@/components/marketing/trust-page";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Trust & technical considerations",
  "What recorded evidence establishes, what requires assessment, and how FlowAudit approaches access, privacy, testing and approval.",
  "/trust",
);
export default function Page() {
  return <TrustPage />;
}
