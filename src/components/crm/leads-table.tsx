"use client";

import { Pencil, Trash2, Plus, Upload } from "lucide-react";
import type { Lead } from "@/lib/crm-store";
import type { CrmLocale, CrmLocaleCopy } from "@/lib/crm-translations";
import { StatusBadge } from "@/components/crm/status-badge";

interface LeadsTableProps {
  leads: Lead[];
  locale: CrmLocale;
  copy: CrmLocaleCopy;
  isLoading: boolean;
  onAddLead: () => void;
  onImportCsv: () => void;
  onEditLead: (lead: Lead) => void;
  onDeleteLead: (lead: Lead) => void;
}

function formatDate(isoDate: string, locale: CrmLocale): string {
  try {
    return new Date(isoDate).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return isoDate;
  }
}

export function LeadsTable({
  leads,
  locale,
  copy,
  isLoading,
  onAddLead,
  onImportCsv,
  onEditLead,
  onDeleteLead,
}: LeadsTableProps) {
  const importLabel = locale === "es" ? "Importar CSV" : "Import CSV";

  return (
    <section className="rounded-xl border border-[rgba(55,50,47,0.12)] bg-white p-4 shadow-[0px_2px_8px_rgba(55,50,47,0.08)]">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="font-serif text-xl text-[#37322F]">{copy.sidebar.leads}</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onImportCsv}
            className="inline-flex items-center gap-2 rounded-lg border border-[rgba(55,50,47,0.15)] px-4 py-2 text-sm font-medium text-[#37322F] transition-colors hover:bg-[rgba(55,50,47,0.04)]"
          >
            <Upload className="h-4 w-4" />
            {importLabel}
          </button>
          <button
            type="button"
            onClick={onAddLead}
            className="inline-flex items-center gap-2 rounded-lg bg-[#2F3037] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#24252b]"
          >
            <Plus className="h-4 w-4" />
            {copy.table.addLead}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[rgba(55,50,47,0.12)] text-xs uppercase tracking-wide text-[#7C7571]">
              <th className="px-3 py-3 font-medium">{copy.table.name}</th>
              <th className="px-3 py-3 font-medium">{copy.table.company}</th>
              <th className="px-3 py-3 font-medium">{copy.table.email}</th>
              <th className="px-3 py-3 font-medium">{copy.table.phone}</th>
              <th className="px-3 py-3 font-medium">{copy.table.status}</th>
              <th className="px-3 py-3 font-medium">{copy.table.source}</th>
              <th className="px-3 py-3 font-medium">{copy.table.dateAdded}</th>
              <th className="px-3 py-3 font-medium">{copy.table.actions}</th>
            </tr>
          </thead>
          <tbody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={`skeleton-${index}`} className="border-b border-[rgba(55,50,47,0.06)]">
                  {Array.from({ length: 8 }).map((__, cellIndex) => (
                    <td key={`skeleton-cell-${index}-${cellIndex}`} className="px-3 py-3">
                      <div className="h-4 animate-pulse rounded bg-[rgba(55,50,47,0.08)]" />
                    </td>
                  ))}
                </tr>
              ))}

            {!isLoading && leads.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-12 text-center">
                  <p className="mb-1 text-base font-medium text-[#37322F]">{copy.table.emptyTitle}</p>
                  <p className="text-sm text-[#7C7571]">{copy.table.emptySubtitle}</p>
                </td>
              </tr>
            )}

            {!isLoading &&
              leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-[rgba(55,50,47,0.06)] transition-colors hover:bg-[rgba(55,50,47,0.03)]"
                >
                  <td className="px-3 py-3 font-medium text-[#37322F]">{lead.name}</td>
                  <td className="px-3 py-3 text-[#4f4946]">{lead.company || "-"}</td>
                  <td className="px-3 py-3 text-[#4f4946]">{lead.email}</td>
                  <td className="px-3 py-3 text-[#4f4946]">{lead.phone || "-"}</td>
                  <td className="px-3 py-3">
                    <StatusBadge status={lead.status} label={copy.status[lead.status]} />
                  </td>
                  <td className="px-3 py-3 text-[#4f4946]">{lead.source || "-"}</td>
                  <td className="px-3 py-3 text-[#4f4946]">{formatDate(lead.createdAt, locale)}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onEditLead(lead)}
                        className="rounded-md p-2 text-[#605A57] transition-colors hover:bg-[rgba(55,50,47,0.06)] hover:text-[#37322F]"
                        aria-label={copy.table.editLead}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteLead(lead)}
                        className="rounded-md p-2 text-[#605A57] transition-colors hover:bg-[rgba(239,68,68,0.12)] hover:text-[#b91c1c]"
                        aria-label={copy.table.deleteLead}
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
