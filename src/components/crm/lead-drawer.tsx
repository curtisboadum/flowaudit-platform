"use client";

import { useEffect, useMemo, useState } from "react";
import type { CreateLeadInput, Lead } from "@/lib/crm-store";
import type { CrmLocaleCopy } from "@/lib/crm-translations";

interface LeadDrawerProps {
  open: boolean;
  mode: "create" | "edit";
  lead: Lead | null;
  isAdmin: boolean;
  copy: CrmLocaleCopy;
  isSaving: boolean;
  onClose: () => void;
  onSubmit: (data: CreateLeadInput) => void;
}

function getInitialValues(isAdmin: boolean): CreateLeadInput {
  return {
    name: "",
    company: "",
    email: "",
    phone: "",
    status: "new",
    language: isAdmin ? "en" : "es",
    source: "",
    notes: "",
    assignedTo: isAdmin ? "admin" : "esteban",
  };
}

export function LeadDrawer({
  open,
  mode,
  lead,
  isAdmin,
  copy,
  isSaving,
  onClose,
  onSubmit,
}: LeadDrawerProps) {
  const [formValues, setFormValues] = useState<CreateLeadInput>(() => getInitialValues(isAdmin));

  const statusOptions = useMemo(
    () => [
      { value: "new", label: copy.status.new },
      { value: "contacted", label: copy.status.contacted },
      { value: "qualified", label: copy.status.qualified },
      { value: "proposal", label: copy.status.proposal },
      { value: "won", label: copy.status.won },
      { value: "lost", label: copy.status.lost },
    ],
    [copy],
  );

  useEffect(() => {
    if (mode === "edit" && lead) {
      setFormValues({
        name: lead.name,
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        status: lead.status,
        language: lead.language,
        source: lead.source,
        notes: lead.notes,
        assignedTo: lead.assignedTo,
      });
      return;
    }

    setFormValues(getInitialValues(isAdmin));
  }, [isAdmin, lead, mode, open]);

  function updateField<K extends keyof CreateLeadInput>(key: K, value: CreateLeadInput[K]) {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(formValues);
  }

  return (
    <>
      <div
        role="presentation"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed top-0 right-0 z-50 h-screen w-full max-w-[400px] border-l border-[rgba(55,50,47,0.12)] bg-white shadow-[0px_2px_8px_rgba(55,50,47,0.08)] transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <form className="flex h-full flex-col" onSubmit={handleSubmit}>
          <div className="border-b border-[rgba(55,50,47,0.12)] px-5 py-4">
            <h3 className="font-serif text-2xl text-[#37322F]">
              {mode === "create" ? copy.drawer.addTitle : copy.drawer.editTitle}
            </h3>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-[#37322F]">{copy.drawer.name}</span>
              <input
                required
                value={formValues.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-[#37322F]">
                {copy.drawer.company}
              </span>
              <input
                value={formValues.company}
                onChange={(event) => updateField("company", event.target.value)}
                className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-[#37322F]">{copy.drawer.email}</span>
              <input
                required
                type="email"
                value={formValues.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-[#37322F]">{copy.drawer.phone}</span>
              <input
                value={formValues.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-[#37322F]">{copy.drawer.status}</span>
              <select
                value={formValues.status}
                onChange={(event) => updateField("status", event.target.value as CreateLeadInput["status"])}
                className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-[#37322F]">{copy.drawer.source}</span>
              <input
                value={formValues.source}
                onChange={(event) => updateField("source", event.target.value)}
                className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-[#37322F]">{copy.drawer.notes}</span>
              <textarea
                value={formValues.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                placeholder={copy.drawer.notesPlaceholder}
                rows={4}
                className="w-full resize-y rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
              />
            </label>

            {isAdmin && (
              <>
                <fieldset>
                  <legend className="mb-1 text-sm font-medium text-[#37322F]">{copy.drawer.language}</legend>
                  <div className="flex gap-2">
                    <label className="inline-flex items-center gap-2 rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm">
                      <input
                        type="radio"
                        name="language"
                        value="en"
                        checked={formValues.language === "en"}
                        onChange={() => updateField("language", "en")}
                      />
                      {copy.drawer.langEnglish}
                    </label>
                    <label className="inline-flex items-center gap-2 rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm">
                      <input
                        type="radio"
                        name="language"
                        value="es"
                        checked={formValues.language === "es"}
                        onChange={() => updateField("language", "es")}
                      />
                      {copy.drawer.langSpanish}
                    </label>
                  </div>
                </fieldset>

                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-[#37322F]">
                    {copy.drawer.assignedTo}
                  </span>
                  <select
                    value={formValues.assignedTo}
                    onChange={(event) =>
                      updateField("assignedTo", event.target.value as CreateLeadInput["assignedTo"])
                    }
                    className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                  >
                    <option value="admin">{copy.drawer.assignedAdmin}</option>
                    <option value="esteban">{copy.drawer.assignedEsteban}</option>
                  </select>
                </label>
              </>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-[rgba(55,50,47,0.12)] px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[rgba(55,50,47,0.15)] px-4 py-2 text-sm font-medium text-[#37322F] transition-colors hover:bg-[rgba(55,50,47,0.04)]"
            >
              {copy.common.cancel}
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-[#2F3037] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#24252b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? copy.common.loading : copy.common.save}
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}
