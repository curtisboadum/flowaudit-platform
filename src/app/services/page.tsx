import { ServicesHub } from "@/components/marketing/services-hub";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Our services",
  "Phone agents, operations automation, revenue recovery and managed websites, each with a defined scope.",
  "/services",
);
export default function Page() {
  return <ServicesHub />;
}
