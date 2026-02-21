import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL, SITE_NAME, canonicalUrl } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumbs";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import React from "react";

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
}

function renderInlineMarkdown(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-[#37322F]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

const posts: Record<string, BlogPost> = {
  "real-cost-of-manual-work": {
    title: "The Real Cost of Doing Everything Manually",
    excerpt:
      "Most tradespeople don't realise how much unpaid admin is costing them. Here's how to work it out.",
    category: "Operations",
    date: "January 15, 2025",
    readTime: "5 min read",
    content: `Every week, you spend hours on work that doesn't pay. Quoting jobs, chasing invoices, scheduling callouts, ordering materials, replying to enquiries at 9pm. It all adds up.

Most tradespeople know this work exists, but few have actually calculated what it costs them. Let's fix that.

## The Hidden Math

Take a simple example: you're an electrician or plumber billing $120/hour for on-site work. But you're spending 2 hours a day on unpaid admin.

- **10 hours/week** lost to admin you don't get paid for
- **40 hours/month** that could be spent on billable jobs
- At $120/hour, that's **$4,800/month** in lost earnings
- Over a year: **$57,600** you're leaving on the table

And that's conservative. Most operators we talk to are losing even more when you count evenings spent doing paperwork, weekends quoting jobs, and the mental load of keeping everything in your head.

## It Gets Worse as You Grow

Here's what most operators miss: admin scales with your business. More clients means more invoices to chase. More jobs means more quotes to write. Hire a second tradie and you're now coordinating two schedules instead of one.

This is why so many trades businesses hit a wall. You're flat out but not making more money. Hiring an office person just adds another wage to cover.

## The Alternative

Automation doesn't scale the same way. A system that sends your invoices, follows up on quotes, and books callouts handles the same work whether you have 10 clients or 100. The cost stays the same.

That's how you increase the money you take home per job, not by working longer hours, but by cutting the unpaid work that eats into every day.

## How to Calculate Your Actual Cost

1. **List every task** you do each week that isn't billable work
2. **Estimate the hours** you spend on each one
3. **Multiply by your hourly rate** — that's what you could be earning instead
4. **Add the cost of mistakes** — a missed quote follow-up that loses a $5,000 job, a late invoice that doesn't get paid for 90 days
5. **Project over 12 months** — this is what doing everything yourself is really costing you

Most tradespeople we talk to are shocked by the number. It's almost always higher than they expected.`,
  },
  "hire-vs-automate": {
    title: "Hire an Office Manager or Automate? How to Decide",
    excerpt:
      "When should you hire help and when should you let automation handle it? A practical guide for small operators.",
    category: "Strategy",
    date: "January 8, 2025",
    readTime: "7 min read",
    content: `The most common question we hear from tradespeople and small operators: "Should I hire someone to handle the admin, or should I automate it?"

The answer isn't always automation. But it's automation more often than most people think.

## The Framework

Ask yourself three questions about the task:

### 1. Is it structured and repetitive?

If the task follows the same steps every time — send an invoice after a job, follow up on a quote after 3 days, text the client a booking reminder — it's a prime candidate for automation.

If it requires judgment, problem-solving, or a conversation with a real person, that's where humans are better.

### 2. Does it scale with volume?

Tasks that increase with every new client — sending quotes, chasing late payments, booking callouts, updating job records — are expensive to solve with hiring. Every new client means more admin hours.

Automation handles volume increases without adding cost.

### 3. What's the error cost?

Manual work introduces mistakes. A follow-up you forgot to send might cost you a $10,000 renovation job. A quote you sent to the wrong client causes embarrassment. An invoice you forgot to chase doesn't get paid for months.

Automated systems don't forget, don't get tired, and don't make copy-paste errors.

## When to Hire Instead

Hire when the work requires:
- **Meeting a homeowner to assess a job** — clients want to talk to a real person before committing
- **Diagnosing why a boiler keeps cutting out** — the answer changes every time
- **Creative problem-solving** — working out how to route plumbing in a tricky renovation
- **Being on-site to do the actual work** — no robot is replacing you on the tools

## The Hybrid Approach

The best operators do both: automate the repetitive admin, then hire people for the skilled work. This means every person you bring on spends 100% of their time on billable work.

That's how you increase profit per hour worked — not by hiring someone to do your paperwork, but by removing the paperwork entirely.`,
  },
  "revenue-per-employee": {
    title: "The One Number That Shows If Your Business Is Healthy",
    excerpt:
      "Forget complex dashboards. This single metric tells you whether you're making money or just staying busy.",
    category: "Metrics",
    date: "January 2, 2025",
    readTime: "6 min read",
    content: `If you could only track one number for your business, it should be revenue per person.

It tells you more about whether your business is actually healthy than any other single metric. Here's why.

## What It Reveals

Revenue per person = Total Revenue / Number of People in Your Business

This ratio captures:
- **How efficient you are** — how much of your time actually converts to money coming in
- **Whether you can grow** — can your business take on more work without hiring more people
- **Your margins** — higher revenue per person generally means more profit
- **Where automation could help** — low numbers often mean too much time spent on unpaid admin

## Benchmarks for Trades and Small Operators

- **Solo plumber or electrician:** $150K-$250K potential
- **Small trades team (2-5 people):** $120K-$200K per person
- **Contractors with subcontractors:** $100K-$180K per person
- **Service businesses:** $100K-$200K per person

A solo plumber billing $120/hr for 30 billable hours a week has a potential of about $187K a year. If you're only doing $120K, the gap is admin eating your time. A 3-person electrical contracting firm billing $130/hr should be pulling in $400K+ combined. If you're at $280K, admin is the gap.

## How Automation Moves the Needle

When you automate repetitive tasks, you're increasing your earning capacity without adding headcount or working longer hours.

A sole operator saving 10 hours a week through automation gains the equivalent of an extra working day. No wages, no super, no management overhead.

Over a year, that 10 hours a week adds up to roughly 500 hours of recovered capacity. At $120/hour billing rate, that's $60,000 in potential earnings you're currently leaving on the table.

## The Compounding Effect

The real benefit builds over time. As you automate more of the admin:
1. You spend more hours on billable work
2. You can take on more clients without burning out
3. Your profit goes up because your costs stay flat
4. Your business becomes more valuable if you ever want to sell

This is the fundamental advantage of automation over hiring: it improves your profit per hour permanently.`,
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
        <div className="pt-24 sm:pt-28 lg:pt-32">
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              { name: post.title, href: `/blog/${slug}` },
            ]}
          />
        </div>
        {/* Header */}
        <header className="pt-8 pb-10">
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
                  {renderInlineMarkdown(block.replace("## ", ""))}
                </h2>
              );
            }
            if (block.startsWith("### ")) {
              return (
                <h3 key={i} className="mt-8 mb-3 font-sans text-lg font-semibold text-[#37322F]">
                  {renderInlineMarkdown(block.replace("### ", ""))}
                </h3>
              );
            }
            if (block.startsWith("- ")) {
              return (
                <ul key={i} className="my-4 space-y-2">
                  {block.split("\n").map((line, j) => (
                    <li key={j} className="pl-4 font-sans text-base leading-7 text-[#605A57]">
                      {renderInlineMarkdown(line.replace("- ", ""))}
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
                      {renderInlineMarkdown(line.replace(/^\d+\.\s*/, ""))}
                    </li>
                  ))}
                </ol>
              );
            }
            // Handle mixed paragraph + list blocks (single newline before list)
            const lines = block.split("\n");
            const listStartIndex = lines.findIndex(
              (line) => line.startsWith("- ") || /^\d+\.\s/.test(line),
            );
            if (listStartIndex > 0) {
              const textPart = lines.slice(0, listStartIndex).join(" ");
              const listLines = lines.slice(listStartIndex);
              const isOrdered = /^\d+\.\s/.test(listLines[0] ?? "");
              return (
                <React.Fragment key={i}>
                  <p className="my-4 font-sans text-base leading-7 text-[#605A57]">
                    {renderInlineMarkdown(textPart)}
                  </p>
                  {isOrdered ? (
                    <ol className="my-4 list-inside list-decimal space-y-2">
                      {listLines.map((line, j) => (
                        <li key={j} className="font-sans text-base leading-7 text-[#605A57]">
                          {renderInlineMarkdown(line.replace(/^\d+\.\s*/, ""))}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <ul className="my-4 space-y-2">
                      {listLines.map((line, j) => (
                        <li key={j} className="pl-4 font-sans text-base leading-7 text-[#605A57]">
                          {renderInlineMarkdown(line.replace("- ", ""))}
                        </li>
                      ))}
                    </ul>
                  )}
                </React.Fragment>
              );
            }
            return (
              <p key={i} className="my-4 font-sans text-base leading-7 text-[#605A57]">
                {renderInlineMarkdown(block)}
              </p>
            );
          })}
        </article>

        {/* CTA */}
        <div className="flex flex-col items-center border-t border-[rgba(55,50,47,0.12)] pt-10 pb-16 text-center sm:pb-20">
          <h2 className="font-serif text-xl font-normal text-[#37322F] sm:text-2xl">
            Ready to get your evenings back?
          </h2>
          <p className="mt-3 max-w-[400px] font-sans text-sm text-[#605A57]">
            Book a free call and we&apos;ll show you exactly where your time is going — and how to
            get it back.
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
