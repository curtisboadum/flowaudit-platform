import { DemoLibrary } from "@/components/marketing/demo-library";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Recorded phone-agent demonstrations",
  "Hear a privacy-edited call, understand the demonstrated next step and assess what your own workflow needs.",
  "/demos",
);
export default function Page() {
  return <DemoLibrary />;
}
