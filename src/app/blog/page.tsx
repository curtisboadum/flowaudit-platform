import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "Blog — FlowAudit",
  description:
    "Insights on automation, operational efficiency, and growing without adding headcount.",
  alternates: {
    canonical: "/blog",
  },
};

const posts = [
  {
    slug: "real-cost-of-manual-work",
    title: "The Real Cost of Manual Work",
    excerpt:
      "Most teams underestimate how much repetitive admin costs them. Here's how to calculate the true impact on your bottom line.",
    category: "Operations",
    date: "2025-01-15",
    readTime: "5 min read",
  },
  {
    slug: "hire-vs-automate",
    title: "Hire vs. Automate: Making the Right Decision",
    excerpt:
      "When should you hire another person and when should you automate? A practical framework for service businesses.",
    category: "Strategy",
    date: "2025-01-08",
    readTime: "7 min read",
  },
  {
    slug: "revenue-per-employee",
    title: "Revenue Per Employee: The Metric That Matters",
    excerpt:
      "Why revenue per employee is the single best indicator of operational health — and how automation improves it.",
    category: "Metrics",
    date: "2025-01-02",
    readTime: "6 min read",
  },
] as const;

export default function BlogPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full max-w-[1060px]">
        {/* Hero */}
        <section className="flex flex-col items-center border-b border-[rgba(55,50,47,0.12)] px-4 pt-28 pb-16 text-center sm:px-6 sm:pt-36 sm:pb-20 lg:px-0 lg:pt-44">
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
