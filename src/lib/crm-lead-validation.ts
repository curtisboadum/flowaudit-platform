import type {
  CreateLeadInput,
  LeadAssignee,
  LeadLanguage,
  LeadStatus,
  UpdateLeadInput,
} from "@/lib/crm-store";

const LEAD_STATUSES: LeadStatus[] = ["new", "contacted", "qualified", "proposal", "won", "lost"];
const LEAD_LANGUAGES: LeadLanguage[] = ["en", "es"];
const LEAD_ASSIGNEES: LeadAssignee[] = ["admin", "esteban"];

function asRecord(data: unknown): Record<string, unknown> | null {
  if (typeof data !== "object" || data === null) return null;
  return data as Record<string, unknown>;
}

function parseString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function parseOptionalString(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim();
}

function parseStatus(value: unknown): LeadStatus | null {
  if (typeof value !== "string") return null;
  return LEAD_STATUSES.includes(value as LeadStatus) ? (value as LeadStatus) : null;
}

function parseLanguage(value: unknown): LeadLanguage | null {
  if (typeof value !== "string") return null;
  return LEAD_LANGUAGES.includes(value as LeadLanguage) ? (value as LeadLanguage) : null;
}

function parseAssignee(value: unknown): LeadAssignee | null {
  if (typeof value !== "string") return null;
  return LEAD_ASSIGNEES.includes(value as LeadAssignee) ? (value as LeadAssignee) : null;
}

export function parseCreateLeadPayload(data: unknown): CreateLeadInput | null {
  const payload = asRecord(data);
  if (!payload) return null;

  const name = parseString(payload.name);
  const email = parseString(payload.email);
  if (!name || !email) return null;

  const status = parseStatus(payload.status) ?? "new";
  const language = parseLanguage(payload.language) ?? "en";
  const assignedTo = parseAssignee(payload.assignedTo) ?? "admin";

  return {
    name,
    email,
    company: parseOptionalString(payload.company),
    phone: parseOptionalString(payload.phone),
    status,
    language,
    source: parseOptionalString(payload.source),
    notes: parseOptionalString(payload.notes),
    assignedTo,
  };
}

export function parseUpdateLeadPayload(data: unknown): UpdateLeadInput | null {
  const payload = asRecord(data);
  if (!payload) return null;

  const update: UpdateLeadInput = {};

  if ("name" in payload) {
    const name = parseString(payload.name);
    if (!name) return null;
    update.name = name;
  }

  if ("email" in payload) {
    const email = parseString(payload.email);
    if (!email) return null;
    update.email = email;
  }

  if ("company" in payload) {
    update.company = parseOptionalString(payload.company);
  }

  if ("phone" in payload) {
    update.phone = parseOptionalString(payload.phone);
  }

  if ("source" in payload) {
    update.source = parseOptionalString(payload.source);
  }

  if ("notes" in payload) {
    update.notes = parseOptionalString(payload.notes);
  }

  if ("status" in payload) {
    const status = parseStatus(payload.status);
    if (!status) return null;
    update.status = status;
  }

  if ("language" in payload) {
    const language = parseLanguage(payload.language);
    if (!language) return null;
    update.language = language;
  }

  if ("assignedTo" in payload) {
    const assignedTo = parseAssignee(payload.assignedTo);
    if (!assignedTo) return null;
    update.assignedTo = assignedTo;
  }

  return update;
}
