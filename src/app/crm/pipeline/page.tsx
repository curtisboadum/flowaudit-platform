"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CrmSidebar } from "@/components/crm/crm-sidebar";
import { PipelineBoard } from "@/components/crm/pipeline-board";
import type { CrmUser } from "@/lib/crm-auth";
import { getCrmTranslations, type CrmLocale } from "@/lib/crm-translations";
import type { Lead } from "@/lib/crm-store";

interface MeResponse {
  user?: CrmUser;
}

interface LeadsResponse {
  leads: Lead[];
}

export default function CrmPipelinePage() {
  const router = useRouter();
  const [user, setUser] = useState<CrmUser | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [authLoading, setAuthLoading] = useState(true);
  const [leadsLoading, setLeadsLoading] = useState(true);
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
        activePage="pipeline"
        user={user}
        locale={currentLocale}
        copy={copy}
        onLocaleChange={setAdminLocale}
        onLogout={() => void handleLogout()}
      />

      <main className="px-4 py-6 md:ml-[220px] md:px-8">
        <header className="mb-6">
          <h1 className="font-serif text-3xl text-[#37322F]">{copy.sidebar.pipeline}</h1>
          <p className="mt-2 text-sm text-[#605A57]">
            Grouped by status for a quick view of current pipeline flow.
          </p>
        </header>

        {error && (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <PipelineBoard leads={visibleLeads} copy={copy} isLoading={leadsLoading} />
      </main>
    </div>
  );
}
