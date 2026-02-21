"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "I was spending 2 hours every evening chasing quotes and doing invoices. FlowAudit handles all of it now — I haven't opened a spreadsheet in 3 months. My close rate went up 20% just because quotes get followed up the same day.",
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
  {
    quote:
      "I run a small plumbing operation. I figured AI was for big companies. Turns out it's perfect for businesses like mine — it does the office work I never had time for. Best money I've spent on my business.",
    name: "Tom Walsh",
    title: "Owner, Walsh Plumbing & Heating",
    initials: "TW",
  },
  {
    quote:
      "We tried hiring an office manager twice. Both times it didn't work out. FlowAudit costs less than a month of their salary and it never calls in sick. Our quoting is 3x faster now.",
    name: "Rachel Nguyen",
    title: "Director, Precision HVAC Solutions",
    initials: "RN",
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
    <section className="flex w-full flex-col items-center border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0 lg:py-24">
      <div className="flex w-full max-w-[700px] flex-col items-center">
        {/* Avatar */}
        {active && (
          <>
            <div
              className={cn(
                "mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#37322F] transition-all duration-500",
                isTransitioning ? "scale-95 opacity-60" : "scale-100 opacity-100",
              )}
            >
              <span className="font-sans text-lg font-semibold text-white">{active.initials}</span>
            </div>

            {/* Quote */}
            <blockquote
              className={cn(
                "text-center transition-all duration-500",
                isTransitioning
                  ? "scale-[0.98] opacity-60 blur-[2px]"
                  : "blur-0 scale-100 opacity-100",
              )}
            >
              <p className="font-serif text-lg leading-relaxed font-normal text-[#37322F] italic sm:text-xl lg:text-2xl">
                &ldquo;{active.quote}&rdquo;
              </p>
              <footer className="mt-6">
                <div className="font-sans text-sm font-semibold text-[#37322F]">{active.name}</div>
                <div className="mt-1 font-sans text-sm text-[#605A57]">{active.title}</div>
              </footer>
            </blockquote>
          </>
        )}

        {/* Navigation */}
        <div className="mt-10 flex items-center gap-4">
          <button
            onClick={goToPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(55,50,47,0.12)] transition-colors hover:bg-white"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4 text-[#37322F]" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  activeIndex === index ? "bg-[#37322F]" : "bg-[rgba(55,50,47,0.15)]",
                )}
              />
            ))}
          </div>
          <button
            onClick={goToNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(55,50,47,0.12)] transition-colors hover:bg-white"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4 text-[#37322F]" />
          </button>
        </div>
      </div>
    </section>
  );
}

export { TestimonialsSection };
