import { notFound } from "next/navigation";
import { IndustryPage } from "@/components/marketing/editorial-pages";
import { industries } from "@/lib/editorial-copy";
import { pageMetadata } from "@/lib/page-metadata";
export function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = industries[slug];
  if (!data) return {};
  return pageMetadata(data.name.en, data.intro.en, `/industries/${slug}`);
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!industries[slug]) notFound();
  return <IndustryPage slug={slug} />;
}
