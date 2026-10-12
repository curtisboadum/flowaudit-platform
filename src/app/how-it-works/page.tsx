import { ApproachPage } from "@/components/marketing/supporting-pages";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Our approach",
  "Understand FlowAudit scope, payment boundaries, configuration, testing, approval and activation.",
  "/how-it-works",
);
export default function Page() {
  return <ApproachPage />;
}
