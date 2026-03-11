"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCrmTranslations, type CrmLocale } from "@/lib/crm-translations";

interface MeResponse {
  user?: {
    role: "admin" | "esteban";
    email: string;
    name: string;
  };
}

export default function CrmLoginPage() {
  const router = useRouter();
  const [locale, setLocale] = useState<CrmLocale>("en");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const copy = getCrmTranslations(locale);

  useEffect(() => {
    const localeCookie = document.cookie.match(/(?:^|; )locale=([^;]*)/)?.[1];
    if (localeCookie === "es") {
      setLocale("es");
    }

    void (async () => {
      try {
        const response = await fetch("/api/crm/auth/me", { method: "GET" });
        if (!response.ok) return;
        const data = (await response.json()) as MeResponse;
        if (data.user) {
          router.replace("/crm");
          return;
        }
      } finally {
        setIsCheckingSession(false);
      }
    })();
  }, [router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/crm/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? copy.login.errorInvalid);
        return;
      }

      router.replace("/crm");
    } catch {
      setError(copy.login.errorInvalid);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isCheckingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5F3] px-4">
        <p className="text-sm text-[#605A57]">{copy.common.loading}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F5F3] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[rgba(55,50,47,0.12)] bg-white p-8 shadow-[0px_2px_8px_rgba(55,50,47,0.08)]">
        <div className="mb-8 flex items-center justify-between">
          <div className="w-14" />
          <p className="font-serif text-xl text-[#2F3037]">FlowAudit</p>
          <div className="flex rounded-lg bg-[rgba(55,50,47,0.06)] p-1">
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`rounded-md px-2 py-1 text-xs font-medium ${
                locale === "en" ? "bg-white text-[#37322F] shadow-sm" : "text-[#7C7571]"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale("es")}
              className={`rounded-md px-2 py-1 text-xs font-medium ${
                locale === "es" ? "bg-white text-[#37322F] shadow-sm" : "text-[#7C7571]"
              }`}
            >
              ES
            </button>
          </div>
        </div>

        <h1 className="font-serif text-3xl text-[#37322F]">{copy.login.title}</h1>
        <p className="mt-2 text-sm text-[#605A57]">{copy.login.subtitle}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-[#37322F]">{copy.login.email}</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-[#37322F]">
              {copy.login.password}
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
            />
          </label>

          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#2F3037] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#24252b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? copy.common.loading : copy.login.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
