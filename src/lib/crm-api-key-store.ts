import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  createdBy: string;
  lastUsedAt: string | null;
  isActive: boolean;
  createdAt: string;
}

interface DbApiKey {
  id: string;
  name: string;
  key_prefix: string;
  created_by: string;
  last_used_at: string | null;
  is_active: boolean;
  created_at: string;
}

function getSupabase() {
  const url = process.env.CRM_SUPABASE_URL;
  const key = process.env.CRM_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("CRM_SUPABASE_URL and CRM_SUPABASE_SERVICE_ROLE_KEY must be set");
  return createClient(url, key, { auth: { persistSession: false } });
}

function toApiKey(row: DbApiKey): ApiKey {
  return {
    id: row.id,
    name: row.name,
    keyPrefix: row.key_prefix,
    createdBy: row.created_by,
    lastUsedAt: row.last_used_at,
    isActive: row.is_active,
    createdAt: row.created_at,
  };
}

export function hashApiKey(key: string): string {
  return crypto.createHash("sha256").update(key).digest("hex");
}

export function generateApiKey(): string {
  const random = crypto.randomBytes(24).toString("base64url").slice(0, 32);
  return "fa_live_" + random;
}

export async function getApiKeys(): Promise<ApiKey[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("crm_api_keys")
    .select("id,name,key_prefix,created_by,last_used_at,is_active,created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as DbApiKey[]).map(toApiKey);
}

export async function createApiKey(
  name: string,
  createdBy: string,
): Promise<{ key: ApiKey; rawKey: string }> {
  const supabase = getSupabase();
  const rawKey = generateApiKey();
  const keyHash = hashApiKey(rawKey);
  const keyPrefix = rawKey.slice(0, 8);

  const { data, error } = await supabase
    .from("crm_api_keys")
    .insert({
      name,
      key_hash: keyHash,
      key_prefix: keyPrefix,
      created_by: createdBy,
      is_active: true,
    })
    .select("id,name,key_prefix,created_by,last_used_at,is_active,created_at")
    .single();

  if (error) throw error;

  return {
    key: toApiKey(data as DbApiKey),
    rawKey,
  };
}

export async function revokeApiKey(id: string): Promise<boolean> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("crm_api_keys")
    .update({ is_active: false })
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) throw error;
  return Boolean(data);
}

export async function deleteApiKey(id: string): Promise<boolean> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("crm_api_keys")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) throw error;
  return Boolean(data);
}

export async function validateApiKey(rawKey: string): Promise<boolean> {
  const supabase = getSupabase();
  const keyHash = hashApiKey(rawKey);

  const { data, error } = await supabase
    .from("crm_api_keys")
    .select("id,is_active")
    .eq("key_hash", keyHash)
    .maybeSingle();

  if (error) throw error;
  if (!data || !data.is_active) return false;

  const { error: updateError } = await supabase
    .from("crm_api_keys")
    .update({ last_used_at: new Date().toISOString() })
    .eq("id", data.id);

  if (updateError) throw updateError;
  return true;
}
