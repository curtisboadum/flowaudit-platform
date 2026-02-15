import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service — FlowAudit_",
  description:
    "FlowAudit_'s terms of service. Review our service agreements, ownership, and payment terms.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full max-w-[700px] px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:px-0 lg:pt-32">
        <Breadcrumbs items={[{ name: "Terms of Service", href: "/terms" }]} />
        <h1 className="mt-8 mb-8 font-serif text-3xl font-normal text-[#37322F] sm:text-4xl">
          Terms of Service
        </h1>
        <div className="space-y-6 font-sans text-base leading-7 text-[#605A57]">
          <p>
            By using FlowAudit_&apos;s services, you agree to these terms. Please read them
            carefully.
          </p>
          <h2 className="pt-4 font-sans text-xl font-semibold text-[#37322F]">Services</h2>
          <p>
            FlowAudit_ provides AI operations assistant deployment services, including workflow
            automation, system integration, and ongoing optimization.
          </p>
          <h2 className="pt-4 font-sans text-xl font-semibold text-[#37322F]">Ownership</h2>
          <p>
            You retain full ownership of your data, workflows, and configurations. FlowAudit_ does
            not claim any rights to your business data.
          </p>
          <h2 className="pt-4 font-sans text-xl font-semibold text-[#37322F]">Payment</h2>
          <p>
            Deployment fees are one-time charges based on the agreed scope. Optional monthly
            optimization packages are billed monthly.
          </p>
          <h2 className="pt-4 font-sans text-xl font-semibold text-[#37322F]">Contact</h2>
          <p>For questions about these terms, please contact us through our booking page.</p>
        </div>
      </div>
    </div>
  );
}
