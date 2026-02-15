"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const workflowDemos = [
  {
    title: "Quote Follow-up",
    description: "Auto-chase every quote you send — no more deals falling through the cracks.",
    visual: TaskAutomationVisual,
  },
  {
    title: "Job Complete → Invoice",
    description: "Finish a job, invoice goes out. No more chasing payments weeks later.",
    visual: RevenueProtectionVisual,
  },
  {
    title: "Weekly Cash Flow Summary",
    description:
      "See what's coming in, what's overdue, and what needs chasing — every Monday morning.",
    visual: OperationalVisibilityVisual,
  },
] as const;

function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!mountedRef.current) return;
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((current) => (current + 1) % 3);
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => {
      clearInterval(interval);
      mountedRef.current = false;
    };
  }, []);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setProgress(0);
  };

  return (
    <section className="flex w-full flex-col items-center px-4 pt-24 pb-0 sm:px-6 sm:pt-32 lg:px-0 lg:pt-44">
      {/* Headline */}
      <div className="flex w-full max-w-[748px] flex-col items-center gap-6 sm:gap-8">
        <h1 className="px-2 text-center font-serif text-3xl leading-[1.1] font-normal text-[#37322F] sm:text-5xl md:text-6xl lg:text-[80px]">
          Your Paperwork, Done Automatically
        </h1>
        <p className="max-w-[506px] text-center font-sans text-base leading-7 font-medium text-[rgba(55,50,47,0.80)] sm:text-lg">
          FlowAudit_ handles the admin you hate — quotes, follow-ups, invoicing — so your team can
          focus on the work that pays.
        </p>
      </div>

      {/* CTAs */}
      <div className="mt-8 flex items-center gap-4 sm:mt-10">
        <Button size="lg" asChild>
          <Link href="/#calculator">Calculate Your Time Savings</Link>
        </Button>
        <Button variant="secondary" size="lg" asChild>
          <Link href="/#how-it-works">See How It Works</Link>
        </Button>
      </div>
      <p className="mt-4 font-sans text-xs text-[rgba(55,50,47,0.50)]">
        Free strategy call — no commitment, no pressure.
      </p>

      {/* Dashboard preview */}
      <div className="mt-12 w-full max-w-[960px] sm:mt-16">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-white shadow-[0px_0px_0px_0.9px_rgba(0,0,0,0.08)] sm:rounded-xl">
          {workflowDemos.map((demo, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out",
                activeTab === index ? "blur-0 scale-100 opacity-100" : "scale-95 opacity-0 blur-sm",
              )}
            >
              <demo.visual />
            </div>
          ))}
        </div>
      </div>

      {/* Feature tabs */}
      <div className="flex w-full max-w-[960px] flex-col border-t border-b border-[#E0DEDB] md:flex-row">
        {workflowDemos.map((demo, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={cn(
              "relative flex-1 cursor-pointer border-b border-[#E0DEDB]/80 px-6 py-5 text-left transition-colors last:border-r-0 last:border-b-0 md:border-r md:border-b-0",
              activeTab === index
                ? "bg-white shadow-[0px_0px_0px_0.75px_#E0DEDB_inset]"
                : "hover:bg-white/50",
            )}
          >
            {activeTab === index && (
              <div className="absolute top-0 left-0 h-0.5 w-full bg-[rgba(50,45,43,0.08)]">
                <div
                  className="h-full bg-[#322D2B] transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
            <div className="font-sans text-sm leading-6 font-semibold text-[#49423D]">
              {demo.title}
            </div>
            <div className="mt-1 font-sans text-[13px] leading-[22px] font-normal text-[#605A57]">
              {demo.description}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function TaskAutomationVisual() {
  return (
    <div className="flex h-full w-full flex-col justify-center bg-gradient-to-br from-[#F7F5F3] to-white p-6 sm:p-10">
      <div className="mx-auto w-full max-w-md space-y-4">
        <div className="mb-6 font-sans text-xs tracking-wider text-[#605A57] uppercase">
          Live Workflow
        </div>
        {[
          { label: "Quote Sent to Client", status: "Completed", color: "bg-emerald-500" },
          { label: "Follow-up: Smith Kitchen Reno", status: "Completed", color: "bg-emerald-500" },
          { label: "Invoice: 42 Maple Drive Job", status: "Running", color: "bg-amber-500" },
          { label: "New Lead: Bathroom Refit", status: "Queued", color: "bg-gray-300" },
          { label: "Weekly Cash Flow Summary", status: "Queued", color: "bg-gray-300" },
        ].map((task) => (
          <div
            key={task.label}
            className="flex items-center justify-between rounded-lg border border-[rgba(55,50,47,0.08)] bg-white px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div className={cn("h-2 w-2 rounded-full", task.color)} />
              <span className="font-sans text-sm font-medium text-[#37322F]">{task.label}</span>
            </div>
            <span className="font-sans text-xs text-[#605A57]">{task.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RevenueProtectionVisual() {
  return (
    <div className="flex h-full w-full flex-col justify-center bg-gradient-to-br from-[#F7F5F3] to-white p-6 sm:p-10">
      <div className="mx-auto w-full max-w-md space-y-4">
        <div className="mb-6 font-sans text-xs tracking-wider text-[#605A57] uppercase">
          Revenue Protection
        </div>
        {[
          { label: "Quote Follow-up: Johnson HVAC", due: "Sent 3 days ago", amount: "$2,800" },
          { label: "Quote Follow-up: Smith Electric", due: "Sent 2 days ago", amount: "$6,500" },
          { label: "Invoice: Martinez Plumbing", due: "Overdue 5 days", amount: "$1,850" },
          { label: "New Quote: Davis Construction", due: "Requested today", amount: "$4,200" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg border border-[rgba(55,50,47,0.08)] bg-white px-4 py-3"
          >
            <div>
              <div className="font-sans text-sm font-medium text-[#37322F]">{item.label}</div>
              <div className="mt-0.5 font-sans text-xs text-[#605A57]">{item.due}</div>
            </div>
            <span className="font-sans text-sm font-semibold text-[#37322F]">{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OperationalVisibilityVisual() {
  return (
    <div className="flex h-full w-full flex-col justify-center bg-gradient-to-br from-[#F7F5F3] to-white p-6 sm:p-10">
      <div className="mx-auto w-full max-w-md space-y-5">
        <div className="mb-4 font-sans text-xs tracking-wider text-[#605A57] uppercase">
          Weekly Summary — Auto-Generated
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Jobs Invoiced", value: "47" },
            { label: "Hours Saved", value: "12.5" },
            { label: "Quotes Chased", value: "23" },
            { label: "Revenue Protected", value: "$27K" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-[rgba(55,50,47,0.08)] bg-white p-4"
            >
              <div className="font-sans text-2xl font-semibold text-[#37322F]">{stat.value}</div>
              <div className="mt-1 font-sans text-xs text-[#605A57]">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-[rgba(55,50,47,0.08)] bg-white p-4">
          <div className="font-sans text-xs font-medium text-amber-600">Risk Flag</div>
          <div className="mt-1 font-sans text-sm text-[#37322F]">
            2 quotes over 7 days old without a response
          </div>
        </div>
      </div>
    </div>
  );
}

export { HeroSection };
