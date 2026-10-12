import { AboutPage } from "@/components/marketing/supporting-pages";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "About FlowAudit",
  "Meet the founders and explore the practical approach behind FlowAudit services.",
  "/about",
);
export default function Page() {
  return <AboutPage />;
}
