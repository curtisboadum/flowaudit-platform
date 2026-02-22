import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy | FlowAudit",
  description:
    "FlowAudit's privacy policy. Learn how we collect, use, and protect your information.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full max-w-[700px] px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:px-0 lg:pt-32">
        <Breadcrumbs items={[{ name: "Privacy Policy", href: "/privacy" }]} />
        <h1 className="mt-8 mb-8 font-serif text-3xl font-normal text-[#37322F] sm:text-4xl">
          Privacy Policy
        </h1>
        <div className="space-y-6 font-sans text-base leading-7 text-[#605A57]">
          <p>
            FlowAudit is committed to protecting your privacy. This policy explains how we collect,
            use, and safeguard your information.
          </p>
          <h2 className="pt-4 font-sans text-xl font-semibold text-[#37322F]">
            Information We Collect
          </h2>
          <p>
            We collect information you provide directly, such as your name, email, and company
            details when you book a call or contact us.
          </p>
          <h2 className="pt-4 font-sans text-xl font-semibold text-[#37322F]">
            How We Use Your Information
          </h2>
          <p>
            We use your information to provide our services, communicate with you, and improve our
            offerings. We never sell your data to third parties.
          </p>
          <h2 className="pt-4 font-sans text-xl font-semibold text-[#37322F]">Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data, including
            encryption at rest and in transit.
          </p>
          <h2 className="pt-4 font-sans text-xl font-semibold text-[#37322F]">Contact</h2>
          <p>For privacy-related questions, please contact us through our booking page.</p>
        </div>
      </div>
    </div>
  );
}
