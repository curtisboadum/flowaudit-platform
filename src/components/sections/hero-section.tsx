"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const workflowDemos = [
  {
    title: "Task Automation",
    description: "Auto-sync CRM data, send reminders, and update clients without manual effort.",
    visual: TaskAutomationVisual,
  },
  {
    title: "Revenue Protection",
    description: "Never miss a follow-up, renewal, or payment trigger again.",
    visual: RevenueProtectionVisual,
  },
  {
    title: "Operational Visibility",
    description: "Weekly summaries, status dashboards, and risk flags — automatically.",
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
    <section className="pt-24 sm:pt-32 lg:pt-44 pb-0 flex flex-col items-center px-4 sm:px-6 lg:px-0 w-full">
      {/* Headline */}
      <div className="w-full max-w-[748px] flex flex-col items-center gap-6 sm:gap-8">
        <h1 className="text-center text-[#37322F] text-3xl sm:text-5xl md:text-6xl lg:text-[80px] font-normal leading-[1.1] font-serif px-2">
          Turn 10 Hours of Manual Work Into 10 Minutes
        </h1>
        <p className="max-w-[506px] text-center text-[rgba(55,50,47,0.80)] text-base sm:text-lg font-medium leading-7 font-sans">
          FlowAudit builds AI assistants that handle your repetitive admin — without losing quality,
          control, or oversight.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-4 mt-8 sm:mt-10">
        <Button size="lg" asChild>
          <Link href="/#calculator">Calculate Your Time Savings</Link>
        </Button>
        <Button variant="secondary" size="lg" asChild>
          <Link href="/#how-it-works">See How It Works</Link>
        </Button>
      </div>
      <p className="text-[rgba(55,50,47,0.50)] text-xs font-sans mt-4">
        Free strategy call — no commitment, no pressure.
      </p>

      {/* Dashboard preview */}
      <div className="w-full max-w-[960px] mt-12 sm:mt-16">
        <div className="w-full aspect-[16/9] bg-white shadow-[0px_0px_0px_0.9px_rgba(0,0,0,0.08)] overflow-hidden rounded-lg sm:rounded-xl relative">
          {workflowDemos.map((demo, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-all duration-500 ease-in-out flex items-center justify-center",
                activeTab === index
                  ? "opacity-100 scale-100 blur-0"
                  : "opacity-0 scale-95 blur-sm",
              )}
            >
              <demo.visual />
            </div>
          ))}
        </div>
      </div>

      {/* Feature tabs */}
      <div className="w-full max-w-[960px] border-t border-b border-[#E0DEDB] flex flex-col md:flex-row">
        {workflowDemos.map((demo, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={cn(
              "flex-1 px-6 py-5 text-left cursor-pointer relative border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-[#E0DEDB]/80 transition-colors",
              activeTab === index
                ? "bg-white shadow-[0px_0px_0px_0.75px_#E0DEDB_inset]"
                : "hover:bg-white/50",
            )}
          >
            {activeTab === index && (
              <div className="absolute top-0 left-0 w-full h-0.5 bg-[rgba(50,45,43,0.08)]">
                <div
                  className="h-full bg-[#322D2B] transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
            <div className="text-[#49423D] text-sm font-semibold leading-6 font-sans">
              {demo.title}
            </div>
            <div className="text-[#605A57] text-[13px] font-normal leading-[22px] font-sans mt-1">
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
    <div className="w-full h-full bg-gradient-to-br from-[#F7F5F3] to-white p-6 sm:p-10 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full space-y-4">
        <div className="text-xs text-[#605A57] font-sans uppercase tracking-wider mb-6">
          Live Workflow
        </div>
        {[
          { label: "CRM Sync", status: "Completed", color: "bg-emerald-500" },
          { label: "Invoice Reminder", status: "Completed", color: "bg-emerald-500" },
          { label: "Client Update", status: "Running", color: "bg-amber-500" },
          { label: "Lead Follow-up", status: "Queued", color: "bg-gray-300" },
          { label: "Weekly Report", status: "Queued", color: "bg-gray-300" },
        ].map((task) => (
          <div
            key={task.label}
            className="flex items-center justify-between bg-white rounded-lg border border-[rgba(55,50,47,0.08)] px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div className={cn("w-2 h-2 rounded-full", task.color)} />
              <span className="text-sm text-[#37322F] font-medium font-sans">{task.label}</span>
            </div>
            <span className="text-xs text-[#605A57] font-sans">{task.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RevenueProtectionVisual() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#F7F5F3] to-white p-6 sm:p-10 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full space-y-4">
        <div className="text-xs text-[#605A57] font-sans uppercase tracking-wider mb-6">
          Revenue Protection
        </div>
        {[
          { label: "Renewal: Johnson HVAC", due: "Due in 3 days", amount: "$4,200" },
          { label: "Quote Follow-up: Smith Electric", due: "Sent 2 days ago", amount: "$8,750" },
          { label: "Invoice: Martinez Plumbing", due: "Overdue 5 days", amount: "$2,100" },
          { label: "Upsell: Davis Construction", due: "Opportunity", amount: "$12,000" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between bg-white rounded-lg border border-[rgba(55,50,47,0.08)] px-4 py-3"
          >
            <div>
              <div className="text-sm text-[#37322F] font-medium font-sans">{item.label}</div>
              <div className="text-xs text-[#605A57] font-sans mt-0.5">{item.due}</div>
            </div>
            <span className="text-sm text-[#37322F] font-semibold font-sans">{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OperationalVisibilityVisual() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#F7F5F3] to-white p-6 sm:p-10 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full space-y-5">
        <div className="text-xs text-[#605A57] font-sans uppercase tracking-wider mb-4">
          Weekly Summary — Auto-Generated
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Tasks Completed", value: "47" },
            { label: "Hours Saved", value: "12.5" },
            { label: "Follow-ups Sent", value: "23" },
            { label: "Revenue Protected", value: "$27K" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-lg border border-[rgba(55,50,47,0.08)] p-4"
            >
              <div className="text-2xl text-[#37322F] font-semibold font-sans">{stat.value}</div>
              <div className="text-xs text-[#605A57] font-sans mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg border border-[rgba(55,50,47,0.08)] p-4">
          <div className="text-xs text-amber-600 font-medium font-sans">Risk Flag</div>
          <div className="text-sm text-[#37322F] font-sans mt-1">
            3 client renewals approaching deadline without confirmation
          </div>
        </div>
      </div>
    </div>
  );
}

export { HeroSection };
