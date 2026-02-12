"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "FlowAudit saved us 15 hours a week on client follow-ups alone. We stopped losing deals to slow responses and our close rate jumped by 20%.",
    name: "Marcus Rodriguez",
    title: "Owner, Summit Electrical Services",
    initials: "MR",
  },
  {
    quote:
      "I was skeptical about AI, but the pilot sold me in 3 days. Now my team focuses on billable work instead of copying data between spreadsheets.",
    name: "Sarah Chen",
    title: "Managing Partner, Cascade Insurance Group",
    initials: "SC",
  },
  {
    quote:
      "We went from manually tracking 200+ renewals to having everything automated. The ROI was obvious within the first month.",
    name: "David Okafor",
    title: "Operations Director, Atlas Property Management",
    initials: "DO",
  },
] as const;

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!mountedRef.current) return;
      goToNext();
    }, 12000);

    return () => {
      clearInterval(interval);
      mountedRef.current = false;
    };
  }, [activeIndex]);

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToPrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsTransitioning(false);
    }, 300);
  };

  const active = testimonials[activeIndex];

  return (
    <section className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col items-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-0">
      <div className="w-full max-w-[700px] flex flex-col items-center">
        {/* Avatar */}
        {active && (
          <>
            <div
              className={cn(
                "w-16 h-16 rounded-full bg-[#37322F] flex items-center justify-center mb-8 transition-all duration-500",
                isTransitioning ? "opacity-60 scale-95" : "opacity-100 scale-100",
              )}
            >
              <span className="text-white text-lg font-semibold font-sans">{active.initials}</span>
            </div>

            {/* Quote */}
            <blockquote
              className={cn(
                "text-center transition-all duration-500",
                isTransitioning ? "opacity-60 blur-[2px] scale-[0.98]" : "opacity-100 blur-0 scale-100",
              )}
            >
              <p className="text-[#37322F] text-lg sm:text-xl lg:text-2xl font-normal leading-relaxed font-serif italic">
                &ldquo;{active.quote}&rdquo;
              </p>
              <footer className="mt-6">
                <div className="text-[#37322F] text-sm font-semibold font-sans">{active.name}</div>
                <div className="text-[#605A57] text-sm font-sans mt-1">{active.title}</div>
              </footer>
            </blockquote>
          </>
        )}

        {/* Navigation */}
        <div className="flex items-center gap-4 mt-10">
          <button
            onClick={goToPrev}
            className="w-10 h-10 rounded-full border border-[rgba(55,50,47,0.12)] flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 text-[#37322F]" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  activeIndex === index ? "bg-[#37322F]" : "bg-[rgba(55,50,47,0.15)]",
                )}
              />
            ))}
          </div>
          <button
            onClick={goToNext}
            className="w-10 h-10 rounded-full border border-[rgba(55,50,47,0.12)] flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 text-[#37322F]" />
          </button>
        </div>
      </div>
    </section>
  );
}

export { TestimonialsSection };
