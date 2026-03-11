"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CrmSidebar } from "@/components/crm/crm-sidebar";
import type { CrmUser } from "@/lib/crm-auth";
import { getCrmTranslations, type CrmLocale } from "@/lib/crm-translations";

interface MeResponse {
  user?: CrmUser;
}

interface PasswordResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

interface SettingsCopy {
  title: string;
  subtitle: string;
  account: string;
  accountDescription: string;
  name: string;
  email: string;
  security: string;
  securityDescription: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  updatePassword: string;
}

export default function CrmSettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<CrmUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [adminLocale, setAdminLocale] = useState<CrmLocale>("en");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const currentLocale: CrmLocale = user?.role === "esteban" ? "es" : adminLocale;
  const copy = getCrmTranslations(currentLocale);

  const settingsCopy = useMemo<SettingsCopy>(() => {
    if (currentLocale === "es") {
      return {
        title: "Configuracion",
        subtitle: "Gestiona la cuenta y actualiza tu contrasena de acceso al CRM.",
        account: "Cuenta",
        accountDescription: "Los datos de cuenta se muestran solo como referencia.",
        name: "Nombre",
        email: "Correo",
        security: "Seguridad",
        securityDescription: "Cambia tu contrasena para futuros inicios de sesion.",
        currentPassword: "Contrasena actual",
        newPassword: "Nueva contrasena",
        confirmNewPassword: "Confirmar nueva contrasena",
        updatePassword: "Actualizar contrasena",
      };
    }

    return {
      title: "Settings",
      subtitle: "Manage account details and update your CRM sign-in password.",
      account: "Account",
      accountDescription: "Account details are shown for reference only.",
      name: "Name",
      email: "Email",
      security: "Security",
      securityDescription: "Change your password for future logins.",
      currentPassword: "Current password",
      newPassword: "New password",
      confirmNewPassword: "Confirm new password",
      updatePassword: "Update password",
    };
  }, [currentLocale]);

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

  async function handleLogout() {
    await fetch("/api/crm/auth/logout", { method: "POST" });
    router.replace("/crm/login");
  }

  async function handlePasswordChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/crm/settings/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmNewPassword,
        }),
      });

      const data = (await response.json()) as PasswordResponse;
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to update password");
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setSuccess(data.message ?? "Password updated.");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to update password");
      }
    } finally {
      setSubmitting(false);
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
        activePage="settings"
        user={user}
        locale={currentLocale}
        copy={copy}
        onLocaleChange={setAdminLocale}
        onLogout={() => void handleLogout()}
      />

      <main className="space-y-6 px-4 py-6 md:ml-[220px] md:px-8">
        <header>
          <h1 className="font-serif text-3xl text-[#37322F]">{settingsCopy.title}</h1>
          <p className="mt-2 text-sm text-[#605A57]">{settingsCopy.subtitle}</p>
        </header>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {success && (
          <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
            {success}
          </p>
        )}

        <section className="rounded-xl border border-[rgba(55,50,47,0.12)] bg-white p-5 shadow-[0px_2px_8px_rgba(55,50,47,0.08)]">
          <h2 className="font-serif text-2xl text-[#37322F]">{settingsCopy.account}</h2>
          <p className="mt-1 text-sm text-[#7C7571]">{settingsCopy.accountDescription}</p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-[#37322F]">{settingsCopy.name}</span>
              <input
                readOnly
                value={user.name}
                className="w-full cursor-not-allowed rounded-lg border border-[rgba(55,50,47,0.15)] bg-[#F7F5F3] px-3 py-2 text-sm text-[#605A57]"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-[#37322F]">{settingsCopy.email}</span>
              <input
                readOnly
                value={user.email}
                className="w-full cursor-not-allowed rounded-lg border border-[rgba(55,50,47,0.15)] bg-[#F7F5F3] px-3 py-2 text-sm text-[#605A57]"
              />
            </label>
          </div>
        </section>

        <section className="rounded-xl border border-[rgba(55,50,47,0.12)] bg-white p-5 shadow-[0px_2px_8px_rgba(55,50,47,0.08)]">
          <h2 className="font-serif text-2xl text-[#37322F]">{settingsCopy.security}</h2>
          <p className="mt-1 text-sm text-[#7C7571]">{settingsCopy.securityDescription}</p>

          <form onSubmit={handlePasswordChange} className="mt-4 grid gap-4 md:max-w-[560px]">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-[#37322F]">
                {settingsCopy.currentPassword}
              </span>
              <input
                required
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-[#37322F]">
                {settingsCopy.newPassword}
              </span>
              <input
                required
                minLength={8}
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-[#37322F]">
                {settingsCopy.confirmNewPassword}
              </span>
              <input
                required
                minLength={8}
                type="password"
                value={confirmNewPassword}
                onChange={(event) => setConfirmNewPassword(event.target.value)}
                className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
              />
            </label>

            <div>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-[#2F3037] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#24252b] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? copy.common.loading : settingsCopy.updatePassword}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
