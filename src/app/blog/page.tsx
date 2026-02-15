import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumbs";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = {
  title: "Blog — FlowAudit_",
  description:
    "Insights on automation, operational efficiency, and growing without adding headcount.",
  alternates: {
    canonical: "/blog",
  },
};

const posts = [
  {
    slug: "real-cost-of-manual-work",
    title: "The Real Cost of Doing Everything Manually",
    excerpt:
      "Most tradespeople don't realise how much unpaid admin is costing them. Here's how to work it out.",
    category: "Operations",
    date: "2025-01-15",
    readTime: "5 min read",
  },
  {
    slug: "hire-vs-automate",
    title: "Hire an Office Manager or Automate? How to Decide",
    excerpt:
      "When should you hire help and when should you let automation handle it? A practical guide for small operators.",
    category: "Strategy",
    date: "2025-01-08",
    readTime: "7 min read",
  },
  {
    slug: "revenue-per-employee",
    title: "The One Number That Shows If Your Business Is Healthy",
    excerpt:
      "Forget complex dashboards. This single metric tells you whether you're making money or just staying busy.",
    category: "Metrics",
    date: "2025-01-02",
    readTime: "6 min read",
  },
] as const;

export default function BlogPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full max-w-[1060px]">
        <div className="px-4 pt-24 sm:px-6 sm:pt-28 lg:px-0 lg:pt-32">
          <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />
        </div>
        {/* Hero */}
        <section className="flex flex-col items-center border-b border-[rgba(55,50,47,0.12)] px-4 pt-8 pb-16 text-center sm:px-6 sm:pb-20 lg:px-0">
          <Badge text="Blog" />
          <h1 className="mt-4 max-w-[600px] font-serif text-3xl leading-[1.1] font-normal text-[#37322F] sm:text-5xl lg:text-6xl">
            Insights for Operators
          </h1>
          <p className="mt-6 max-w-[500px] font-sans text-base leading-7 text-[rgba(55,50,47,0.80)] sm:text-lg">
            Practical thinking on automation, efficiency, and growing without adding headcount.
          </p>
        </section>

        {/* Blog Grid */}
        <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-xl border border-[rgba(55,50,47,0.08)] bg-white transition-shadow hover:shadow-[0px_4px_12px_rgba(55,50,47,0.08)]"
              >
                {/* Placeholder image area */}
                <div className="flex h-40 items-center justify-center bg-[#F0EDEB]">
                  <span className="font-sans text-sm text-[#605A57]">{post.category}</span>
                </div>
                <div className="p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-sans text-xs text-[#605A57]">{post.date}</span>
                    <span className="font-sans text-xs text-[#605A57]">{post.readTime}</span>
                  </div>
                  <h2 className="font-sans text-base font-semibold text-[#37322F] transition-colors group-hover:text-[#49423D]">
                    {post.title}
                  </h2>
                  <p className="mt-2 font-sans text-sm leading-6 text-[#605A57]">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: canonicalUrl("/") },
          { name: "Blog", url: canonicalUrl("/blog") },
        ])}
      />
    </div>
  );
}
