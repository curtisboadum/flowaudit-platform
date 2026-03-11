"use client";

import type { Lead, LeadStatus } from "@/lib/crm-store";
import { StatusBadge } from "@/components/crm/status-badge";
import type { CrmLocaleCopy } from "@/lib/crm-translations";

interface PipelineBoardProps {
  leads: Lead[];
  copy: CrmLocaleCopy;
  isLoading: boolean;
}

const PIPELINE_COLUMNS: LeadStatus[] = ["new", "contacted", "qualified", "proposal", "won", "lost"];

export function PipelineBoard({ leads, copy, isLoading }: PipelineBoardProps) {
  return (
    <section className="overflow-x-auto">
      <div className="grid min-w-[1080px] grid-cols-6 gap-4">
        {PIPELINE_COLUMNS.map((status) => {
          const columnLeads = leads.filter((lead) => lead.status === status);

          return (
            <div
              key={status}
              className="rounded-xl border border-[rgba(55,50,47,0.12)] bg-white/90 p-3 shadow-[0px_2px_8px_rgba(55,50,47,0.08)]"
            >
              <div className="mb-3 flex items-center justify-between border-b border-[rgba(55,50,47,0.08)] pb-2">
                <h2 className="text-sm font-medium text-[#37322F]">{copy.status[status]}</h2>
                <span className="text-xs text-[#7C7571]">{columnLeads.length}</span>
              </div>

              <div className="space-y-2">
                {isLoading &&
                  Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={`skeleton-${status}-${index}`}
                      className="rounded-lg border border-[rgba(55,50,47,0.08)] p-3"
                    >
                      <div className="mb-2 h-4 animate-pulse rounded bg-[rgba(55,50,47,0.08)]" />
                      <div className="mb-3 h-3 animate-pulse rounded bg-[rgba(55,50,47,0.06)]" />
                      <div className="h-6 w-16 animate-pulse rounded-full bg-[rgba(55,50,47,0.08)]" />
                    </div>
                  ))}

                {!isLoading && columnLeads.length === 0 && (
                  <div className="rounded-lg border border-dashed border-[rgba(55,50,47,0.18)] px-3 py-6 text-center">
                    <p className="text-xs text-[#7C7571]">No leads</p>
                  </div>
                )}

                {!isLoading &&
                  columnLeads.map((lead) => (
                    <article
                      key={lead.id}
                      className="rounded-lg border border-[rgba(55,50,47,0.12)] bg-white p-3 shadow-[0px_1px_4px_rgba(55,50,47,0.08)] transition-all hover:-translate-y-[1px] hover:shadow-[0px_4px_10px_rgba(55,50,47,0.12)]"
                    >
                      <p className="truncate text-sm font-medium text-[#37322F]">{lead.name}</p>
                      <p className="mb-2 truncate text-xs text-[#7C7571]">{lead.company || "No company"}</p>
                      <StatusBadge status={lead.status} label={copy.status[lead.status]} />
                    </article>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
