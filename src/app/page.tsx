import { Home } from "@/components/marketing/home";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "AI systems for established service businesses",
  "Phone handling, operations automation, revenue recovery and websites, with clear scope and approval before activation.",
  "/",
);
export default function Page() {
  return <Home />;
}
