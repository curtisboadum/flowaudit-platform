import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
      "Plumbers, electricians, and contractors waste 15-25 hours/week on admin. FlowAudit gives you that time back.",
    tasks: [
      { title: "Quote Follow-ups", description: "Automatically follow up on every sent quote", hoursSaved: "4-6 hrs/week" },
      { title: "Job Scheduling", description: "Sync schedules across field teams and office", hoursSaved: "3-5 hrs/week" },
      { title: "Invoice Generation", description: "Create and send invoices when jobs complete", hoursSaved: "2-3 hrs/week" },
      { title: "CRM Updates", description: "Keep your CRM updated without manual data entry", hoursSaved: "3-4 hrs/week" },
      { title: "Permit Tracking", description: "Track permit statuses and deadlines automatically", hoursSaved: "2-3 hrs/week" },
    ],
    impacts: [
      { label: "Hours saved per week", value: "20+" },
      { label: "Quote close rate increase", value: "22%" },
      { label: "Missed follow-ups", value: "Zero" },
      { label: "Days to go live", value: "10" },
    ],
    workflows: [
      { name: "Job Complete → Invoice", from: "ServiceTitan", to: "QuickBooks" },
      { name: "New Lead → Assignment", from: "Website Form", to: "CRM + SMS" },
      { name: "Quote Sent → Follow-up", from: "CRM", to: "Email + SMS" },
    ],
  },
  insurance: {
    name: "Insurance",
    headline: "Automation Built For Insurance",
    description:
      "Brokerages lose hours tracking renewals, sending client updates, and managing policy changes. Automate it all.",
    tasks: [
      { title: "Renewal Tracking", description: "Track every policy renewal deadline automatically", hoursSaved: "5-8 hrs/week" },
      { title: "Client Communications", description: "Send policy updates and renewal reminders", hoursSaved: "3-5 hrs/week" },
      { title: "Portal Checks", description: "Monitor carrier portals for policy changes", hoursSaved: "4-6 hrs/week" },
      { title: "Commission Tracking", description: "Track commissions across multiple carriers", hoursSaved: "2-3 hrs/week" },
      { title: "Compliance Reporting", description: "Generate compliance reports automatically", hoursSaved: "2-4 hrs/week" },
    ],
    impacts: [
      { label: "Hours saved per week", value: "18+" },
      { label: "Missed renewals", value: "Zero" },
      { label: "Client retention", value: "95%" },
      { label: "Commission recovery", value: "$15K/qtr" },
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
      { title: "Client Reporting", description: "Auto-generate weekly client performance reports", hoursSaved: "4-6 hrs/week" },
      { title: "Project Updates", description: "Send status updates when milestones are hit", hoursSaved: "2-3 hrs/week" },
      { title: "Time Tracking", description: "Sync time entries across tools automatically", hoursSaved: "2-4 hrs/week" },
      { title: "Invoice Generation", description: "Create invoices from approved timesheets", hoursSaved: "1-2 hrs/week" },
      { title: "Lead Nurturing", description: "Follow up with inbound leads automatically", hoursSaved: "2-3 hrs/week" },
    ],
    impacts: [
      { label: "Hours saved per week", value: "15+" },
      { label: "Client satisfaction", value: "+30%" },
      { label: "Billing accuracy", value: "99%" },
      { label: "Team capacity gained", value: "20%" },
    ],
    workflows: [
      { name: "Week End → Client Report", from: "Analytics", to: "Email" },
      { name: "Milestone → Client Update", from: "Asana", to: "Slack + Email" },
      { name: "Time Approved → Invoice", from: "Harvest", to: "QuickBooks" },
    ],
  },
  accounting: {
    name: "Accounting",
    headline: "Automation Built For Accounting Firms",
    description:
      "CPA firms and bookkeepers drown in data entry and client follow-ups during busy season and beyond.",
    tasks: [
      { title: "Document Collection", description: "Chase clients for missing documents automatically", hoursSaved: "5-8 hrs/week" },
      { title: "Data Entry", description: "Extract and enter data from receipts and statements", hoursSaved: "4-6 hrs/week" },
      { title: "Deadline Tracking", description: "Track filing deadlines and send reminders", hoursSaved: "2-3 hrs/week" },
      { title: "Client Onboarding", description: "Automate the new client intake process", hoursSaved: "2-4 hrs/week" },
      { title: "Monthly Close", description: "Generate checklists and track close progress", hoursSaved: "3-5 hrs/week" },
    ],
    impacts: [
      { label: "Hours saved per week", value: "20+" },
      { label: "Missed deadlines", value: "Zero" },
      { label: "Client onboarding time", value: "-60%" },
      { label: "Busy season overtime", value: "-40%" },
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
      { title: "Client Intake", description: "Automate initial client questionnaires and document collection", hoursSaved: "3-5 hrs/week" },
      { title: "Deadline Management", description: "Track court dates, filings, and statute of limitations", hoursSaved: "2-4 hrs/week" },
      { title: "Document Assembly", description: "Generate routine legal documents from templates", hoursSaved: "4-6 hrs/week" },
      { title: "Billing & Time", description: "Sync time entries and generate invoices", hoursSaved: "2-3 hrs/week" },
      { title: "Client Updates", description: "Send case status updates to clients automatically", hoursSaved: "2-3 hrs/week" },
    ],
    impacts: [
      { label: "Hours saved per week", value: "16+" },
      { label: "Billing capture rate", value: "+25%" },
      { label: "Missed deadlines", value: "Zero" },
      { label: "Client satisfaction", value: "+35%" },
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
      { title: "Proposal Generation", description: "Create proposals from templates with client data", hoursSaved: "3-5 hrs/week" },
      { title: "Meeting Follow-ups", description: "Automatically send meeting notes and action items", hoursSaved: "2-3 hrs/week" },
      { title: "Pipeline Management", description: "Track deal stages and trigger follow-ups", hoursSaved: "2-4 hrs/week" },
      { title: "Report Generation", description: "Compile client reports from multiple data sources", hoursSaved: "4-6 hrs/week" },
      { title: "Scheduling", description: "Coordinate multi-party meetings automatically", hoursSaved: "1-2 hrs/week" },
    ],
    impacts: [
      { label: "Hours saved per week", value: "14+" },
      { label: "Proposal turnaround", value: "-70%" },
      { label: "Pipeline visibility", value: "100%" },
      { label: "Revenue per partner", value: "+20%" },
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

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const industry = industries[slug];
    if (!industry) return { title: "Industry — FlowAudit" };
    return {
      title: `${industry.name} Automation — FlowAudit`,
      description: industry.description,
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
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full max-w-[1060px]">
        {/* Hero */}
        <section className="pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-0 flex flex-col items-center text-center border-b border-[rgba(55,50,47,0.12)]">
          <Badge text={industry.name} />
          <h1 className="text-[#37322F] text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] font-serif max-w-[600px] mt-4">
            {industry.headline}
          </h1>
          <p className="text-[rgba(55,50,47,0.80)] text-base sm:text-lg font-sans leading-7 mt-6 max-w-[500px]">
            {industry.description}
          </p>
        </section>

        {/* Top 5 Tasks */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-0 border-b border-[rgba(55,50,47,0.12)]">
          <h2 className="text-center text-[#49423D] text-2xl sm:text-3xl font-semibold font-sans mb-10">
            Top 5 Repetitive Tasks We Automate
          </h2>
          <div className="space-y-4 max-w-[700px] mx-auto">
            {industry.tasks.map((task, index) => (
              <div
                key={task.title}
                className="bg-white rounded-xl border border-[rgba(55,50,47,0.08)] p-5 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-[#F0EDEB] flex items-center justify-center shrink-0">
                  <span className="text-[#37322F] text-xs font-bold font-sans">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-[#37322F] text-sm font-semibold font-sans">{task.title}</h3>
                    <span className="text-xs text-emerald-600 font-medium font-sans shrink-0 ml-2">
                      {task.hoursSaved}
                    </span>
                  </div>
                  <p className="text-[#605A57] text-sm font-sans mt-1">{task.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section className="py-12 px-4 sm:px-6 lg:px-0 border-b border-[rgba(55,50,47,0.12)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {industry.impacts.map((impact) => (
              <div key={impact.label} className="text-center p-6">
                <div className="text-3xl sm:text-4xl text-[#37322F] font-semibold font-sans">
                  {impact.value}
                </div>
                <div className="text-xs text-[#605A57] font-sans mt-2">{impact.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Workflow Templates */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-0 border-b border-[rgba(55,50,47,0.12)]">
          <h2 className="text-center text-[#49423D] text-2xl sm:text-3xl font-semibold font-sans mb-10">
            Example Workflows
          </h2>
          <div className="space-y-4 max-w-[600px] mx-auto">
            {industry.workflows.map((workflow) => (
              <div
                key={workflow.name}
                className="bg-white rounded-xl border border-[rgba(55,50,47,0.08)] p-5"
              >
                <div className="text-[#37322F] text-sm font-semibold font-sans mb-3">
                  {workflow.name}
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 bg-[#F0EDEB] rounded-lg text-xs text-[#37322F] font-medium font-sans">
                    {workflow.from}
                  </div>
                  <svg className="w-4 h-4 text-[#605A57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <div className="px-3 py-1.5 bg-[#37322F] rounded-lg text-xs text-white font-medium font-sans">
                    {workflow.to}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-0 flex flex-col items-center text-center">
          <h2 className="text-[#37322F] text-2xl sm:text-3xl font-normal font-serif">
            Start With a Pilot
          </h2>
          <p className="text-[#605A57] text-sm sm:text-base font-sans mt-4 max-w-[400px]">
            Test one {industry.name.toLowerCase()} workflow in 5 days. See results before committing.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link href="/book">Book a Call</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
