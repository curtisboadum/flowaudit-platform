import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/marketing/editorial-pages";
import { posts } from "@/lib/editorial-copy";
import { pageMetadata } from "@/lib/page-metadata";
export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = posts[slug];
  return data ? pageMetadata(data.title.en, data.intro.en, `/blog/${slug}`) : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!posts[slug]) notFound();
  return <BlogArticle slug={slug} />;
}
