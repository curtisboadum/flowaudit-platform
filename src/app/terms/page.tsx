import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service | FlowAudit",
  description:
    "FlowAudit terms covering the main FlowAudit services and Revenue Recovery Desk, including approvals, connectors, billing, and client responsibilities.",
  alternates: {
    canonical: "/terms",
  },
};

const UPDATED = "Last updated: June 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3 pt-4">
      <h2 className="font-sans text-xl font-semibold text-[#37322F]">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full max-w-[760px] px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:px-0 lg:pt-32">
        <Breadcrumbs items={[{ name: "Terms of Service", href: "/terms" }]} />
        <h1 className="mt-8 mb-3 font-serif text-3xl font-normal text-[#37322F] sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mb-8 font-sans text-sm text-[#605A57]">{UPDATED}</p>
        <div className="space-y-6 font-sans text-base leading-7 text-[#605A57]">
          <p>
            These terms cover FlowAudit&apos;s main services and the Revenue Recovery Desk. Where a section applies specifically to Revenue Recovery Desk, it is labelled clearly.
          </p>

          <Section title="1. Services">
            <p>
              FlowAudit provides AI operations assistant deployment, workflow automation, system integration, process improvement, and related advisory services. Revenue Recovery Desk is a FlowAudit service for accounts-receivable recovery support.
            </p>
          </Section>

          <Section title="2. Revenue Recovery Desk">
            <p>
              Revenue Recovery Desk helps clients identify overdue accounts, prepare recovery communications, manage approval workflows, track outcomes, and coordinate recovery activity across connected systems.
            </p>
            <p>
              The service is not a collections agency, law firm, credit bureau, or regulated debt-collection substitute. Clients remain responsible for their customer relationships, commercial decisions, legal compliance, and final approval of recovery actions.
            </p>
          </Section>

          <Section title="3. Client authorization and approvals">
            <p>
              Clients authorize FlowAudit to access agreed business systems only for the approved service scope. Recovery actions are governed by the client&apos;s configured policy, approval model, and guardrails.
            </p>
            <p>
              Sensitive actions, including customer outreach, physical letters, settlement offers, payment-plan changes, or escalation steps, may require human approval before sending or execution.
            </p>
          </Section>

          <Section title="4. Integrations and access">
            <p>
              Clients may connect systems such as Google Workspace, Microsoft 365, CRM platforms, accounting tools, payment processors, document systems, and postal-letter providers. The client is responsible for confirming that they have authority to grant access to those systems.
            </p>
            <p>
              FlowAudit uses connector scopes and credentials only to provide the agreed service. Clients should revoke access or request offboarding when the service ends.
            </p>
          </Section>

          <Section title="5. Client responsibilities">
            <p>
              Clients are responsible for providing accurate onboarding information, confirming recovery policies, reviewing drafts and approvals, maintaining lawful customer data, responding to disputes, and ensuring that recovery actions comply with their contracts, local laws, and industry rules.
            </p>
          </Section>

          <Section title="6. Fees and billing">
            <p>
              FlowAudit service fees, setup fees, retainers, success fees, pass-through costs, or other charges are agreed separately in the relevant order form, proposal, statement of work, or payment terms.
            </p>
            <p>
              Revenue Recovery Desk may involve pass-through costs for services such as postal letters, messaging, payment processing, or third-party provider usage where agreed or authorized.
            </p>
          </Section>

          <Section title="7. Ownership and data">
            <p>
              Clients retain ownership of their business data, workflows, customer records, invoices, and connected-system content. FlowAudit retains ownership of its software, automation patterns, templates, processes, and service materials unless otherwise agreed in writing.
            </p>
          </Section>

          <Section title="8. Acceptable use">
            <p>
              Clients must not use FlowAudit services for unlawful, abusive, misleading, harassing, discriminatory, or unauthorized activity. Clients must not provide credentials, data, or instructions that they are not authorized to provide.
            </p>
          </Section>

          <Section title="9. No guarantee of recovery or results">
            <p>
              FlowAudit works to improve operations and revenue recovery outcomes, but does not guarantee that any specific invoice, customer balance, payment, or commercial result will be recovered.
            </p>
          </Section>

          <Section title="10. Service availability and changes">
            <p>
              Services may depend on third-party systems, APIs, OAuth providers, email platforms, payment processors, postal services, hosting providers, and client systems. Availability may be affected by those providers or by changes to their policies and APIs.
            </p>
          </Section>

          <Section title="11. Liability">
            <p>
              To the maximum extent permitted by law, FlowAudit is not liable for indirect, consequential, incidental, special, punitive, or loss-of-profit damages. Any liability is limited to the amount paid for the relevant service during the period stated in the applicable agreement, unless law requires otherwise.
            </p>
          </Section>

          <Section title="12. Termination and offboarding">
            <p>
              Either party may end services according to the applicable agreement. During Revenue Recovery Desk offboarding, FlowAudit will disable live access, destroy live credentials where applicable, and retain records only as needed for legal, audit, or contractual purposes.
            </p>
          </Section>

          <Section title="13. Privacy">
            <p>
              Our handling of personal data and connected-system information is described in the FlowAudit Privacy Policy at /privacy.
            </p>
          </Section>

          <Section title="14. Contact">
            <p>
              For questions about these terms, contact FlowAudit through the booking or support channels on this website.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
