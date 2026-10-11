import { VslBooking } from "@/components/marketing/vsl-booking";
import { BookingPage } from "@/components/marketing/booking-page";
import { pageMetadata } from "@/lib/page-metadata";
import { serviceId } from "@/lib/marketing-copy";
export const metadata = pageMetadata(
  "Book a demo & fit assessment",
  "Book a 15-minute FlowAudit call to discuss requirements, a relevant demonstration, scope and investment.",
  "/book",
);
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  if (params.entry === "vsl" && params.service === "phone-agent") return <VslBooking />;
  return <BookingPage initialService={serviceId(params.service)} />;
}
