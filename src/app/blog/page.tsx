import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog — FlowAudit",
  description:
    "Insights on automation, operational efficiency, and growing without adding headcount.",
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
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full max-w-[1060px]">
        {/* Hero */}
        <section className="pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-0 flex flex-col items-center text-center border-b border-[rgba(55,50,47,0.12)]">
          <Badge text="Blog" />
          <h1 className="text-[#37322F] text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] font-serif max-w-[600px] mt-4">
            Insights for Operators
          </h1>
          <p className="text-[rgba(55,50,47,0.80)] text-base sm:text-lg font-sans leading-7 mt-6 max-w-[500px]">
            Practical thinking on automation, efficiency, and growing without adding headcount.
          </p>
        </section>

        {/* Blog Grid */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl border border-[rgba(55,50,47,0.08)] overflow-hidden hover:shadow-[0px_4px_12px_rgba(55,50,47,0.08)] transition-shadow"
              >
                {/* Placeholder image area */}
                <div className="h-40 bg-[#F0EDEB] flex items-center justify-center">
                  <span className="text-[#605A57] text-sm font-sans">{post.category}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-[#605A57] font-sans">{post.date}</span>
                    <span className="text-xs text-[#605A57] font-sans">{post.readTime}</span>
                  </div>
                  <h2 className="text-[#37322F] text-base font-semibold font-sans group-hover:text-[#49423D] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[#605A57] text-sm font-sans leading-6 mt-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
