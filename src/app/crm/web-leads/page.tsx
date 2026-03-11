"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CrmSidebar } from "@/components/crm/crm-sidebar";
import { WebLeadDrawer } from "@/components/crm/web-lead-drawer";
import { WebLeadsTable } from "@/components/crm/web-leads-table";
import type { CrmUser } from "@/lib/crm-auth";
import { getCrmTranslations, type CrmLocale } from "@/lib/crm-translations";
import type { CreateWebLeadInput, WebLead } from "@/lib/crm-web-store";

interface MeResponse {
  user?: CrmUser;
}

interface WebLeadsResponse {
  leads: WebLead[];
}

interface WebLeadResponse {
  lead: WebLead;
}

type DrawerMode = "create" | "edit";

export default function CrmWebLeadsPage() {
  const router = useRouter();
  const [user, setUser] = useState<CrmUser | null>(null);
  const [webLeads, setWebLeads] = useState<WebLead[]>([]);
  const [authLoading, setAuthLoading] = useState(true);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>("create");
  const [activeLead, setActiveLead] = useState<WebLead | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [adminLocale, setAdminLocale] = useState<CrmLocale>("en");

  const currentLocale: CrmLocale = user?.role === "esteban" ? "es" : adminLocale;
  const copy = getCrmTranslations(currentLocale);

  const intakeCount = useMemo(
    () => webLeads.filter((lead) => lead.buildStage === "intake").length,
    [webLeads],
  );

  const buildingCount = useMemo(
    () => webLeads.filter((lead) => lead.buildStage === "building").length,
    [webLeads],
  );

  const liveCount = useMemo(
    () => webLeads.filter((lead) => lead.buildStage === "live").length,
    [webLeads],
  );

  const fetchWebLeads = useCallback(async () => {
    setLeadsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/crm/web-leads", { method: "GET" });
      if (response.status === 401) {
        router.replace("/crm/login");
        return;
      }

      if (response.status === 403) {
        setError("Only admins can access Web Leads.");
        setWebLeads([]);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to load web leads");
      }

      const data = (await response.json()) as WebLeadsResponse;
      setWebLeads(data.leads);
    } catch {
      setError("Could not load web leads.");
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
      if (user.role !== "admin") {
        setLeadsLoading(false);
        setWebLeads([]);
        setError("Only admins can access Web Leads.");
        return;
      }

      void fetchWebLeads();
    }
  }, [authLoading, fetchWebLeads, user]);

  function openCreateDrawer() {
    setDrawerMode("create");
    setActiveLead(null);
    setDrawerOpen(true);
  }

  function openEditDrawer(lead: WebLead) {
    setDrawerMode("edit");
    setActiveLead(lead);
    setDrawerOpen(true);
  }

  async function handleDelete(lead: WebLead) {
    const shouldDelete = window.confirm("Delete this web lead? This action cannot be undone.");
    if (!shouldDelete) return;

    try {
      const response = await fetch(`/api/crm/web-leads/${lead.id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Delete failed");
      }
      setWebLeads((prev) => prev.filter((item) => item.id !== lead.id));
    } catch {
      setError("Could not delete web lead.");
    }
  }

  async function handleSaveLead(payload: CreateWebLeadInput) {
    setIsSaving(true);
    setError("");

    try {
      if (drawerMode === "edit" && activeLead) {
        const response = await fetch(`/api/crm/web-leads/${activeLead.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Update failed");
        }

        const data = (await response.json()) as WebLeadResponse;
        setWebLeads((prev) => prev.map((lead) => (lead.id === data.lead.id ? data.lead : lead)));
      } else {
        const response = await fetch("/api/crm/web-leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Create failed");
        }

        const data = (await response.json()) as WebLeadResponse;
        setWebLeads((prev) => [data.lead, ...prev]);
      }

      setDrawerOpen(false);
      setActiveLead(null);
      setDrawerMode("create");
    } catch {
      setError("Could not save web lead.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/crm/auth/logout", { method: "POST" });
    router.replace("/crm/login");
  }

  function handleBriefGenerated(updatedLead: WebLead) {
    setWebLeads((prev) => prev.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead)));
    if (activeLead?.id === updatedLead.id) {
      setActiveLead(updatedLead);
    }
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
        activePage="web-leads"
        user={user}
        locale={currentLocale}
        copy={copy}
        onLocaleChange={setAdminLocale}
        onLogout={() => void handleLogout()}
      />

      <main className="space-y-6 px-4 py-6 md:ml-[220px] md:px-8">
        <header>
          <h1 className="font-serif text-3xl text-[#37322F]">{copy.sidebar.webLeads}</h1>
          <p className="mt-2 text-sm text-[#605A57]">
            Companies without a website. AI agents build them.
          </p>
        </header>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
        )}

        <section className="grid gap-3 sm:grid-cols-3">
          <article className="rounded-xl border border-[rgba(55,50,47,0.12)] bg-white p-4 shadow-[0px_2px_8px_rgba(55,50,47,0.08)]">
            <p className="text-xs uppercase tracking-wide text-[#7C7571]">Intake</p>
            <p className="mt-2 text-2xl font-semibold text-[#37322F]">{intakeCount}</p>
          </article>

          <article className="rounded-xl border border-[rgba(55,50,47,0.12)] bg-[#FFF8E1] p-4 shadow-[0px_2px_8px_rgba(55,50,47,0.08)]">
            <p className="text-xs uppercase tracking-wide text-[#7C7571]">Building</p>
            <p className="mt-2 text-2xl font-semibold text-[#37322F]">{buildingCount}</p>
          </article>

          <article className="rounded-xl border border-[rgba(55,50,47,0.12)] bg-[#E8F5E9] p-4 shadow-[0px_2px_8px_rgba(55,50,47,0.08)]">
            <p className="text-xs uppercase tracking-wide text-[#7C7571]">Live</p>
            <p className="mt-2 text-2xl font-semibold text-[#37322F]">{liveCount}</p>
          </article>
        </section>

        <WebLeadsTable
          leads={webLeads}
          isLoading={leadsLoading}
          onAddLead={openCreateDrawer}
          onEditLead={openEditDrawer}
          onDeleteLead={handleDelete}
        />
      </main>

      <WebLeadDrawer
        open={drawerOpen}
        mode={drawerMode}
        lead={activeLead}
        isAdmin={user.role === "admin"}
        isSaving={isSaving}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSaveLead}
        onBriefGenerated={handleBriefGenerated}
      />
    </div>
  );
}
