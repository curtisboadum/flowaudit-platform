import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — FlowAudit",
};

export default function PrivacyPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full max-w-[700px] px-4 sm:px-6 lg:px-0 pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-20">
        <h1 className="text-[#37322F] text-3xl sm:text-4xl font-normal font-serif mb-8">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-[#605A57] text-base font-sans leading-7">
          <p>
            FlowAudit is committed to protecting your privacy. This policy explains how we collect,
            use, and safeguard your information.
          </p>
          <h2 className="text-[#37322F] text-xl font-semibold font-sans pt-4">
            Information We Collect
          </h2>
          <p>
            We collect information you provide directly, such as your name, email, and company
            details when you book a call or contact us.
          </p>
          <h2 className="text-[#37322F] text-xl font-semibold font-sans pt-4">
            How We Use Your Information
          </h2>
          <p>
            We use your information to provide our services, communicate with you, and improve our
            offerings. We never sell your data to third parties.
          </p>
          <h2 className="text-[#37322F] text-xl font-semibold font-sans pt-4">Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data, including
            encryption at rest and in transit.
          </p>
          <h2 className="text-[#37322F] text-xl font-semibold font-sans pt-4">Contact</h2>
          <p>For privacy-related questions, please contact us through our booking page.</p>
        </div>
      </div>
    </div>
  );
}
