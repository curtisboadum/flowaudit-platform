import { NextResponse } from "next/server";
import { getUserFromRequest, validateCredentials } from "@/lib/crm-auth";

interface PasswordChangeBody {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface VercelEnvItem {
  id: string;
  key: string;
}

interface VercelEnvListResponse {
  envs?: unknown;
}

function parseBody(data: unknown): PasswordChangeBody | null {
  if (typeof data !== "object" || data === null) return null;

  const candidate = data as Partial<PasswordChangeBody>;
  if (
    typeof candidate.currentPassword !== "string" ||
    typeof candidate.newPassword !== "string" ||
    typeof candidate.confirmNewPassword !== "string"
  ) {
    return null;
  }

  return {
    currentPassword: candidate.currentPassword,
    newPassword: candidate.newPassword,
    confirmNewPassword: candidate.confirmNewPassword,
  };
}

function getPasswordEnvKey(email: string): "CRM_ADMIN_PASS" | "CRM_KOFI_PASS" | "CRM_ESTEBAN_PASS" | null {
  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedEmail === "curtis@flowaudit.co.uk") return "CRM_ADMIN_PASS";
  if (normalizedEmail === "daniels@flowaudit.co.uk") return "CRM_KOFI_PASS";
  if (normalizedEmail === "esteban@flowaudit.co.uk") return "CRM_ESTEBAN_PASS";
  return null;
}

function getVercelEnvItems(payload: unknown): VercelEnvItem[] {
  if (typeof payload !== "object" || payload === null) return [];

  const data = payload as VercelEnvListResponse;
  if (!Array.isArray(data.envs)) return [];

  return data.envs.flatMap((item) => {
    if (
      typeof item === "object" &&
      item !== null &&
      "id" in item &&
      "key" in item &&
      typeof item.id === "string" &&
      typeof item.key === "string"
    ) {
      return [{ id: item.id, key: item.key }];
    }
    return [];
  });
}

export async function POST(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsedBody = parseBody(body);
  if (!parsedBody) {
    return NextResponse.json({ error: "Invalid password payload" }, { status: 400 });
  }

  if (parsedBody.newPassword !== parsedBody.confirmNewPassword) {
    return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
  }

  if (parsedBody.newPassword.length < 8) {
    return NextResponse.json({ error: "New password must be at least 8 characters" }, { status: 400 });
  }

  const credentialRole = validateCredentials(user.email, parsedBody.currentPassword);
  if (!credentialRole) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
  }

  const envKey = getPasswordEnvKey(user.email);
  if (!envKey) {
    return NextResponse.json({ error: "Unsupported account" }, { status: 403 });
  }

  const vercelProjectId = process.env.VERCEL_PROJECT_ID;
  const vercelApiToken = process.env.VERCEL_API_TOKEN;
  if (!vercelProjectId || !vercelApiToken) {
    return NextResponse.json({ error: "Vercel API not configured" }, { status: 503 });
  }

  const listResponse = await fetch(
    `https://api.vercel.com/v9/projects/${encodeURIComponent(vercelProjectId)}/env?decrypt=true`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${vercelApiToken}`,
      },
      cache: "no-store",
    },
  );

  if (!listResponse.ok) {
    return NextResponse.json({ error: "Failed to query Vercel environment variables" }, { status: 502 });
  }

  const envListPayload = (await listResponse.json()) as unknown;
  const envItems = getVercelEnvItems(envListPayload);
  const envItem = envItems.find((item) => item.key === envKey);

  if (!envItem) {
    return NextResponse.json({ error: "Password environment variable not found" }, { status: 404 });
  }

  const updateResponse = await fetch(
    `https://api.vercel.com/v9/projects/${encodeURIComponent(vercelProjectId)}/env/${encodeURIComponent(envItem.id)}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${vercelApiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: parsedBody.newPassword }),
      cache: "no-store",
    },
  );

  if (!updateResponse.ok) {
    return NextResponse.json({ error: "Failed to update password in Vercel" }, { status: 502 });
  }

  return NextResponse.json({
    success: true,
    message: "Password updated. Changes take effect on next deployment.",
  });
}
