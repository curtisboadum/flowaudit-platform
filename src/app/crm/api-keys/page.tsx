"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CrmSidebar } from "@/components/crm/crm-sidebar";
import type { CrmUser } from "@/lib/crm-auth";
import { getCrmTranslations, type CrmLocale } from "@/lib/crm-translations";
import type { ApiKey } from "@/lib/crm-api-key-store";

interface MeResponse {
  user?: CrmUser;
}

interface ApiKeysResponse {
  apiKeys: ApiKey[];
}

interface CreateApiKeyResponse {
  apiKey: ApiKey;
  rawKey: string;
}

function formatDateTime(value: string | null): string {
  if (!value) return "Never";

  try {
    return new Date(value).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
}

function maskKey(prefix: string): string {
  return `${prefix}••••••••`;
}

const LEAD_INGEST_EXAMPLE = JSON.stringify(
  {
    name: "Jane Doe",
    email: "jane@example.com",
    company: "Acme Ltd",
    phone: "+44 1234 567890",
    status: "new",
    source: "Website Contact Form",
    notes: "Interested in a call this week",
    language: "en",
    assigned_to: "admin",
  },
  null,
  2,
);

const WEB_LEAD_INGEST_EXAMPLE = JSON.stringify(
  {
    business_name: "Acme Roofing",
    email: "owner@acme-roofing.co.uk",
    owner_name: "Alex Smith",
    phone: "+44 1234 567890",
    industry: "Roofing",
    location: "Manchester",
    description: "Local roofing specialist serving domestic customers.",
    usp: "24-hour emergency callout",
    target_audience: "Homeowners",
    source: "Typeform",
    notes: "Asked about a fast turnaround",
    primary_goal: "leads",
    budget: "1000-3000",
    timeline: "asap",
    priority: "high",
    services: ["Roof Repair", "Gutter Installation"],
    pages_needed: ["home", "services", "contact"],
  },
  null,
  2,
);

export default function CrmApiKeysPage() {
  const router = useRouter();
  const [user, setUser] = useState<CrmUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [keysLoading, setKeysLoading] = useState(true);
  const [adminLocale, setAdminLocale] = useState<CrmLocale>("en");
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [error, setError] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [rawKey, setRawKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const currentLocale: CrmLocale = user?.role === "esteban" ? "es" : adminLocale;
  const copy = getCrmTranslations(currentLocale);

  const activeCount = useMemo(
    () => apiKeys.filter((key) => key.isActive).length,
    [apiKeys],
  );

  const fetchApiKeys = useCallback(async () => {
    setKeysLoading(true);
    setError("");

    try {
      const response = await fetch("/api/crm/api-keys", { method: "GET" });
      if (response.status === 401) {
        router.replace("/crm/login");
        return;
      }

      if (response.status === 403) {
        setApiKeys([]);
        setError("Only admins can access API Keys.");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to load API keys");
      }

      const data = (await response.json()) as ApiKeysResponse;
      setApiKeys(data.apiKeys);
    } catch {
      setError("Could not load API keys.");
    } finally {
      setKeysLoading(false);
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
        setKeysLoading(false);
        setApiKeys([]);
        setError("Only admins can access API Keys.");
        return;
      }
      void fetchApiKeys();
    }
  }, [authLoading, fetchApiKeys, user]);

  async function handleLogout() {
    await fetch("/api/crm/auth/logout", { method: "POST" });
    router.replace("/crm/login");
  }

  function closeCreateModal() {
    setCreateModalOpen(false);
    setKeyName("");
    setRawKey(null);
    setCopied(false);
    void fetchApiKeys();
  }

  async function handleCreateKey(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!keyName.trim()) return;

    setIsCreating(true);
    setError("");

    try {
      const response = await fetch("/api/crm/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: keyName }),
      });

      if (response.status === 401) {
        router.replace("/crm/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to create API key");
      }

      const data = (await response.json()) as CreateApiKeyResponse;
      setRawKey(data.rawKey);
      setCopied(false);
      setApiKeys((prev) => [data.apiKey, ...prev]);
    } catch {
      setError("Could not create API key.");
    } finally {
      setIsCreating(false);
    }
  }

  async function copyRawKey() {
    if (!rawKey) return;

    try {
      await navigator.clipboard.writeText(rawKey);
      setCopied(true);
    } catch {
      setCopied(false);
      setError("Could not copy key to clipboard.");
    }
  }

  async function handleKeyAction(key: ApiKey, action: "revoke" | "delete") {
    const confirmed = window.confirm(
      action === "revoke"
        ? "Revoke this API key? Ingest requests using this key will stop working."
        : "Delete this API key permanently? This action cannot be undone.",
    );

    if (!confirmed) return;

    setError("");
    try {
      const response = await fetch(`/api/crm/api-keys/${key.id}?action=${action}`, { method: "DELETE" });
      if (response.status === 401) {
        router.replace("/crm/login");
        return;
      }
      if (!response.ok) {
        throw new Error("Action failed");
      }
      await fetchApiKeys();
    } catch {
      setError(`Could not ${action} API key.`);
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
        activePage="api-keys"
        user={user}
        locale={currentLocale}
        copy={copy}
        onLocaleChange={setAdminLocale}
        onLogout={() => void handleLogout()}
      />

      <main className="space-y-6 px-4 py-6 md:ml-[220px] md:px-8">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-serif text-3xl text-[#37322F]">API Keys</h1>
            <p className="mt-2 text-sm text-[#605A57]">
              Connect external systems to send leads directly into your CRM
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCreateModalOpen(true)}
            className="rounded-lg bg-[#2F3037] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#24252b]"
          >
            Create New Key
          </button>
        </header>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
        )}

        <section className="rounded-xl border border-[rgba(55,50,47,0.12)] bg-white p-4 shadow-[0px_2px_8px_rgba(55,50,47,0.08)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl text-[#37322F]">API Keys</h2>
            <p className="text-xs text-[#7C7571]">
              Active: <span className="font-semibold text-[#37322F]">{activeCount}</span>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[rgba(55,50,47,0.12)] text-xs uppercase tracking-wide text-[#7C7571]">
                  <th className="px-3 py-3 font-medium">Name</th>
                  <th className="px-3 py-3 font-medium">Key</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Last Used</th>
                  <th className="px-3 py-3 font-medium">Created</th>
                  <th className="px-3 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {keysLoading &&
                  Array.from({ length: 4 }).map((_, index) => (
                    <tr key={`skeleton-${index}`} className="border-b border-[rgba(55,50,47,0.06)]">
                      {Array.from({ length: 6 }).map((__, cellIndex) => (
                        <td key={`cell-${index}-${cellIndex}`} className="px-3 py-3">
                          <div className="h-4 animate-pulse rounded bg-[rgba(55,50,47,0.08)]" />
                        </td>
                      ))}
                    </tr>
                  ))}

                {!keysLoading && apiKeys.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-3 py-12 text-center">
                      <p className="text-base font-medium text-[#37322F]">No API keys yet</p>
                      <p className="mt-1 text-sm text-[#7C7571]">
                        Create a key to connect website forms, Zapier, n8n, and other systems.
                      </p>
                    </td>
                  </tr>
                )}

                {!keysLoading &&
                  apiKeys.map((key) => (
                    <tr
                      key={key.id}
                      className="border-b border-[rgba(55,50,47,0.06)] transition-colors hover:bg-[rgba(55,50,47,0.03)]"
                    >
                      <td className="px-3 py-3 font-medium text-[#37322F]">{key.name}</td>
                      <td className="px-3 py-3 font-mono text-[#4f4946]">{maskKey(key.keyPrefix)}</td>
                      <td className="px-3 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            key.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {key.isActive ? "Active" : "Revoked"}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-[#4f4946]">{formatDateTime(key.lastUsedAt)}</td>
                      <td className="px-3 py-3 text-[#4f4946]">{formatDateTime(key.createdAt)}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          {key.isActive && (
                            <button
                              type="button"
                              onClick={() => void handleKeyAction(key, "revoke")}
                              className="rounded-md border border-[rgba(55,50,47,0.16)] px-2.5 py-1 text-xs text-[#37322F] transition-colors hover:bg-[rgba(55,50,47,0.05)]"
                            >
                              Revoke
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => void handleKeyAction(key, "delete")}
                            className="rounded-md border border-red-200 px-2.5 py-1 text-xs text-red-700 transition-colors hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-[rgba(55,50,47,0.12)] bg-white p-5 shadow-[0px_2px_8px_rgba(55,50,47,0.08)]">
          <h2 className="font-serif text-xl text-[#37322F]">Integration Guide</h2>
          <p className="mt-2 text-sm text-[#605A57]">Use your API key to post leads into FlowAudit CRM.</p>

          <div className="mt-4 space-y-4">
            <div className="rounded-lg border border-[rgba(55,50,47,0.14)] bg-[#F7F5F3] p-4">
              <p className="text-xs uppercase tracking-wide text-[#7C7571]">Endpoint</p>
              <p className="mt-1 font-mono text-sm text-[#37322F]">
                POST https://flowaudit.co.uk/api/crm/ingest/leads
              </p>
              <p className="mt-3 text-xs uppercase tracking-wide text-[#7C7571]">Header</p>
              <p className="mt-1 font-mono text-sm text-[#37322F]">X-API-Key: your-key</p>
              <p className="mt-3 text-xs uppercase tracking-wide text-[#7C7571]">Example JSON</p>
              <pre className="mt-1 overflow-x-auto rounded bg-[#232323] p-3 text-xs text-[#f2f2f2]">
                <code>{LEAD_INGEST_EXAMPLE}</code>
              </pre>
            </div>

            <div className="rounded-lg border border-[rgba(55,50,47,0.14)] bg-[#F7F5F3] p-4">
              <p className="text-xs uppercase tracking-wide text-[#7C7571]">Web Leads Endpoint</p>
              <p className="mt-1 font-mono text-sm text-[#37322F]">
                POST https://flowaudit.co.uk/api/crm/ingest/web-leads
              </p>
              <p className="mt-3 text-xs uppercase tracking-wide text-[#7C7571]">Header</p>
              <p className="mt-1 font-mono text-sm text-[#37322F]">X-API-Key: your-key</p>
              <p className="mt-3 text-xs uppercase tracking-wide text-[#7C7571]">Example JSON</p>
              <pre className="mt-1 overflow-x-auto rounded bg-[#232323] p-3 text-xs text-[#f2f2f2]">
                <code>{WEB_LEAD_INGEST_EXAMPLE}</code>
              </pre>
            </div>
          </div>
        </section>
      </main>

      {createModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(20,20,20,0.45)] p-4">
          <div className="w-full max-w-xl rounded-xl border border-[rgba(55,50,47,0.16)] bg-white p-5 shadow-[0px_14px_40px_rgba(0,0,0,0.2)]">
            <h2 className="font-serif text-2xl text-[#37322F]">Create New Key</h2>

            {!rawKey && (
              <form onSubmit={handleCreateKey} className="mt-4 space-y-4">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-[#37322F]">Key Name</span>
                  <input
                    required
                    value={keyName}
                    onChange={(event) => setKeyName(event.target.value)}
                    placeholder="Website Contact Form"
                    className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                  />
                </label>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeCreateModal}
                    className="rounded-lg border border-[rgba(55,50,47,0.16)] px-4 py-2 text-sm text-[#37322F]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="rounded-lg bg-[#2F3037] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isCreating ? copy.common.loading : "Create Key"}
                  </button>
                </div>
              </form>
            )}

            {rawKey && (
              <div className="mt-4 space-y-4">
                <p className="text-sm text-[#605A57]">
                  Save this key now - it will never be shown again
                </p>

                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <p className="font-mono text-sm text-[#37322F] break-all">{rawKey}</p>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => void copyRawKey()}
                    className="rounded-lg border border-[rgba(55,50,47,0.16)] px-4 py-2 text-sm text-[#37322F]"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <button
                    type="button"
                    onClick={closeCreateModal}
                    className="rounded-lg bg-[#2F3037] px-4 py-2 text-sm font-medium text-white"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
