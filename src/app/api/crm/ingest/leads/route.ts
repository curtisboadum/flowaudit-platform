import { NextResponse } from "next/server";
import { createLead, type LeadAssignee, type LeadLanguage, type LeadStatus } from "@/lib/crm-store";
import { validateApiKey } from "@/lib/crm-api-key-store";

const LEAD_STATUSES: LeadStatus[] = ["new", "contacted", "qualified", "proposal", "won", "lost"];
const LEAD_LANGUAGES: LeadLanguage[] = ["en", "es"];
const LEAD_ASSIGNEES: LeadAssignee[] = ["admin", "esteban"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeString(input: string): string {
  const withoutScripts = input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "");

  return withoutScripts.replace(/<[^>]*>/g, "").replace(/\u0000/g, "").trim();
}

function parseRequiredString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const sanitized = sanitizeString(value);
  return sanitized.length > 0 ? sanitized : null;
}

function parseOptionalString(value: unknown): string {
  if (typeof value !== "string") return "";
  return sanitizeString(value);
}

function parseEmail(value: unknown): string | null {
  const email = parseRequiredString(value);
  if (!email) return null;
  return EMAIL_REGEX.test(email) ? email : null;
}

function parseEnum<T extends string>(value: unknown, options: T[], fallback: T): T {
  if (typeof value !== "string") return fallback;
  const cleaned = sanitizeString(value);
  return options.includes(cleaned as T) ? (cleaned as T) : fallback;
}

export async function POST(request: Request) {
  const rawApiKey = request.headers.get("x-api-key");
  if (!rawApiKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let isValidApiKey = false;
  try {
    isValidApiKey = await validateApiKey(rawApiKey);
  } catch {
    return NextResponse.json({ error: "Failed to validate API key" }, { status: 500 });
  }

  if (!isValidApiKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  const payload = body as Record<string, unknown>;
  const name = parseRequiredString(payload.name);
  const email = parseEmail(payload.email);

  if (!name || !email) {
    return NextResponse.json({ error: "name and email are required" }, { status: 400 });
  }

  const status = parseEnum(payload.status, LEAD_STATUSES, "new");
  const language = parseEnum(payload.language, LEAD_LANGUAGES, "en");
  const assignedTo = parseEnum(payload.assigned_to ?? payload.assignedTo, LEAD_ASSIGNEES, "admin");

  try {
    const lead = await createLead({
      name,
      email,
      company: parseOptionalString(payload.company),
      phone: parseOptionalString(payload.phone),
      status,
      source: parseOptionalString(payload.source),
      notes: parseOptionalString(payload.notes),
      language,
      assignedTo,
    });

    return NextResponse.json({ success: true, lead: { id: lead.id } }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
