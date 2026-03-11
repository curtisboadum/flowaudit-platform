import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/crm-auth";
import { createApiKey, getApiKeys } from "@/lib/crm-api-key-store";

function parseName(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export async function GET(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const apiKeys = await getApiKeys();
    return NextResponse.json({ apiKeys });
  } catch {
    return NextResponse.json({ error: "Failed to load API keys" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = parseName((body as Record<string, unknown>).name);
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  try {
    const result = await createApiKey(name, user.email);
    return NextResponse.json({ apiKey: result.key, rawKey: result.rawKey }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create API key" }, { status: 500 });
  }
}
