"use client";

import { Globe, Pencil, Plus, Trash2 } from "lucide-react";
import type { BuildStage, WebLead, WebLeadPriority } from "@/lib/crm-web-store";

interface WebLeadsTableProps {
  leads: WebLead[];
  isLoading: boolean;
  onAddLead: () => void;
  onEditLead: (lead: WebLead) => void;
  onDeleteLead: (lead: WebLead) => void;
}

const PRIORITY_STYLES: Record<WebLeadPriority, string> = {
  urgent: "bg-red-100 text-red-700",
  high: "bg-orange-100 text-orange-700",
  medium: "bg-blue-100 text-blue-700",
  low: "bg-gray-100 text-gray-700",
};

const BUILD_STAGE_STYLES: Record<BuildStage, string> = {
  intake: "bg-gray-100 text-gray-700",
  researching: "bg-blue-100 text-blue-700",
  content_gen: "bg-purple-100 text-purple-700",
  building: "bg-[#FFF8E1] text-amber-800",
  review: "bg-orange-100 text-orange-700",
  live: "bg-[#E8F5E9] text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const BUILD_STAGE_LABELS: Record<BuildStage, string> = {
  intake: "Intake",
  researching: "Researching",
  content_gen: "Content Gen",
  building: "Building",
  review: "Review",
  live: "Live",
  cancelled: "Cancelled",
};

function formatDate(isoDate: string): string {
  try {
    return new Date(isoDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return isoDate;
  }
}

export function WebLeadsTable({
  leads,
  isLoading,
  onAddLead,
  onEditLead,
  onDeleteLead,
}: WebLeadsTableProps) {
  return (
    <section className="rounded-xl border border-[rgba(55,50,47,0.12)] bg-white p-4 shadow-[0px_2px_8px_rgba(55,50,47,0.08)]">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="font-serif text-xl text-[#37322F]">Lead Queue</h2>
        <button
          type="button"
          onClick={onAddLead}
          className="inline-flex items-center gap-2 rounded-lg bg-[#2F3037] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#24252b]"
        >
          <Plus className="h-4 w-4" />
          New Web Lead
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[rgba(55,50,47,0.12)] text-xs uppercase tracking-wide text-[#7C7571]">
              <th className="px-3 py-3 font-medium">Business Name</th>
              <th className="px-3 py-3 font-medium">Owner</th>
              <th className="px-3 py-3 font-medium">Industry</th>
              <th className="px-3 py-3 font-medium">Location</th>
              <th className="px-3 py-3 font-medium">Priority</th>
              <th className="px-3 py-3 font-medium">Build Stage</th>
              <th className="px-3 py-3 font-medium">Live URL</th>
              <th className="px-3 py-3 font-medium">Date Added</th>
              <th className="px-3 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={`skeleton-${index}`} className="border-b border-[rgba(55,50,47,0.06)]">
                  {Array.from({ length: 9 }).map((__, cellIndex) => (
                    <td key={`skeleton-cell-${index}-${cellIndex}`} className="px-3 py-3">
                      <div className="h-4 animate-pulse rounded bg-[rgba(55,50,47,0.08)]" />
                    </td>
                  ))}
                </tr>
              ))}

            {!isLoading && leads.length === 0 && (
              <tr>
                <td colSpan={9} className="px-3 py-12 text-center">
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(55,50,47,0.06)]">
                    <Globe className="h-5 w-5 text-[#7C7571]" />
                  </div>
                  <p className="mb-1 text-base font-medium text-[#37322F]">No web leads yet</p>
                  <p className="text-sm text-[#7C7571]">Create your first web lead to start the AI pipeline.</p>
                </td>
              </tr>
            )}

            {!isLoading &&
              leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-[rgba(55,50,47,0.06)] transition-colors hover:bg-[rgba(55,50,47,0.03)]"
                >
                  <td className="px-3 py-3 font-medium text-[#37322F]">{lead.businessName}</td>
                  <td className="px-3 py-3 text-[#4f4946]">{lead.ownerName || "-"}</td>
                  <td className="px-3 py-3 text-[#4f4946]">{lead.industry || "-"}</td>
                  <td className="px-3 py-3 text-[#4f4946]">{lead.location || "-"}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${PRIORITY_STYLES[lead.priority]}`}
                    >
                      {lead.priority}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${BUILD_STAGE_STYLES[lead.buildStage]}`}
                    >
                      {BUILD_STAGE_LABELS[lead.buildStage]}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-[#4f4946]">
                    {lead.liveUrl ? (
                      <a
                        href={lead.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#2F3037] underline decoration-[rgba(47,48,55,0.35)] underline-offset-2"
                      >
                        Open
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-3 py-3 text-[#4f4946]">{formatDate(lead.createdAt)}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onEditLead(lead)}
                        className="rounded-md p-2 text-[#605A57] transition-colors hover:bg-[rgba(55,50,47,0.06)] hover:text-[#37322F]"
                        aria-label="Edit web lead"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteLead(lead)}
                        className="rounded-md p-2 text-[#605A57] transition-colors hover:bg-[rgba(239,68,68,0.12)] hover:text-[#b91c1c]"
                        aria-label="Delete web lead"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
