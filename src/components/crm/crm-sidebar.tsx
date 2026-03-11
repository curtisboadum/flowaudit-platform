"use client";

import Link from "next/link";
import { Settings, LogOut, Workflow, Users } from "lucide-react";
import type { CrmUser } from "@/lib/crm-auth";
import type { CrmLocale, CrmLocaleCopy } from "@/lib/crm-translations";

interface CrmSidebarProps {
  activePage: "leads" | "pipeline" | "settings";
  user: CrmUser;
  locale: CrmLocale;
  copy: CrmLocaleCopy;
  onLocaleChange: (locale: CrmLocale) => void;
  onLogout: () => void;
}

function getUserInitials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0]?.slice(0, 1).toUpperCase() ?? "U";
  const first = parts[0]?.slice(0, 1) ?? "";
  const second = parts[1]?.slice(0, 1) ?? "";
  return `${first}${second}`.toUpperCase();
}

export function CrmSidebar({
  activePage,
  user,
  locale,
  copy,
  onLocaleChange,
  onLogout,
}: CrmSidebarProps) {
  const isAdmin = user.role === "admin";
  const navItemClass = "flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors";

  function getNavClass(page: CrmSidebarProps["activePage"], activePage: CrmSidebarProps["activePage"]) {
    if (page === activePage) {
      return `${navItemClass} bg-[rgba(55,50,47,0.05)] font-medium text-[#37322F]`;
    }
    return `${navItemClass} text-[#7C7571] hover:bg-[rgba(55,50,47,0.04)] hover:text-[#37322F]`;
  }

  return (
    <aside className="w-full border-b border-gray-100 bg-white md:fixed md:top-0 md:left-0 md:h-screen md:w-[220px] md:border-r md:border-b-0">
      <div className="flex h-full flex-col px-4 py-5">
        <div className="pb-6">
          <p className="font-serif text-xl text-[#2F3037]">FlowAudit</p>
        </div>

        <nav className="flex flex-col gap-1">
          <Link href="/crm" className={getNavClass("leads", activePage)}>
            <Users className="h-4 w-4" />
            {copy.sidebar.leads}
          </Link>

          <Link href="/crm/pipeline" className={getNavClass("pipeline", activePage)}>
            <Workflow className="h-4 w-4" />
            {copy.sidebar.pipeline}
          </Link>

          <Link href="/crm/settings" className={getNavClass("settings", activePage)}>
            <Settings className="h-4 w-4" />
            {copy.sidebar.settings}
          </Link>
        </nav>

        {isAdmin && (
          <div className="mt-6">
            <p className="mb-2 text-xs font-medium text-[#7C7571]">{copy.sidebar.language}</p>
            <div className="flex rounded-lg bg-[rgba(55,50,47,0.05)] p-1">
              <button
                type="button"
                onClick={() => onLocaleChange("en")}
                className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  locale === "en" ? "bg-white text-[#37322F] shadow-sm" : "text-[#7C7571]"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLocaleChange("es")}
                className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  locale === "es" ? "bg-white text-[#37322F] shadow-sm" : "text-[#7C7571]"
                }`}
              >
                ES
              </button>
            </div>
          </div>
        )}

        <div className="mt-auto border-t border-[rgba(55,50,47,0.12)] pt-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(55,50,47,0.1)] text-xs font-semibold text-[#37322F]">
              {getUserInitials(user.name)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[#37322F]">{user.name}</p>
              <p className="truncate text-xs text-[#7C7571]">{user.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm text-[#37322F] transition-colors hover:bg-[rgba(55,50,47,0.04)]"
          >
            <LogOut className="h-4 w-4" />
            {copy.sidebar.logout}
          </button>
        </div>
      </div>
    </aside>
  );
}
