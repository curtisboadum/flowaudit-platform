import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL, SITE_NAME, canonicalUrl } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumbs";

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
}

const posts: Record<string, BlogPost> = {
  "real-cost-of-manual-work": {
    title: "The Real Cost of Manual Work",
    excerpt:
      "Most teams underestimate how much repetitive admin costs them. Here's how to calculate the true impact.",
    category: "Operations",
    date: "January 15, 2025",
    readTime: "5 min read",
    content: `Every week, your team spends hours on tasks that don't directly generate revenue. Data entry, follow-up emails, report compilation, status updates — the list goes on.

Most business owners know this work exists, but few have actually calculated what it costs them. Let's fix that.

## The Hidden Math

Take a simple example: a 5-person service team where each member spends 3 hours per week on repetitive admin tasks.

- **15 hours/week** of team capacity consumed
- **60 hours/month** that could be spent on revenue-generating work
- At $75/hour average value, that's **$4,500/month** in lost productivity
- Over a year: **$54,000** — the cost of nearly a full-time hire

And that's a conservative estimate. Most teams we audit are losing 20-30 hours per week to manual work.

## It Gets Worse as You Grow

Here's what most operators miss: manual work scales linearly with your business. Double your clients, double the admin. Triple your team, triple the coordination overhead.

This is why so many growing businesses hit a wall around 10-15 employees. The admin burden becomes unsustainable, but the solution (hiring more admin staff) just adds to the overhead.

## The Alternative

AI operations assistants don't scale linearly. They handle the same tasks whether you have 10 clients or 100. The marginal cost of each additional automated workflow is near zero.

This is why revenue-per-employee is the metric that matters most. It tells you how efficiently your team converts time into revenue.

## How to Calculate Your Actual Cost

1. **List every repetitive task** your team does weekly
2. **Estimate hours** spent on each task
3. **Multiply by your hourly value** (what you could earn doing revenue work instead)
4. **Add error costs** — mistakes from manual work that cost you clients or money
5. **Project over 12 months** — this is your annual cost of manual work

Most teams we work with are shocked by the number. It's almost always higher than they expected.`,
  },
  "hire-vs-automate": {
    title: "Hire vs. Automate: Making the Right Decision",
    excerpt:
      "When should you hire another person and when should you automate? A practical framework.",
    category: "Strategy",
    date: "January 8, 2025",
    readTime: "7 min read",
    content: `The most common question we hear from operators: "Should I hire someone to handle this, or should I automate it?"

The answer isn't always automation. But it's automation more often than most people think.

## The Framework

Ask yourself three questions about the task:

### 1. Is it structured and repetitive?

If the task follows the same steps every time — move data from A to B, send this email when X happens, generate this report every Friday — it's a prime candidate for automation.

If it requires judgment, creativity, or relationship-building, that's where humans excel.

### 2. Does it scale with volume?

Tasks that increase linearly with your client base (data entry per client, follow-ups per deal, invoices per job) are expensive to solve with hiring. Every new client means more admin hours.

Automation handles volume increases without proportional cost increases.

### 3. What's the error cost?

Manual work introduces errors. A missed follow-up might cost you a $10,000 deal. A data entry mistake might cause a billing dispute. An overlooked renewal might lose a long-term client.

Automated systems don't forget, don't get tired, and don't make copy-paste errors.

## When to Hire Instead

Hire when the work requires:
- **Relationship building** — clients want to talk to a person
- **Complex judgment** — the decision changes based on context every time
- **Creative problem-solving** — each situation is genuinely unique
- **Physical presence** — someone needs to be on-site

## The Hybrid Approach

The best operators do both: automate the repetitive work, then hire people for the judgment-based work. This means every person you hire spends 100% of their time on high-value activities.

That's how you improve revenue per employee — not by adding more people to do admin, but by removing admin from everyone's plate.`,
  },
  "revenue-per-employee": {
    title: "Revenue Per Employee: The Metric That Matters",
    excerpt: "Why revenue per employee is the single best indicator of operational health.",
    category: "Metrics",
    date: "January 2, 2025",
    readTime: "6 min read",
    content: `If you could only track one metric for your business, it should be revenue per employee.

It tells you more about your operational health than any other single number. Here's why.

## What It Reveals

Revenue per employee = Total Revenue / Number of Full-Time Employees

This ratio captures:
- **Operational efficiency** — how much of your team's time converts to revenue
- **Scalability** — whether your business model can grow without proportional headcount
- **Margin health** — higher revenue per employee generally means better margins
- **Automation opportunity** — low ratios often indicate heavy manual work

## Benchmarks by Industry

- **Software companies:** $200K-$500K+ per employee
- **Professional services:** $150K-$300K per employee
- **Trades/contractors:** $100K-$200K per employee
- **Agencies:** $120K-$250K per employee

If you're below these ranges, it usually means your team is spending too much time on non-revenue work.

## How Automation Moves the Needle

When you automate repetitive tasks, you're effectively increasing each employee's revenue-generating capacity without adding headcount.

A 5-person team saving 20 hours/week through automation gains the equivalent of a half-time employee — but without the salary, benefits, training, and management overhead.

Over a year, that 20 hours/week translates to roughly 1,000 hours of recovered capacity. At $75/hour average value, that's $75,000 in potential revenue — from the same 5 people.

## The Compounding Effect

The real magic happens over time. As you automate more workflows:
1. Each employee becomes more productive
2. You can take on more clients without hiring
3. Your margins improve because labor costs stay flat
4. Your business becomes more valuable (buyers love high revenue-per-employee ratios)

This is the fundamental advantage of automation over hiring: it improves your unit economics permanently.`,
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = posts[slug];
    if (!post) return { title: "Blog — FlowAudit" };
    return {
      title: `${post.title} — FlowAudit Blog`,
      description: post.excerpt,
      alternates: {
        canonical: `/blog/${slug}`,
      },
    };
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full max-w-[700px] px-4 sm:px-6 lg:px-0">
        {/* Header */}
        <header className="pt-28 pb-10 sm:pt-36 lg:pt-44">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-sans text-xs text-[#605A57]">{post.category}</span>
            <span className="font-sans text-xs text-[#605A57]">{post.date}</span>
            <span className="font-sans text-xs text-[#605A57]">{post.readTime}</span>
          </div>
          <h1 className="font-serif text-3xl leading-[1.15] font-normal text-[#37322F] sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 font-sans text-base leading-7 text-[rgba(55,50,47,0.80)] sm:text-lg">
            {post.excerpt}
          </p>
        </header>

        {/* Content */}
        <article className="prose-custom pb-16">
          {post.content.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="mt-10 mb-4 font-sans text-xl font-semibold text-[#37322F] sm:text-2xl"
                >
                  {block.replace("## ", "")}
                </h2>
              );
            }
            if (block.startsWith("### ")) {
              return (
                <h3 key={i} className="mt-8 mb-3 font-sans text-lg font-semibold text-[#37322F]">
                  {block.replace("### ", "")}
                </h3>
              );
            }
            if (block.startsWith("- ")) {
              return (
                <ul key={i} className="my-4 space-y-2">
                  {block.split("\n").map((line, j) => (
                    <li key={j} className="pl-4 font-sans text-base leading-7 text-[#605A57]">
                      {line.replace("- ", "")}
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.match(/^\d\./)) {
              return (
                <ol key={i} className="my-4 list-inside list-decimal space-y-2">
                  {block.split("\n").map((line, j) => (
                    <li key={j} className="font-sans text-base leading-7 text-[#605A57]">
                      {line.replace(/^\d+\.\s*/, "")}
                    </li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={i} className="my-4 font-sans text-base leading-7 text-[#605A57]">
                {block}
              </p>
            );
          })}
        </article>

        {/* CTA */}
        <div className="flex flex-col items-center border-t border-[rgba(55,50,47,0.12)] pt-10 pb-16 text-center sm:pb-20">
          <h2 className="font-serif text-xl font-normal text-[#37322F] sm:text-2xl">
            Ready to stop doing repetitive work?
          </h2>
          <p className="mt-3 max-w-[400px] font-sans text-sm text-[#605A57]">
            Book a free strategy call and see exactly how much time your team can save.
          </p>
          <Button size="lg" className="mt-5" asChild>
            <Link href="/book">Book a Strategy Call</Link>
          </Button>
        </div>
      </div>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: canonicalUrl("/") },
          { name: "Blog", url: canonicalUrl("/blog") },
          { name: post.title, url: canonicalUrl(`/blog/${slug}`) },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
          url: canonicalUrl(`/blog/${slug}`),
          mainEntityOfPage: canonicalUrl(`/blog/${slug}`),
        }}
      />
    </div>
  );
}
