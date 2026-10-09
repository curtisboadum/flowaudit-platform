import { BlogIndex } from "@/components/marketing/editorial-pages";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Field notes",
  "Practical frameworks for automation scope, delivery choices and operational measurement.",
  "/blog",
);
export default function Page() {
  return <BlogIndex />;
}
