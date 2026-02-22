/** Base monthly fee for automation setup */
export const BASE_FEE = 3500;

/** Efficiency factor — percentage of hours automated */
export const EFFICIENCY = 0.6;

export interface AutomationItem {
  name: string;
  price: number;
  description: string;
}

export interface TierData {
  name: string;
  color: string;
  colorClass: string;
  automations: AutomationItem[];
}

export interface Package {
  name: string;
  price: number;
  displayPrice: string;
  description: string;
  features: string[];
  featured: boolean;
}

export interface AddOn {
  name: string;
  price: number;
  description: string;
}

export const TIERS: Record<string, TierData> = {
  tier1: {
    name: "Tier 1: Essentials",
    color: "#3b82f6",
    colorClass: "border-l-blue-500",
    automations: [
      {
        name: "Lead Capture",
        price: 400,
        description:
          "Automatically captures inbound leads from website forms, ads, and landing pages into your CRM.",
      },
      {
        name: "Lead Assignment Router",
        price: 400,
        description:
          "Routes new leads to the right team member based on territory, availability, or round-robin rules.",
      },
      {
        name: "Welcome Sequence",
        price: 400,
        description:
          "Sends a personalized welcome email series to new leads or clients automatically.",
      },
      {
        name: "Lead Scoring Engine",
        price: 400,
        description: "Ranks incoming leads by engagement, fit criteria, and behavioral signals.",
      },
      {
        name: "Email Follow-up Sequences",
        price: 400,
        description:
          "Triggers automated follow-up email chains based on prospect activity and timing rules.",
      },
      {
        name: "SMS Reminder System",
        price: 400,
        description: "Sends automated SMS reminders for appointments, deadlines, and follow-ups.",
      },
      {
        name: "Missed Call Auto-Response",
        price: 400,
        description:
          "Automatically texts or emails callers when you miss their call with a personalized response.",
      },
      {
        name: "Review Request Automation",
        price: 400,
        description:
          "Sends review requests to clients after project milestones or completed services.",
      },
      {
        name: "Task Auto-Assignment",
        price: 400,
        description:
          "Automatically assigns tasks to team members based on workload, role, or project rules.",
      },
      {
        name: "Deadline Reminder System",
        price: 400,
        description:
          "Sends automated reminders for upcoming tasks, renewals, and important deadlines.",
      },
      {
        name: "Status Update Notifications",
        price: 400,
        description:
          "Posts automated status updates to Slack, email, or project boards when milestones change.",
      },
      {
        name: "Daily Digest Reports",
        price: 400,
        description:
          "Generates and delivers daily summary reports of key metrics and activity to your inbox.",
      },
    ],
  },
  tier2: {
    name: "Tier 2: Growth",
    color: "#06b6d4",
    colorClass: "border-l-cyan-500",
    automations: [
      {
        name: "Client Onboarding Workflow",
        price: 550,
        description:
          "Sends welcome emails, collects documents, assigns tasks, and sets up access for new clients.",
      },
      {
        name: "Document Collection System",
        price: 550,
        description:
          "Automatically requests, tracks, and organizes required documents from clients.",
      },
      {
        name: "Client Portal Access Setup",
        price: 550,
        description:
          "Provisions client portal accounts and permissions when new clients are onboarded.",
      },
      {
        name: "Renewal Processing",
        price: 550,
        description:
          "Tracks contract and policy renewal dates and triggers the renewal workflow automatically.",
      },
      {
        name: "Quote Generation Engine",
        price: 550,
        description:
          "Generates professional quotes from templates using project details and pricing rules.",
      },
      {
        name: "Proposal Builder",
        price: 550,
        description:
          "Creates client proposals from templates, pre-filled with project scope and pricing.",
      },
      {
        name: "Quote Follow-up Sequence",
        price: 550,
        description: "Sends timed follow-up emails after quotes are sent to improve close rates.",
      },
      {
        name: "Pricing Calculator Integration",
        price: 550,
        description:
          "Embeds dynamic pricing calculations into your quoting workflow based on real-time data.",
      },
      {
        name: "Invoice Generation & Sending",
        price: 550,
        description: "Creates and sends invoices automatically from project or billing data.",
      },
      {
        name: "Payment Reminder Workflow",
        price: 550,
        description: "Sends automated payment reminders for overdue and upcoming invoices.",
      },
      {
        name: "Payment Confirmation System",
        price: 550,
        description: "Sends confirmation emails and updates records when payments are received.",
      },
      {
        name: "Subscription Billing Automation",
        price: 550,
        description:
          "Manages recurring billing cycles, charges, and payment tracking automatically.",
      },
      {
        name: "Data Enrichment Pipeline",
        price: 550,
        description:
          "Enriches contact and company records with data from external sources automatically.",
      },
      {
        name: "Duplicate Detection & Merge",
        price: 550,
        description: "Identifies and merges duplicate records across your CRM and databases.",
      },
      {
        name: "Record Cleanup Automation",
        price: 550,
        description:
          "Standardizes, validates, and cleans data fields across your systems on a schedule.",
      },
      {
        name: "Cross-Platform Data Sync",
        price: 550,
        description:
          "Keeps data consistent across CRM, email, accounting, and other platforms in real time.",
      },
    ],
  },
  tier3: {
    name: "Tier 3: Scale",
    color: "#a855f7",
    colorClass: "border-l-purple-500",
    automations: [
      {
        name: "Multi-Stakeholder Approval Workflow",
        price: 700,
        description:
          "Routes documents and requests through multi-step approval chains with notifications.",
      },
      {
        name: "Policy/Service Renewal Engine",
        price: 700,
        description:
          "Manages complex renewal workflows with multi-touch reminders and document generation.",
      },
      {
        name: "Claims Processing",
        price: 700,
        description:
          "Automates claims intake, validation, routing, and status updates across stakeholders.",
      },
      {
        name: "Commission Calculation Engine",
        price: 700,
        description:
          "Calculates sales commissions based on custom rules, tiers, and deal structures.",
      },
      {
        name: "Executive Dashboard Builder",
        price: 700,
        description: "Creates live executive dashboards pulling data from all connected systems.",
      },
      {
        name: "Automated Performance Reports",
        price: 700,
        description:
          "Generates weekly or monthly performance reports with KPIs, trends, and insights.",
      },
      {
        name: "Pipeline Forecasting System",
        price: 700,
        description: "Projects revenue based on pipeline data, win rates, and historical trends.",
      },
      {
        name: "Client Health Score Monitor",
        price: 700,
        description:
          "Tracks engagement, satisfaction, and risk signals to flag at-risk clients early.",
      },
      {
        name: "AMS/CRM Integration Suite",
        price: 700,
        description: "Connects your agency management system or CRM with all operational tools.",
      },
      {
        name: "Accounting System Integration",
        price: 700,
        description:
          "Syncs invoices, payments, and financial data between your accounting and operational systems.",
      },
      {
        name: "Email Platform Integration",
        price: 700,
        description:
          "Connects email marketing platforms with your CRM for seamless campaign automation.",
      },
      {
        name: "Calendar Sync & Scheduling",
        price: 700,
        description:
          "Syncs calendars across platforms and automates scheduling based on availability rules.",
      },
      {
        name: "Abandoned Quote Recovery",
        price: 700,
        description:
          "Re-engages prospects who received quotes but didn't respond with targeted follow-ups.",
      },
      {
        name: "Referral Program Automation",
        price: 700,
        description:
          "Manages referral tracking, rewards, and communications for your referral program.",
      },
      {
        name: "Event/Webinar Registration System",
        price: 700,
        description: "Handles event registration, reminders, follow-ups, and attendee management.",
      },
      {
        name: "Lead Magnet Delivery",
        price: 700,
        description:
          "Automatically delivers lead magnets and triggers nurture sequences on download.",
      },
      {
        name: "Compliance Checklist Automation",
        price: 700,
        description:
          "Tracks regulatory requirements and automates compliance checklist completion.",
      },
      {
        name: "Audit Trail System",
        price: 700,
        description:
          "Maintains detailed audit logs of all system changes, approvals, and data modifications.",
      },
      {
        name: "E-Signature Workflow",
        price: 700,
        description:
          "Routes documents for electronic signature with reminders and status tracking.",
      },
      {
        name: "Certificate/License Expiry Tracking",
        price: 700,
        description:
          "Monitors expiration dates and triggers renewal workflows for certificates and licenses.",
      },
    ],
  },
  tier4: {
    name: "Tier 4: Enterprise",
    color: "#f59e0b",
    colorClass: "border-l-amber-500",
    automations: [
      {
        name: "Custom API Integration",
        price: 1000,
        description:
          "Connects any system with a custom-built API integration tailored to your workflow.",
      },
      {
        name: "AI-Powered Lead Qualification",
        price: 900,
        description:
          "Uses AI to qualify leads based on conversation analysis, behavior, and fit scoring.",
      },
      {
        name: "Advanced Reporting with Predictive Analytics",
        price: 1000,
        description:
          "Provides advanced dashboards with trend forecasting and predictive business insights.",
      },
      {
        name: "Multi-Channel Campaign Orchestration",
        price: 850,
        description:
          "Coordinates marketing campaigns across email, SMS, social, and ads from one workflow.",
      },
      {
        name: "Custom Workflow Builder",
        price: 0,
        description:
          "A bespoke automation designed to your exact specifications, included with any package.",
      },
    ],
  },
} as const satisfies Record<string, TierData>;

export const PACKAGES: Package[] = [
  {
    name: "Starter",
    price: 4995,
    displayPrice: "$4,995",
    description: "1 core workflow automated",
    features: [
      "5 Tier 1 automations",
      "CRM or portal integration",
      "5-day pilot included",
      "Email & chat support",
      "30-day optimization",
    ],
    featured: false,
  },
  {
    name: "Growth",
    price: 6995,
    displayPrice: "$6,995",
    description: "3-5 workflows automated",
    features: [
      "All Starter automations",
      "10 Tier 1-2 automations",
      "Multi-system integration",
      "Custom reporting dashboard",
      "Priority support",
      "60-day optimization",
    ],
    featured: true,
  },
  {
    name: "Scale",
    price: 9495,
    displayPrice: "$9,495",
    description: "Full operations automation",
    features: [
      "All Growth automations",
      "15 Tier 1-3 automations",
      "Workflow orchestration",
      "Predictive analytics",
      "Dedicated account manager",
      "90-day optimization",
    ],
    featured: false,
  },
  {
    name: "Enterprise",
    price: 12500,
    displayPrice: "$12,500+",
    description: "End-to-end enterprise AI",
    features: [
      "All Scale automations",
      "Unlimited automations",
      "Advanced AI configuration",
      "White-label solutions",
      "Quarterly strategy reviews",
      "Custom integrations",
      "Dedicated support team",
    ],
    featured: false,
  },
];

export const ADDONS: AddOn[] = [
  {
    name: "Quarterly Optimization",
    price: 750,
    description: "Quarterly review and optimization of all active automations.",
  },
  {
    name: "Custom Build",
    price: 0,
    description: "Bespoke automation built to your exact specifications. Book a call to scope it.",
  },
  {
    name: "Extended Support",
    price: 1200,
    description: "12-month extended support with priority response times.",
  },
  {
    name: "Data Migration",
    price: 1400,
    description: "Full data migration from legacy systems to automated workflows.",
  },
];
