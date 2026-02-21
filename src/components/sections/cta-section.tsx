import Link from "next/link";
import { Button } from "@/components/ui/button";

function CTASection() {
  return (
    <section className="w-full flex flex-col items-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-0 relative overflow-hidden">
      {/* Diagonal line pattern background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 flex flex-wrap justify-center items-start rotate-[-5deg] scale-110 opacity-[0.03]">
          {Array.from({ length: 300 }).map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 border-r border-b border-[#37322F]"
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[700px] flex flex-col items-center text-center">
        <h2 className="text-[#37322F] text-2xl sm:text-3xl lg:text-5xl font-normal leading-tight font-serif">
          If You&apos;re Doing Repetitive Work Every Week — You Need an Assistant
        </h2>
        <p className="text-[#605A57] text-sm sm:text-base font-sans leading-7 mt-4 max-w-[500px]">
          Stop doing the same tasks manually. Let an AI assistant handle the repetitive work while
          you focus on growth.
        </p>

        <div className="flex w-full max-w-[360px] flex-col items-center gap-3 mt-8 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/book">Book a Call</Link>
          </Button>
          <Button variant="secondary" size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/#calculator">Calculate Time Savings</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export { CTASection };
