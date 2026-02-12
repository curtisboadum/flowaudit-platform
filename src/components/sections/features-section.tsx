"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Task Automation",
    subtitle: "Removes repetitive work",
    description:
      "Moves data between systems, sends reminders automatically, updates clients, tracks renewals, and follows up on leads — without manual effort.",
    icon: Zap,
    items: [
      "CRM data syncing",
      "Automatic reminders",
      "Client status updates",
      "Renewal tracking",
      "Lead follow-ups",
    ],
  },
  {
    title: "Revenue Protection",
    subtitle: "Ensures nothing falls through the cracks",
    description:
      "Monitors deadlines, triggers payment reminders, flags overdue items, and keeps your pipeline moving so revenue doesn't slip away.",
    icon: Shield,
    items: [
      "Payment triggers",
      "Overdue alerts",
      "Pipeline monitoring",
      "Quote follow-ups",
      "Upsell reminders",
    ],
  },
  {
    title: "Operational Visibility",
    subtitle: "Provides clarity without manual reporting",
    description:
      "Builds weekly summaries, flags operational risks, generates status dashboards, and keeps your team informed automatically.",
    icon: Eye,
    items: [
      "Weekly summaries",
      "Risk flags",
      "Status dashboards",
      "Team notifications",
      "Performance tracking",
    ],
  },
] as const;

function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!mountedRef.current) return;
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveFeature((current) => (current + 1) % 3);
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

  const handleClick = (index: number) => {
    setActiveFeature(index);
    setProgress(0);
  };

  const active = features[activeFeature];

  return (
    <section className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-[616px] px-4 sm:px-6 py-10 sm:py-14 flex flex-col items-center gap-4 border-b border-[rgba(55,50,47,0.12)]">
        <Badge
          icon={
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="#37322F" strokeWidth="1" fill="none" />
              <path d="M7 4v3l2 2" stroke="#37322F" strokeWidth="1" strokeLinecap="round" />
            </svg>
          }
          text="What We Do"
        />
        <h2 className="text-center text-[#49423D] text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight font-sans tracking-tight">
          We Build You an AI Operations Assistant
        </h2>
        <p className="text-center text-[#605A57] text-sm sm:text-base leading-7 font-sans">
          Your assistant handles the work you keep doing every week so you can focus on what matters.
        </p>
      </div>

      {/* Content area */}
      <div className="w-full max-w-[1060px] grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Feature cards */}
        <div className="border-r-0 lg:border-r border-[rgba(55,50,47,0.12)]">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.title}
                onClick={() => handleClick(index)}
                className={cn(
                  "w-full px-6 sm:px-8 lg:px-12 py-6 flex items-start gap-4 text-left border-b border-[rgba(55,50,47,0.12)] relative transition-colors",
                  activeFeature === index ? "bg-white" : "hover:bg-white/50",
                )}
              >
                {activeFeature === index && (
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-[rgba(50,45,43,0.08)]">
                    <div
                      className="h-full bg-[#322D2B] transition-all duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
                <div className="w-10 h-10 rounded-lg bg-[#F0EDEB] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#37322F]" />
                </div>
                <div>
                  <div className="text-[#37322F] text-sm font-semibold font-sans">
                    {feature.title}
                  </div>
                  <div className="text-[#605A57] text-[13px] font-sans mt-1">
                    {feature.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        {active && (
          <div className="p-6 sm:p-8 lg:p-12 flex flex-col gap-6">
            <div>
              <h3 className="text-[#37322F] text-xl sm:text-2xl font-semibold font-sans">
                {active.title}
              </h3>
              <p className="text-[#605A57] text-sm leading-6 font-sans mt-3">
                {active.description}
              </p>
            </div>
            <ul className="space-y-3">
              {active.items.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#37322F]" />
                  <span className="text-sm text-[#37322F] font-medium font-sans">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export { FeaturesSection };
