"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CrmSidebar } from "@/components/crm/crm-sidebar";
import { LeadDrawer } from "@/components/crm/lead-drawer";
import { LeadsTable } from "@/components/crm/leads-table";
import { ImportModal } from "@/components/crm/import-modal";
import type { CrmUser } from "@/lib/crm-auth";
import { getCrmTranslations, type CrmLocale } from "@/lib/crm-translations";
import type { CreateLeadInput, Lead } from "@/lib/crm-store";

interface MeResponse {
  user?: CrmUser;
}

interface LeadsResponse {
  leads: Lead[];
}

interface LeadResponse {
  lead: Lead;
}

type DrawerMode = "create" | "edit";

export default function CrmDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<CrmUser | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [authLoading, setAuthLoading] = useState(true);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>("create");
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [adminLocale, setAdminLocale] = useState<CrmLocale>("en");

  const currentLocale: CrmLocale = user?.role === "esteban" ? "es" : adminLocale;
  const copy = getCrmTranslations(currentLocale);

  const visibleLeads = useMemo(() => {
    if (user?.role === "esteban") return leads;
    return leads.filter((lead) => lead.language === currentLocale);
  }, [currentLocale, leads, user?.role]);

  const fetchLeads = useCallback(async () => {
    setLeadsLoading(true);
    try {
      const response = await fetch("/api/crm/leads", { method: "GET" });
      if (response.status === 401) {
        router.replace("/crm/login");
        return;
      }
      if (!response.ok) {
        throw new Error("Failed to load leads");
      }
      const data = (await response.json()) as LeadsResponse;
      setLeads(data.leads);
    } catch {
      setError("Could not load leads.");
    } finally {
      setLeadsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch("/api/crm/auth/me", { method: "GET" });
        if (!response.ok) {
          router.replace("/crm/login");
          return;
        }

        const data = (await response.json()) as MeResponse;
        if (!data.user) {
          router.replace("/crm/login");
          return;
        }

        setUser(data.user);
        if (data.user.role === "esteban") {
          setAdminLocale("es");
        }
      } catch {
        router.replace("/crm/login");
        return;
      } finally {
        setAuthLoading(false);
      }
    })();
  }, [router]);

  useEffect(() => {
    if (!authLoading && user) {
      void fetchLeads();
    }
  }, [authLoading, fetchLeads, user]);

  function openCreateDrawer() {
    setDrawerMode("create");
    setActiveLead(null);
    setDrawerOpen(true);
  }

  function openEditDrawer(lead: Lead) {
    setDrawerMode("edit");
    setActiveLead(lead);
    setDrawerOpen(true);
  }

  function openImportModal() {
    setImportModalOpen(true);
  }

  async function handleDelete(lead: Lead) {
    const shouldDelete = window.confirm(copy.table.deleteConfirm);
    if (!shouldDelete) return;

    try {
      const response = await fetch(`/api/crm/leads/${lead.id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Delete failed");
      }
      setLeads((prev) => prev.filter((item) => item.id !== lead.id));
    } catch {
      setError("Could not delete lead.");
    }
  }

  async function handleSaveLead(payload: CreateLeadInput) {
    setIsSaving(true);
    setError("");

    try {
      if (drawerMode === "edit" && activeLead) {
        const response = await fetch(`/api/crm/leads/${activeLead.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Update failed");
        }

        const data = (await response.json()) as LeadResponse;
        setLeads((prev) => prev.map((lead) => (lead.id === data.lead.id ? data.lead : lead)));
      } else {
        const response = await fetch("/api/crm/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Create failed");
        }

        const data = (await response.json()) as LeadResponse;
        setLeads((prev) => [data.lead, ...prev]);
      }

      setDrawerOpen(false);
      setActiveLead(null);
      setDrawerMode("create");
    } catch {
      setError("Could not save lead.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/crm/auth/logout", { method: "POST" });
    router.replace("/crm/login");
  }

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <p className="text-sm text-[#605A57]">{copy.common.loading}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      <CrmSidebar
        activePage="leads"
        user={user}
        locale={currentLocale}
        copy={copy}
        onLocaleChange={setAdminLocale}
        onLogout={() => void handleLogout()}
      />

      <main className="px-4 py-6 md:ml-[220px] md:px-8">
        <header className="mb-6">
          <h1 className="font-serif text-3xl text-[#37322F]">{copy.dashboard.title}</h1>
          <p className="mt-2 text-sm text-[#605A57]">
            {user.role === "admin" ? copy.dashboard.subtitleAdmin : copy.dashboard.subtitleEsteban}
          </p>
        </header>

        {error && (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <LeadsTable
          leads={visibleLeads}
          locale={currentLocale}
          copy={copy}
          isLoading={leadsLoading}
          onAddLead={openCreateDrawer}
          onImportCsv={openImportModal}
          onEditLead={openEditDrawer}
          onDeleteLead={handleDelete}
        />
      </main>

      <LeadDrawer
        open={drawerOpen}
        mode={drawerMode}
        lead={activeLead}
        isAdmin={user.role === "admin"}
        copy={copy}
        isSaving={isSaving}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSaveLead}
      />

      <ImportModal
        open={importModalOpen}
        locale={currentLocale}
        onClose={() => setImportModalOpen(false)}
        onImported={fetchLeads}
      />
    </div>
  );
}
