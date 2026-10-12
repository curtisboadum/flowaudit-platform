import { DemosPage } from "@/components/marketing/supporting-pages";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Recorded demonstrations",
  "Hear a routine dental booking example and explore the FlowAudit sales walkthrough, with explicit evidence and configuration limits.",
  "/demos",
);
export default function Page() {
  return <DemosPage />;
}
