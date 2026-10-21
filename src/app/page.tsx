import { Home } from "@/components/marketing/home";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "AI phone agents & voice automation",
  "AI phone agents for established service businesses. Handle inbound enquiries through approved workflows. USA primary, UK supported.",
  "/",
);
export default function Page() {
  return <Home />;
}
