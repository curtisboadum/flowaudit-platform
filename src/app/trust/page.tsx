import Link from "next/link";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Trust & technical considerations",
  "What recorded evidence establishes, what requires assessment, and how FlowAudit approaches access, privacy, testing and approval.",
  "/trust",
);
export default function Page() {
  return (
    <>
      <section lang="en" className="fa-container fa-page-intro">
        <p className="fa-eyebrow">Trust & technical considerations</p>
        <h1>
          Know what is demonstrated.
          <br />
          Agree what comes next.
        </h1>
        <p className="fa-lead">
          A dependable workflow begins with explicit boundaries, tested access and a responsible
          owner.
        </p>
      </section>
      <section lang="en" className="fa-container fa-section fa-sector-grid">
        {[
          [
            "Evidence and integration limits",
            "The public dental recording demonstrates an enquiry, appointment choices and Google Calendar booking. It does not establish compatibility with your CRM, practice-management or field-service system. Assess permissions, source-of-truth rules and failure cases for every proposed connection.",
          ],
          [
            "Access and responsibility",
            "Identify the minimum access required, who grants it, which actions need approval and how access is removed. Confirm human handoff, fallback and ownership before activation. No certification or security audit is claimed here.",
          ],
          [
            "Recording and privacy",
            "Assess AI disclosure, recording permissions, retention, data locations and provider responsibilities for your workflow and callers’ jurisdictions. USA and UK requirements require review for the specific setup. Do not treat this page as a claim of blanket legal compliance.",
          ],
          [
            "Testing, activation and support",
            "Run representative calls, interruptions, unavailable systems and unexpected requests. Review outcomes with your team and approve the setup before activation. Agree monitoring, support and change responsibilities privately.",
          ],
          [
            "Website measurement",
            "Optional page, video and booking-link measurement stays off until consent. We use approved event fields, not your booking-form answers, as analytics. A calendar opening is not a confirmed booking. Confirmation requires a genuine supported provider event.",
          ],
          [
            "Demonstrations and outcomes",
            "Recordings are demonstrations, not paying-customer testimonials. Editorial privacy edits must be disclosed. No revenue, savings, guaranteed availability, clinical triage or emergency-transfer outcome is inferred.",
          ],
        ].map(([title, body]) => (
          <article key={title} className="fa-call-proof">
            <h2 className="mb-4 text-2xl">{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <section className="fa-container fa-section">
        <Link className="fa-button" href="/book?service=phone-agent">
          Discuss your requirements ↗
        </Link>
        <p className="mt-6">
          <Link className="underline" href="/privacy">
            Website privacy policy
          </Link>
        </p>
      </section>
    </>
  );
}
