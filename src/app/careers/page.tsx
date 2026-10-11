import { CareersPage } from "@/components/marketing/supporting-pages";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Collaborate with FlowAudit",
  "Share an expression of interest in thoughtful automation, phone-system or website work.",
  "/careers",
);
export default function Page() {
  return <CareersPage />;
}
