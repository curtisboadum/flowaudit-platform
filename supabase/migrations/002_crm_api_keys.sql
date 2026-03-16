-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- Project: pdhrjhrmzsbkwfbixodj

CREATE TABLE IF NOT EXISTS crm_api_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL UNIQUE,
  key_prefix TEXT NOT NULL,   -- first 12 chars for display (e.g. fa_sk_abc123)
  created_by TEXT NOT NULL,   -- email of admin who created it
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS crm_api_keys_key_hash_idx ON crm_api_keys (key_hash) WHERE is_active = TRUE;

-- RLS: allow service role full access
ALTER TABLE crm_api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all" ON crm_api_keys
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
