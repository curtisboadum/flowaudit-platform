import { NextResponse } from "next/server";
import {
  createWebLead,
  type CreateWebLeadInput,
  type WebLeadBudget,
  type WebLeadGoal,
  type WebLeadPriority,
  type WebLeadService,
  type WebLeadTimeline,
} from "@/lib/crm-web-store";
import { validateApiKey } from "@/lib/crm-api-key-store";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEB_LEAD_GOALS: WebLeadGoal[] = ["leads", "bookings", "sales", "showcase", "info"];
const WEB_LEAD_BUDGETS: WebLeadBudget[] = ["unknown", "0-500", "500-1000", "1000-3000", "3000+"];
const WEB_LEAD_TIMELINES: WebLeadTimeline[] = ["asap", "1month", "3months", "flexible"];
const WEB_LEAD_PRIORITIES: WebLeadPriority[] = ["low", "medium", "high", "urgent"];

function hasKey(record: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(record, key);
}

function readString(record: Record<string, unknown>, camelKey: string, snakeKey?: string): unknown {
  if (hasKey(record, camelKey)) return record[camelKey];
  if (snakeKey && hasKey(record, snakeKey)) return record[snakeKey];
  return undefined;
}

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

function parseOptionalString(value: unknown): string | null | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "string") return null;
  return sanitizeString(value);
}

function parseEmail(value: unknown): string | null {
  const email = parseRequiredString(value);
  if (!email) return null;
  return EMAIL_REGEX.test(email) ? email : null;
}

function parseEnum<T extends string>(value: unknown, options: T[]): T | null | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "string") return null;
  const cleaned = sanitizeString(value);
  return options.includes(cleaned as T) ? (cleaned as T) : null;
}

function parseStringArray(value: unknown): string[] | null | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value)) return null;

  const parsed: string[] = [];
  for (const item of value) {
    if (typeof item !== "string") return null;
    const sanitized = sanitizeString(item);
    if (sanitized.length > 0) {
      parsed.push(sanitized);
    }
  }

  return parsed;
}

function parseServices(value: unknown): WebLeadService[] | null | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value)) return null;

  const parsed: WebLeadService[] = [];

  for (const item of value) {
    if (typeof item === "string") {
      const name = sanitizeString(item);
      if (name.length === 0) continue;
      parsed.push({ name, description: "", price: "" });
      continue;
    }

    if (typeof item !== "object" || item === null) return null;
    const service = item as Record<string, unknown>;
    const name = parseRequiredString(service.name);
    if (!name) return null;

    const description = parseOptionalString(service.description);
    if (description === null) return null;

    const price = parseOptionalString(service.price);
    if (price === null) return null;

    parsed.push({ name, description: description ?? "", price: price ?? "" });
  }

  return parsed;
}

function parseWebLeadPayload(body: unknown): CreateWebLeadInput | null {
  if (typeof body !== "object" || body === null) return null;
  const payload = body as Record<string, unknown>;

  const businessName = parseRequiredString(readString(payload, "businessName", "business_name"));
  const email = parseEmail(readString(payload, "email"));
  if (!businessName || !email) return null;

  const parsed: CreateWebLeadInput = {
    businessName,
    email,
  };

  const ownerName = parseOptionalString(readString(payload, "ownerName", "owner_name"));
  if (ownerName === null) return null;
  if (ownerName !== undefined) parsed.ownerName = ownerName;

  const phone = parseOptionalString(readString(payload, "phone"));
  if (phone === null) return null;
  if (phone !== undefined) parsed.phone = phone;

  const industry = parseOptionalString(readString(payload, "industry"));
  if (industry === null) return null;
  if (industry !== undefined) parsed.industry = industry;

  const location = parseOptionalString(readString(payload, "location"));
  if (location === null) return null;
  if (location !== undefined) parsed.location = location;

  const description = parseOptionalString(readString(payload, "description"));
  if (description === null) return null;
  if (description !== undefined) parsed.description = description;

  const usp = parseOptionalString(readString(payload, "usp"));
  if (usp === null) return null;
  if (usp !== undefined) parsed.usp = usp;

  const targetAudience = parseOptionalString(readString(payload, "targetAudience", "target_audience"));
  if (targetAudience === null) return null;
  if (targetAudience !== undefined) parsed.targetAudience = targetAudience;

  const source = parseOptionalString(readString(payload, "source"));
  if (source === null) return null;
  if (source !== undefined) parsed.source = source;

  const notes = parseOptionalString(readString(payload, "notes"));
  if (notes === null) return null;
  if (notes !== undefined) parsed.notes = notes;

  const primaryGoal = parseEnum(readString(payload, "primaryGoal", "primary_goal"), WEB_LEAD_GOALS);
  if (primaryGoal === null) return null;
  if (primaryGoal !== undefined) parsed.primaryGoal = primaryGoal;

  const budget = parseEnum(readString(payload, "budget"), WEB_LEAD_BUDGETS);
  if (budget === null) return null;
  if (budget !== undefined) parsed.budget = budget;

  const timeline = parseEnum(readString(payload, "timeline"), WEB_LEAD_TIMELINES);
  if (timeline === null) return null;
  if (timeline !== undefined) parsed.timeline = timeline;

  const priority = parseEnum(readString(payload, "priority"), WEB_LEAD_PRIORITIES);
  if (priority === null) return null;
  if (priority !== undefined) parsed.priority = priority;

  const assignedTo = parseOptionalString(readString(payload, "assignedTo", "assigned_to"));
  if (assignedTo === null) return null;
  if (assignedTo !== undefined) parsed.assignedTo = assignedTo;

  const pagesNeeded = parseStringArray(readString(payload, "pagesNeeded", "pages_needed"));
  if (pagesNeeded === null) return null;
  if (pagesNeeded !== undefined) parsed.pagesNeeded = pagesNeeded;

  const services = parseServices(readString(payload, "services"));
  if (services === null) return null;
  if (services !== undefined) parsed.services = services;

  return parsed;
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

  const parsed = parseWebLeadPayload(body);
  if (!parsed) {
    return NextResponse.json({ error: "Invalid web lead payload" }, { status: 400 });
  }

  try {
    const lead = await createWebLead(parsed);
    return NextResponse.json({ success: true, lead: { id: lead.id } }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create web lead" }, { status: 500 });
  }
}
