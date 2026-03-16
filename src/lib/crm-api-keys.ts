import { createHash, randomBytes } from "crypto";
import { createClient } from "@supabase/supabase-js";

export interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  createdBy: string;
  createdAt: string;
  lastUsedAt: string | null;
  isActive: boolean;
}

export interface CreateApiKeyInput {
  name: string;
  createdBy: string;
}

export interface CreateApiKeyResult {
  key: ApiKey;
  plaintext: string; // shown once only
}

interface DbApiKey {
  id: string;
  name: string;
  key_hash: string;
  key_prefix: string;
  created_by: string;
  created_at: string;
  last_used_at: string | null;
  is_active: boolean;
}

function toApiKey(row: DbApiKey): ApiKey {
  return {
    id: row.id,
    name: row.name,
    keyPrefix: row.key_prefix,
    createdBy: row.created_by,
    createdAt: row.created_at,
    lastUsedAt: row.last_used_at,
    isActive: row.is_active,
  };
}

function getSupabase() {
  const url = process.env.CRM_SUPABASE_URL;
  const key = process.env.CRM_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("CRM_SUPABASE_URL and CRM_SUPABASE_SERVICE_ROLE_KEY must be set");
  return createClient(url, key, { auth: { persistSession: false } });
}

export function hashApiKey(plaintext: string): string {
  return createHash("sha256").update(plaintext).digest("hex");
}

export function generateApiKey(): string {
  const random = randomBytes(32).toString("hex");
  return `fa_sk_${random}`;
}

export async function createApiKey(input: CreateApiKeyInput): Promise<CreateApiKeyResult> {
  const supabase = getSupabase();
  const plaintext = generateApiKey();
  const keyHash = hashApiKey(plaintext);
  const keyPrefix = plaintext.slice(0, 12);

  const { data, error } = await supabase
    .from("crm_api_keys")
    .insert({
      name: input.name,
      key_hash: keyHash,
      key_prefix: keyPrefix,
      created_by: input.createdBy,
    })
    .select()
    .single();

  if (error) throw error;
  return { key: toApiKey(data as DbApiKey), plaintext };
}

export async function listApiKeys(): Promise<ApiKey[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("crm_api_keys")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as DbApiKey[]).map(toApiKey);
}

export async function revokeApiKey(id: string): Promise<boolean> {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("crm_api_keys")
    .update({ is_active: false })
    .eq("id", id);
  if (error) throw error;
  return true;
}

export async function validateApiKey(plaintext: string): Promise<ApiKey | null> {
  const supabase = getSupabase();
  const keyHash = hashApiKey(plaintext);
  const { data, error } = await supabase
    .from("crm_api_keys")
    .select("*")
    .eq("key_hash", keyHash)
    .eq("is_active", true)
    .maybeSingle();
  if (error || !data) return null;

  // Update last_used_at in background (fire-and-forget)
  supabase
    .from("crm_api_keys")
    .update({ last_used_at: new Date().toISOString() })
    .eq("id", (data as DbApiKey).id)
    .then(() => { /* noop */ });

  return toApiKey(data as DbApiKey);
}
