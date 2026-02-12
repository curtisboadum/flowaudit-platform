import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

function PilotSection() {
  return (
    <section className="w-full border-b border-[rgba(55,50,47,0.12)] flex justify-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-0">
      <div className="w-full max-w-[800px] bg-[#37322F] rounded-2xl p-8 sm:p-12 lg:p-16 text-center">
        <div className="text-xs text-[rgba(255,255,255,0.5)] font-sans uppercase tracking-wider mb-4">
          Risk-Free Start
        </div>
        <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold font-sans leading-tight">
          Test One Workflow First
        </h2>
        <p className="text-[rgba(255,255,255,0.7)] text-sm sm:text-base font-sans leading-7 mt-4 max-w-[500px] mx-auto">
          Not sure if automation is right for you? Start small. Validate with one workflow before
          committing.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8">
          {[
            "5-day pilot",
            "One automation",
            "Measurable results",
            "Decide after validation",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-white font-sans">{item}</span>
            </div>
          ))}
        </div>

        <p className="text-[rgba(255,255,255,0.50)] text-xs font-sans mt-6">
          No credit card. No commitment. Just results.
        </p>
        <div className="mt-6">
          <Button
            variant="secondary"
            size="lg"
            className="bg-white text-[#37322F] hover:bg-[#F7F5F3]"
            asChild
          >
            <Link href="/book">Start With a Pilot</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export { PilotSection };
