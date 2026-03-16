import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/crm-auth";
import { createApiKey, listApiKeys } from "@/lib/crm-api-keys";

export async function GET(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const keys = await listApiKeys();
  return NextResponse.json({ keys });
}

export async function POST(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = (body as Record<string, unknown>)?.name;
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  const result = await createApiKey({ name: name.trim(), createdBy: user.email });
  return NextResponse.json(result, { status: 201 });
}
