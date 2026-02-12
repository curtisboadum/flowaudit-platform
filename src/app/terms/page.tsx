import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — FlowAudit",
};

export default function TermsPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full max-w-[700px] px-4 sm:px-6 lg:px-0 pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-20">
        <h1 className="text-[#37322F] text-3xl sm:text-4xl font-normal font-serif mb-8">
          Terms of Service
        </h1>
        <div className="space-y-6 text-[#605A57] text-base font-sans leading-7">
          <p>
            By using FlowAudit&apos;s services, you agree to these terms. Please read them
            carefully.
          </p>
          <h2 className="text-[#37322F] text-xl font-semibold font-sans pt-4">Services</h2>
          <p>
            FlowAudit provides AI operations assistant deployment services, including workflow
            automation, system integration, and ongoing optimization.
          </p>
          <h2 className="text-[#37322F] text-xl font-semibold font-sans pt-4">Ownership</h2>
          <p>
            You retain full ownership of your data, workflows, and configurations. FlowAudit does
            not claim any rights to your business data.
          </p>
          <h2 className="text-[#37322F] text-xl font-semibold font-sans pt-4">Payment</h2>
          <p>
            Deployment fees are one-time charges based on the agreed scope. Optional monthly
            optimization packages are billed monthly.
          </p>
          <h2 className="text-[#37322F] text-xl font-semibold font-sans pt-4">Contact</h2>
          <p>For questions about these terms, please contact us through our booking page.</p>
        </div>
      </div>
    </div>
  );
}
