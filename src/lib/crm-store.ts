import { createClient } from "@supabase/supabase-js";

export type LeadStatus = "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";
export type LeadLanguage = "en" | "es";
export type LeadAssignee = "admin" | "esteban";

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: LeadStatus;
  language: LeadLanguage;
  source: string;
  notes: string;
  assignedTo: LeadAssignee;
  createdAt: string;
  updatedAt: string;
}

export interface LeadFilter {
  language?: LeadLanguage;
  assignedTo?: LeadAssignee;
  status?: LeadStatus;
}

export interface CreateLeadInput {
  name: string;
  email: string;
  company: string;
  phone: string;
  status: LeadStatus;
  language: LeadLanguage;
  source: string;
  notes: string;
  assignedTo: LeadAssignee;
}

export interface UpdateLeadInput {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  status?: LeadStatus;
  language?: LeadLanguage;
  source?: string;
  notes?: string;
  assignedTo?: LeadAssignee;
}

// Database row shape (snake_case)
interface DbLead {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: LeadStatus;
  language: LeadLanguage;
  source: string;
  notes: string;
  assigned_to: LeadAssignee;
  created_at: string;
  updated_at: string;
}

function toLead(row: DbLead): Lead {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    company: row.company,
    phone: row.phone,
    status: row.status,
    language: row.language,
    source: row.source,
    notes: row.notes,
    assignedTo: row.assigned_to,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function getSupabase() {
  const url = process.env.CRM_SUPABASE_URL;
  const key = process.env.CRM_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("CRM_SUPABASE_URL and CRM_SUPABASE_SERVICE_ROLE_KEY must be set");
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function getLeads(filter?: LeadFilter): Promise<Lead[]> {
  const supabase = getSupabase();
  let query = supabase.from("crm_leads").select("*").order("created_at", { ascending: false });

  if (filter?.language) query = query.eq("language", filter.language);
  if (filter?.assignedTo) query = query.eq("assigned_to", filter.assignedTo);
  if (filter?.status) query = query.eq("status", filter.status);

  const { data, error } = await query;
  if (error) throw error;
  return (data as DbLead[]).map(toLead);
}

export async function getLead(id: string): Promise<Lead | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("crm_leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? toLead(data as DbLead) : null;
}

export async function createLead(input: CreateLeadInput): Promise<Lead> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("crm_leads")
    .insert({
      name: input.name,
      email: input.email,
      company: input.company,
      phone: input.phone,
      status: input.status,
      language: input.language,
      source: input.source,
      notes: input.notes,
      assigned_to: input.assignedTo,
    })
    .select()
    .single();
  if (error) throw error;
  return toLead(data as DbLead);
}

export async function updateLead(id: string, input: UpdateLeadInput): Promise<Lead | null> {
  const supabase = getSupabase();
  const patch: Record<string, unknown> = {};
  if (input.name !== undefined) patch.name = input.name;
  if (input.email !== undefined) patch.email = input.email;
  if (input.company !== undefined) patch.company = input.company;
  if (input.phone !== undefined) patch.phone = input.phone;
  if (input.status !== undefined) patch.status = input.status;
  if (input.language !== undefined) patch.language = input.language;
  if (input.source !== undefined) patch.source = input.source;
  if (input.notes !== undefined) patch.notes = input.notes;
  if (input.assignedTo !== undefined) patch.assigned_to = input.assignedTo;

  const { data, error } = await supabase
    .from("crm_leads")
    .update(patch)
    .eq("id", id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data ? toLead(data as DbLead) : null;
}

export async function deleteLead(id: string): Promise<boolean> {
  const supabase = getSupabase();
  const { error } = await supabase.from("crm_leads").delete().eq("id", id);
  if (error) throw error;
  return true;
}
