import { BookingPage } from "@/components/marketing/booking-page";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Revenue recovery fit assessment",
  "Discuss the accounts-receivable process, approvals and scope with FlowAudit.",
  "/revenue-recovery/book",
);
export default function Page() {
  return <BookingPage initialService="revenue-recovery" />;
}
