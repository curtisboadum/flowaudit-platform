import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL, canonicalUrl } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumbs";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

interface IndustryData {
  name: string;
  headline: string;
  description: string;
  tasks: { title: string; description: string; hoursSaved: string }[];
  impacts: { label: string; value: string }[];
  workflows: { name: string; from: string; to: string }[];
}

const industries: Record<string, IndustryData> = {
  trades: {
    name: "Trades",
    headline: "Automation Built For Trades",
    description:
      "Plumbers, electricians, and contractors lose hours every week to quoting, invoicing, and chasing payments. FlowAudit handles it so you can focus on the work that pays.",
    tasks: [
      {
        title: "Quote Follow-ups",
        description:
          "Automatically chase every quote from the tools you already use",
        hoursSaved: "Automated",
      },
      {
        title: "Job Scheduling",
        description:
          "Sync your calendar across the team, no more double-bookings or missed callouts",
        hoursSaved: "Automated",
      },
      {
        title: "Invoice Generation",
        description: "Job done? Invoice goes out to your accounting tool",
        hoursSaved: "Automated",
      },
      {
        title: "CRM Updates",
        description: "Keep your customer records updated without typing the same info twice",
        hoursSaved: "Automated",
      },
      {
        title: "Permit Tracking",
        description: "Track permit statuses and deadlines so nothing slips through",
        hoursSaved: "Automated",
      },
    ],
    impacts: [
      { label: "Repetitive admin", value: "Automated" },
      { label: "Every action", value: "Logged" },
      { label: "Human approval", value: "Where it matters" },
      { label: "Go-live", value: "On approval" },
    ],
    workflows: [
      { name: "Job Complete → Invoice", from: "Your CRM", to: "Accounting" },
      { name: "New Lead → Assignment", from: "Website / Google", to: "CRM + SMS" },
      { name: "Quote Sent → Follow-up", from: "Email", to: "SMS + Email" },
    ],
  },
  solopreneurs: {
    name: "Solopreneurs",
    headline: "Automation Built For Solo Operators & Small Teams",
    description:
      "Whether you're a one-person shop or a small crew, FlowAudit gives you a virtual back office. Quoting, invoicing, follow-ups, and scheduling handled automatically.",
    tasks: [
      {
        title: "Quote & Invoice",
        description: "Send professional quotes and invoices without opening a spreadsheet",
        hoursSaved: "Automated",
      },
      {
        title: "Client Follow-ups",
        description: "Automatic check-ins and follow-ups so no lead goes cold",
        hoursSaved: "Automated",
      },
      {
        title: "Booking & Scheduling",
        description: "Let clients book time with your team, no back-and-forth emails",
        hoursSaved: "Automated",
      },
      {
        title: "Payment Chasing",
        description: "Automated reminders for overdue invoices so you don't have to ask",
        hoursSaved: "Automated",
      },
      {
        title: "Weekly Summary",
        description:
          "A Monday morning snapshot of what's coming in, what's overdue, and what needs doing",
        hoursSaved: "Automated",
      },
    ],
    impacts: [
      { label: "Repetitive admin", value: "Automated" },
      { label: "Every action", value: "Logged" },
      { label: "Human approval", value: "Where it matters" },
      { label: "Go-live", value: "On approval" },
    ],
    workflows: [
      { name: "Job Done → Invoice Sent", from: "Your Calendar", to: "Accounting" },
      { name: "Quote Sent → Auto Follow-up", from: "Email", to: "SMS + Email" },
      { name: "Week Start → Cash Flow Summary", from: "Accounting", to: "Email + chat" },
    ],
  },
  insurance: {
    name: "Insurance",
    headline: "Automation Built For Insurance",
    description:
      "Brokerages lose hours tracking renewals, sending client updates, and managing policy changes. Automate it all.",
    tasks: [
      {
        title: "Renewal Tracking",
        description: "Track every policy renewal deadline automatically",
        hoursSaved: "Automated",
      },
      {
        title: "Client Communications",
        description: "Send policy updates and renewal reminders",
        hoursSaved: "Automated",
      },
      {
        title: "Portal Checks",
        description: "Monitor carrier portals for policy changes",
        hoursSaved: "Automated",
      },
      {
        title: "Commission Tracking",
        description: "Track commissions across multiple carriers",
        hoursSaved: "Automated",
      },
      {
        title: "Compliance Reporting",
        description: "Generate compliance reports automatically",
        hoursSaved: "Automated",
      },
    ],
    impacts: [
      { label: "Repetitive admin", value: "Automated" },
      { label: "Every action", value: "Logged" },
      { label: "Human approval", value: "Where it matters" },
      { label: "Go-live", value: "On approval" },
    ],
    workflows: [
      { name: "Renewal Due → Client Notice", from: "AMS", to: "Email + SMS" },
      { name: "Policy Change → Update CRM", from: "Carrier Portal", to: "CRM" },
      { name: "Commission → Reconcile", from: "Carrier Statement", to: "Accounting" },
    ],
  },
  agencies: {
    name: "Agencies",
    headline: "Automation Built For Agencies",
    description:
      "Creative and marketing agencies spend too much time on client reporting and project admin. Automate the busywork.",
    tasks: [
      {
        title: "Client Reporting",
        description: "Auto-generate weekly client performance reports",
        hoursSaved: "Automated",
      },
      {
        title: "Project Updates",
        description: "Send status updates when milestones are hit",
        hoursSaved: "Automated",
      },
      {
        title: "Time Tracking",
        description: "Sync time entries across tools automatically",
        hoursSaved: "Automated",
      },
      {
        title: "Invoice Generation",
        description: "Create invoices from approved timesheets",
        hoursSaved: "Automated",
      },
      {
        title: "Lead Nurturing",
        description: "Follow up with inbound leads automatically",
        hoursSaved: "Automated",
      },
    ],
    impacts: [
      { label: "Repetitive admin", value: "Automated" },
      { label: "Every action", value: "Logged" },
      { label: "Human approval", value: "Where it matters" },
      { label: "Go-live", value: "On approval" },
    ],
    workflows: [
      { name: "Week End → Client Report", from: "Analytics", to: "Email" },
      { name: "Milestone → Client Update", from: "Project tool", to: "Team chat + Email" },
      { name: "Time Approved → Invoice", from: "Time tracker", to: "Accounting" },
    ],
  },
  accounting: {
    name: "Accounting",
    headline: "Automation Built For Accounting Firms",
    description:
      "CPA firms and bookkeepers drown in data entry and client follow-ups during busy season and beyond.",
    tasks: [
      {
        title: "Document Collection",
        description: "Chase clients for missing documents automatically",
        hoursSaved: "Automated",
      },
      {
        title: "Data Entry",
        description: "Extract and enter data from receipts and statements",
        hoursSaved: "Automated",
      },
      {
        title: "Deadline Tracking",
        description: "Track filing deadlines and send reminders",
        hoursSaved: "Automated",
      },
      {
        title: "Client Onboarding",
        description: "Automate the new client intake process",
        hoursSaved: "Automated",
      },
      {
        title: "Monthly Close",
        description: "Generate checklists and track close progress",
        hoursSaved: "Automated",
      },
    ],
    impacts: [
      { label: "Repetitive admin", value: "Automated" },
      { label: "Every action", value: "Logged" },
      { label: "Human approval", value: "Where it matters" },
      { label: "Go-live", value: "On approval" },
    ],
    workflows: [
      { name: "Doc Missing → Client Chase", from: "Practice Mgmt", to: "Email + Portal" },
      { name: "Deadline Approaching → Alert", from: "Calendar", to: "Email + Slack" },
      { name: "Month End → Close Checklist", from: "Template", to: "Task Manager" },
    ],
  },
  legal: {
    name: "Legal",
    headline: "Automation Built For Legal Practices",
    description:
      "Law firms spend significant billable hours on administrative tasks that can be automated.",
    tasks: [
      {
        title: "Client Intake",
        description: "Automate initial client questionnaires and document collection",
        hoursSaved: "Automated",
      },
      {
        title: "Deadline Management",
        description: "Track court dates, filings, and statute of limitations",
        hoursSaved: "Automated",
      },
      {
        title: "Document Assembly",
        description: "Generate routine legal documents from templates",
        hoursSaved: "Automated",
      },
      {
        title: "Billing & Time",
        description: "Sync time entries and generate invoices",
        hoursSaved: "Automated",
      },
      {
        title: "Client Updates",
        description: "Send case status updates to clients automatically",
        hoursSaved: "Automated",
      },
    ],
    impacts: [
      { label: "Repetitive admin", value: "Automated" },
      { label: "Every action", value: "Logged" },
      { label: "Human approval", value: "Where it matters" },
      { label: "Go-live", value: "On approval" },
    ],
    workflows: [
      { name: "New Matter → Intake", from: "Website", to: "Practice Mgmt + Email" },
      { name: "Filing Due → Reminder", from: "Calendar", to: "Email + SMS" },
      { name: "Time Entry → Invoice", from: "Time Tracker", to: "Billing System" },
    ],
  },
  consultants: {
    name: "Consultants",
    headline: "Automation Built For Consultants",
    description:
      "Advisory and strategy firms lose leverage when partners spend time on admin instead of client work.",
    tasks: [
      {
        title: "Proposal Generation",
        description: "Create proposals from templates with client data",
        hoursSaved: "Automated",
      },
      {
        title: "Meeting Follow-ups",
        description: "Automatically send meeting notes and action items",
        hoursSaved: "Automated",
      },
      {
        title: "Pipeline Management",
        description: "Track deal stages and trigger follow-ups",
        hoursSaved: "Automated",
      },
      {
        title: "Report Generation",
        description: "Compile client reports from multiple data sources",
        hoursSaved: "Automated",
      },
      {
        title: "Scheduling",
        description: "Coordinate multi-party meetings automatically",
        hoursSaved: "Automated",
      },
    ],
    impacts: [
      { label: "Repetitive admin", value: "Automated" },
      { label: "Every action", value: "Logged" },
      { label: "Human approval", value: "Where it matters" },
      { label: "Go-live", value: "On approval" },
    ],
    workflows: [
      { name: "Meeting → Summary + Actions", from: "Calendar", to: "Email + CRM" },
      { name: "Stage Change → Follow-up", from: "CRM", to: "Email" },
      { name: "Month End → Client Report", from: "Data Sources", to: "Email + Portal" },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const industry = industries[slug];
    if (!industry) return { title: "Industry | FlowAudit" };
    return {
      title: `${industry.name} Automation | FlowAudit`,
      description: industry.description,
      alternates: {
        canonical: `/industries/${slug}`,
      },
    };
  });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = industries[slug];

  if (!industry) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full max-w-[1060px]">
        <div className="px-4 pt-24 sm:px-6 sm:pt-28 lg:px-0 lg:pt-32">
          <Breadcrumbs
            items={[
              { name: "Industries", href: "/" },
              { name: industry.name, href: `/industries/${slug}` },
            ]}
          />
        </div>
        {/* Hero */}
        <section className="flex flex-col items-center border-b border-[rgba(55,50,47,0.12)] px-4 pt-8 pb-16 text-center sm:px-6 sm:pb-20 lg:px-0">
          <Badge text={industry.name} />
          <h1 className="mt-4 max-w-[600px] font-serif text-3xl leading-[1.1] font-normal text-[#37322F] sm:text-5xl lg:text-6xl">
            {industry.headline}
          </h1>
          <p className="mt-6 max-w-[500px] font-sans text-base leading-7 text-[rgba(55,50,47,0.80)] sm:text-lg">
            {industry.description}
          </p>
        </section>

        {/* Top 5 Tasks */}
        <section className="border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0">
          <h2 className="mb-10 text-center font-sans text-2xl font-semibold text-[#49423D] sm:text-3xl">
            Top 5 Repetitive Tasks We Automate
          </h2>
          <div className="mx-auto max-w-[700px] space-y-4">
            {industry.tasks.map((task, index) => (
              <div
                key={task.title}
                className="flex items-start gap-4 rounded-xl border border-[rgba(55,50,47,0.08)] bg-white p-5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F0EDEB]">
                  <span className="font-sans text-xs font-bold text-[#37322F]">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-sans text-sm font-semibold text-[#37322F]">{task.title}</h3>
                    <span className="ml-2 shrink-0 font-sans text-xs font-medium text-emerald-600">
                      {task.hoursSaved}
                    </span>
                  </div>
                  <p className="mt-1 font-sans text-sm text-[#605A57]">{task.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section className="border-b border-[rgba(55,50,47,0.12)] px-4 py-12 sm:px-6 lg:px-0">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {industry.impacts.map((impact) => (
              <div key={impact.label} className="p-6 text-center">
                <div className="font-sans text-3xl font-semibold text-[#37322F] sm:text-4xl">
                  {impact.value}
                </div>
                <div className="mt-2 font-sans text-xs text-[#605A57]">{impact.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Workflow Templates */}
        <section className="border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0">
          <h2 className="mb-2 text-center font-sans text-2xl font-semibold text-[#49423D] sm:text-3xl">
            Example Workflows
          </h2>
          <p className="mb-10 text-center font-sans text-sm text-[#605A57]">
            See how your tools connect. Fully automated, end to end.
          </p>
          <div className="mx-auto max-w-[700px] space-y-4">
            {industry.workflows.map((workflow, index) => (
              <div
                key={workflow.name}
                className="group flex items-start gap-4 rounded-2xl border border-[rgba(55,50,47,0.08)] bg-white p-5 shadow-sm transition-all hover:border-[rgba(55,50,47,0.16)] hover:shadow-md"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#37322F]">
                  <span className="font-sans text-xs font-bold text-white">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="mb-3 font-sans text-sm font-semibold text-[#37322F]">
                    {workflow.name}
                  </div>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="mb-1 font-sans text-[10px] font-medium tracking-wide text-[#605A57]/60 uppercase">
                        From
                      </div>
                      <div className="rounded-lg bg-[#F0EDEB] px-3 py-1.5 font-sans text-xs font-medium text-[#37322F]">
                        {workflow.from}
                      </div>
                    </div>
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 transition-colors group-hover:bg-emerald-200">
                      <svg
                        className="h-3 w-3 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="mb-1 font-sans text-[10px] font-medium tracking-wide text-[#605A57]/60 uppercase">
                        To
                      </div>
                      <div className="rounded-lg bg-[#37322F] px-3 py-1.5 font-sans text-xs font-medium text-white">
                        {workflow.to}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-0">
          <h2 className="font-serif text-2xl font-normal text-[#37322F] sm:text-3xl">
            Start With a Pilot
          </h2>
          <p className="mt-4 max-w-[400px] font-sans text-sm text-[#605A57] sm:text-base">
            Test one {industry.name.toLowerCase()} workflow in 5 days. See results before
            committing.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link href="/book">Book a Call</Link>
          </Button>
        </section>
      </div>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: canonicalUrl("/") },
          { name: "Industries", url: canonicalUrl("/") },
          { name: industry.name, url: canonicalUrl(`/industries/${slug}`) },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${industry.name} Automation | FlowAudit`,
          description: industry.description,
          provider: {
            "@type": "Organization",
            name: "FlowAudit",
            url: SITE_URL,
          },
          url: canonicalUrl(`/industries/${slug}`),
        }}
      />
    </div>
  );
}
