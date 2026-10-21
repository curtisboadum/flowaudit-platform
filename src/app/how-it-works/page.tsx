import { ApproachPage } from "@/components/marketing/supporting-pages";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Our approach",
  "Understand FlowAudit workflow mapping, configuration, testing, approval and activation.",
  "/how-it-works",
);
export default function Page() {
  return <ApproachPage />;
}
