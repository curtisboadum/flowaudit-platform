import { NextResponse } from "next/server";
import { validateApiKey } from "@/lib/crm-api-keys";
import { parseCreateLeadPayload } from "@/lib/crm-lead-validation";
import { createLead } from "@/lib/crm-store";

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

  const parsed = parseCreateLeadPayload(body);
  if (!parsed) {
    return NextResponse.json({ error: "Invalid lead payload" }, { status: 400 });
  }

  const lead = await createLead(parsed);
  return NextResponse.json({ lead }, { status: 201 });
}
