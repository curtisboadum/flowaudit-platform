import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy | FlowAudit",
  description:
    "FlowAudit privacy policy covering the main FlowAudit site and Revenue Recovery Desk, including CRM, accounting, email, document, and payment data handling.",
  alternates: {
    canonical: "/privacy",
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

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full max-w-[760px] px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:px-0 lg:pt-32">
        <Breadcrumbs items={[{ name: "Privacy Policy", href: "/privacy" }]} />
        <h1 className="mt-8 mb-3 font-serif text-3xl font-normal text-[#37322F] sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mb-8 font-sans text-sm text-[#605A57]">{UPDATED}</p>
        <div className="space-y-6 font-sans text-base leading-7 text-[#605A57]">
          <p>
            This single privacy policy covers FlowAudit&apos;s main website and services, including the Revenue Recovery Desk. Where a section applies specifically to Revenue Recovery Desk, it is labelled clearly.
          </p>

          <Section title="1. Who we are">
            <p>
              FlowAudit provides AI operations, workflow automation, and revenue recovery services for businesses. You can contact us through the booking or support channels on this website.
            </p>
          </Section>

          <Section title="2. Information we collect for the main FlowAudit site">
            <p>
              We collect information you provide directly, such as your name, email address, company name, phone number, booking details, form responses, and messages you send to us.
            </p>
            <p>
              We may also collect basic usage and device information, such as pages visited, browser type, approximate location, timestamps, and referral source, to keep the site secure and improve our services.
            </p>
          </Section>

          <Section title="3. Revenue Recovery Desk data">
            <p>
              Revenue Recovery Desk helps clients identify overdue accounts, prepare recovery communications, manage approvals, and track recovery activity. To provide that service, we may process client-authorized business data such as customer contact details, invoice data, account balances, payment status, CRM records, support notes, and recovery history.
            </p>
            <p>
              If a client connects Google Workspace, Microsoft 365, a CRM, accounting platform, payment provider, or document system, we access only the data needed for the recovery workflow and only according to the scopes and permissions authorized by the client.
            </p>
          </Section>

          <Section title="4. Google Workspace data">
            <p>
              If a client authorizes Google Workspace access, Revenue Recovery Desk may use read-only Gmail or Drive metadata permissions to understand customer replies, disputes, promises to pay, bounced messages, recovery context, document locations, or client-provided recovery files.
            </p>
            <p>
              We do not sell Google user data. We do not use Google user data for advertising. We do not transfer Google user data to third parties except as necessary to provide or secure the service, comply with law, or with the client&apos;s explicit direction.
            </p>
            <p>
              Google Workspace access can be revoked by the client from their Google account security settings or by contacting FlowAudit support.
            </p>
          </Section>

          <Section title="5. How we use information">
            <p>
              We use information to provide and improve our services, respond to enquiries, operate Revenue Recovery Desk, prepare draft recovery actions, route approvals, maintain audit records, prevent abuse, secure our systems, and meet legal or contractual obligations.
            </p>
          </Section>

          <Section title="6. Human approval and client control">
            <p>
              Revenue Recovery Desk is designed around client authorization and human approval. Sensitive actions such as outreach, letters, payment-plan changes, settlements, and account escalations are gated by the agreed client policy and approval process.
            </p>
          </Section>

          <Section title="7. Sharing and processors">
            <p>
              We may use trusted service providers for hosting, authentication, email delivery, secure storage, automation, logging, payment processing, and postal-letter delivery. These providers process data only as needed to provide their services to us and our clients.
            </p>
            <p>
              We do not sell personal data.
            </p>
          </Section>

          <Section title="8. Security">
            <p>
              We use safeguards such as encryption in transit, restricted access, audit logging, least-privilege connector scopes where practical, approval gates, credential isolation, and secure vault workflows for sensitive integration keys.
            </p>
          </Section>

          <Section title="9. Retention">
            <p>
              We keep information only as long as needed to provide services, maintain audit and legal records, resolve disputes, meet contractual obligations, and comply with law. Revenue Recovery Desk client records may be retained for the agreed legal retention period after offboarding, while live credentials are destroyed during offboarding.
            </p>
          </Section>

          <Section title="10. Your choices">
            <p>
              You may request access, correction, deletion, or restriction of personal information where applicable. Clients can disconnect integrations, revoke OAuth access, request offboarding, or ask us to update business contact details.
            </p>
          </Section>

          <Section title="11. Changes to this policy">
            <p>
              We may update this policy as our services evolve. The latest version will be available at this page.
            </p>
          </Section>

          <Section title="12. Contact">
            <p>
              For privacy-related questions, contact FlowAudit through the booking or support channels on this website.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
