import { NextResponse } from "next/server";
import { validateApiKey } from "@/lib/crm-api-keys";
import { parseCreateWebLeadPayload } from "@/lib/crm-web-lead-validation";
import { createWebLead } from "@/lib/crm-web-store";

export async function POST(request: Request) {
  const apiKeyHeader = request.headers.get("x-api-key");
  if (!apiKeyHeader) {
    return NextResponse.json({ error: "X-API-Key header is required" }, { status: 401 });
  }

  const apiKey = await validateApiKey(apiKeyHeader);
  if (!apiKey) {
    return NextResponse.json({ error: "Invalid or revoked API key" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = parseCreateWebLeadPayload(body);
  if (!parsed) {
    return NextResponse.json({ error: "Invalid web lead payload" }, { status: 400 });
  }

  const lead = await createWebLead(parsed);
  return NextResponse.json({ lead }, { status: 201 });
}
