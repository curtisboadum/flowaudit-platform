"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CrmSidebar } from "@/components/crm/crm-sidebar";
import type { CrmUser } from "@/lib/crm-auth";
import type { ApiKey } from "@/lib/crm-api-keys";
import { getCrmTranslations, type CrmLocale } from "@/lib/crm-translations";
import { Key, Plus, Trash2, Copy, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";

interface MeResponse {
  user?: CrmUser;
}

interface KeysResponse {
  keys: ApiKey[];
}

interface CreateKeyResponse {
  key: ApiKey;
  plaintext: string;
}

export default function ApiKeysPage() {
  const router = useRouter();
  const [user, setUser] = useState<CrmUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [keysLoading, setKeysLoading] = useState(true);
  const [locale, setLocale] = useState<CrmLocale>("en");
  const [createName, setCreateName] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [newPlaintext, setNewPlaintext] = useState<string | null>(null);
  const [showPlaintext, setShowPlaintext] = useState(false);
  const [copied, setCopied] = useState(false);
  const [revoking, setRevoking] = useState<string | null>(null);
  const [revokeError, setRevokeError] = useState("");

  const copy = getCrmTranslations(locale);

  const logout = useCallback(async () => {
    await fetch("/api/crm/auth/logout", { method: "POST" });
    router.push("/crm/login");
  }, [router]);

  useEffect(() => {
    fetch("/api/crm/auth/me")
      .then((r) => r.json() as Promise<MeResponse>)
      .then((data) => {
        if (!data.user) {
          router.push("/crm/login");
          return;
        }
        if (data.user.role !== "admin") {
          router.push("/crm");
          return;
        }
        setUser(data.user);
        setAuthLoading(false);
      })
      .catch(() => router.push("/crm/login"));
  }, [router]);

  const loadKeys = useCallback(async () => {
    setKeysLoading(true);
    try {
      const res = await fetch("/api/crm/api-keys");
      if (!res.ok) throw new Error("Failed to load keys");
      const data = (await res.json()) as KeysResponse;
      setKeys(data.keys);
    } catch {
      // noop
    } finally {
      setKeysLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading) loadKeys();
  }, [authLoading, loadKeys]);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!createName.trim()) return;
    setCreating(true);
    setCreateError("");
    setNewPlaintext(null);
    try {
      const res = await fetch("/api/crm/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: createName.trim() }),
      });
      const data = (await res.json()) as CreateKeyResponse & { error?: string };
      if (!res.ok) {
        setCreateError(data.error ?? "Failed to create key");
        return;
      }
      setNewPlaintext(data.plaintext);
      setShowPlaintext(true);
      setCreateName("");
      await loadKeys();
    } catch {
      setCreateError("Network error — please try again");
    } finally {
      setCreating(false);
    }
  }

  async function handleRevoke(id: string) {
    if (!confirm("Revoke this API key? This cannot be undone.")) return;
    setRevoking(id);
    setRevokeError("");
    try {
      const res = await fetch(`/api/crm/api-keys/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to revoke");
      setKeys((prev) => prev.map((k) => k.id === id ? { ...k, isActive: false } : k));
    } catch {
      setRevokeError("Failed to revoke key — please try again");
    } finally {
      setRevoking(null);
    }
  }

  async function handleCopy() {
    if (!newPlaintext) return;
    await navigator.clipboard.writeText(newPlaintext);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAF9]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#37322F] border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  const activeKeys = keys.filter((k) => k.isActive);
  const revokedKeys = keys.filter((k) => !k.isActive);

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF9] md:flex-row">
      <CrmSidebar
        activePage="api-keys"
        user={user}
        locale={locale}
        copy={copy}
        onLocaleChange={setLocale}
        onLogout={logout}
      />

      <main className="flex-1 px-4 py-6 md:ml-[220px] md:px-8 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(55,50,47,0.08)]">
              <Key className="h-4 w-4 text-[#37322F]" />
            </div>
            <h1 className="text-2xl font-semibold text-[#37322F]">API Keys</h1>
          </div>
          <p className="ml-12 text-sm text-[#7C7571]">
            Create keys to authenticate ingest endpoints. Each key is shown once — copy it immediately.
          </p>
        </div>

        {/* Ingest endpoint reference */}
        <div className="mb-8 rounded-xl border border-[rgba(55,50,47,0.12)] bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold text-[#37322F]">Ingest Endpoints</h2>
          <div className="space-y-2">
            {[
              { method: "POST", path: "/api/crm/ingest/leads", desc: "Create a CRM lead" },
              { method: "POST", path: "/api/crm/ingest/web-leads", desc: "Create a web lead" },
            ].map(({ method, path, desc }) => (
              <div key={path} className="flex items-center gap-3 text-sm">
                <span className="rounded bg-[#EEF2FF] px-2 py-0.5 text-xs font-semibold text-[#4F46E5]">{method}</span>
                <code className="font-mono text-[#37322F]">{path}</code>
                <span className="text-[#7C7571]">— {desc}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-[#7C7571]">
            Authenticate with <code className="rounded bg-[rgba(55,50,47,0.06)] px-1 py-0.5 font-mono">X-API-Key: &lt;key&gt;</code> header.
          </p>
        </div>

        {/* New key banner */}
        {newPlaintext && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-800">
              <CheckCircle className="h-4 w-4" />
              API key created — copy it now. It won&apos;t be shown again.
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <code className="block w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 font-mono text-sm text-[#37322F]">
                  {showPlaintext ? newPlaintext : "•".repeat(newPlaintext.length)}
                </code>
              </div>
              <button
                type="button"
                onClick={() => setShowPlaintext((s) => !s)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-200 bg-white text-[#7C7571] transition-colors hover:text-[#37322F]"
                title={showPlaintext ? "Hide" : "Show"}
              >
                {showPlaintext ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
              >
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                type="button"
                onClick={() => setNewPlaintext(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-200 bg-white text-[#7C7571] transition-colors hover:text-[#37322F]"
                title="Dismiss"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Create form */}
        <div className="mb-8 rounded-xl border border-[rgba(55,50,47,0.12)] bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-[#37322F]">Create New Key</h2>
          <form onSubmit={handleCreate} className="flex gap-3">
            <input
              type="text"
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              placeholder="Key name (e.g. n8n Webhook)"
              className="flex-1 rounded-lg border border-[rgba(55,50,47,0.2)] bg-white px-3 py-2 text-sm text-[#37322F] placeholder-[#B8B3AF] outline-none focus:border-[#37322F] focus:ring-1 focus:ring-[rgba(55,50,47,0.2)]"
              disabled={creating}
            />
            <button
              type="submit"
              disabled={creating || !createName.trim()}
              className="flex items-center gap-2 rounded-lg bg-[#37322F] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1C1917] disabled:opacity-50"
            >
              {creating ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              {creating ? "Creating..." : "Create Key"}
            </button>
          </form>
          {createError && (
            <div className="mt-3 flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {createError}
            </div>
          )}
        </div>

        {/* Active keys */}
        <div className="mb-8">
          <h2 className="mb-3 text-sm font-semibold text-[#37322F]">
            Active Keys{activeKeys.length > 0 && ` (${activeKeys.length})`}
          </h2>
          {revokeError && (
            <div className="mb-3 flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {revokeError}
            </div>
          )}
          {keysLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#37322F] border-t-transparent" />
            </div>
          ) : activeKeys.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[rgba(55,50,47,0.2)] py-10 text-center">
              <Key className="mx-auto mb-2 h-8 w-8 text-[#B8B3AF]" />
              <p className="text-sm text-[#7C7571]">No active keys yet. Create one above.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-[rgba(55,50,47,0.12)] bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(55,50,47,0.08)] bg-[rgba(55,50,47,0.03)]">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#7C7571]">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#7C7571]">Key Prefix</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#7C7571]">Created</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#7C7571]">Last Used</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-[#7C7571]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeKeys.map((k, i) => (
                    <tr
                      key={k.id}
                      className={i < activeKeys.length - 1 ? "border-b border-[rgba(55,50,47,0.06)]" : ""}
                    >
                      <td className="px-4 py-3 font-medium text-[#37322F]">{k.name}</td>
                      <td className="px-4 py-3">
                        <code className="rounded bg-[rgba(55,50,47,0.06)] px-2 py-0.5 font-mono text-xs text-[#37322F]">
                          {k.keyPrefix}...
                        </code>
                      </td>
                      <td className="px-4 py-3 text-[#7C7571]">
                        {new Date(k.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3 text-[#7C7571]">
                        {k.lastUsedAt
                          ? new Date(k.lastUsedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                          : <span className="italic text-[#B8B3AF]">Never</span>}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleRevoke(k.id)}
                          disabled={revoking === k.id}
                          className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 ml-auto"
                        >
                          {revoking === k.id ? (
                            <div className="h-3 w-3 animate-spin rounded-full border border-red-400 border-t-transparent" />
                          ) : (
                            <Trash2 className="h-3 w-3" />
                          )}
                          Revoke
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Revoked keys */}
        {revokedKeys.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-semibold text-[#7C7571]">
              Revoked Keys ({revokedKeys.length})
            </h2>
            <div className="overflow-hidden rounded-xl border border-[rgba(55,50,47,0.08)] bg-white opacity-60">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(55,50,47,0.06)] bg-[rgba(55,50,47,0.02)]">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#B8B3AF]">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#B8B3AF]">Key Prefix</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#B8B3AF]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {revokedKeys.map((k, i) => (
                    <tr
                      key={k.id}
                      className={i < revokedKeys.length - 1 ? "border-b border-[rgba(55,50,47,0.04)]" : ""}
                    >
                      <td className="px-4 py-3 text-[#B8B3AF] line-through">{k.name}</td>
                      <td className="px-4 py-3">
                        <code className="font-mono text-xs text-[#B8B3AF]">{k.keyPrefix}...</code>
                      </td>
                      <td className="px-4 py-3 text-[#B8B3AF]">
                        <span className="text-red-400">Revoked</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
