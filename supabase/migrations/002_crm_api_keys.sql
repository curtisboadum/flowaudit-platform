-- API keys for external system integration
CREATE TABLE IF NOT EXISTS crm_api_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL UNIQUE,
  key_prefix TEXT NOT NULL,
  created_by TEXT NOT NULL DEFAULT 'admin',
  last_used_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE crm_api_keys ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON crm_api_keys
  FOR ALL TO service_role USING (true) WITH CHECK (true);
