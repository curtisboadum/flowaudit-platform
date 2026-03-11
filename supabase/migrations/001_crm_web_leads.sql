-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- Project: pdhrjhrmzsbkwfbixodj

CREATE TABLE IF NOT EXISTS crm_web_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Contact
  business_name TEXT NOT NULL,
  owner_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  industry TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',

  -- Social media
  social_facebook TEXT NOT NULL DEFAULT '',
  social_instagram TEXT NOT NULL DEFAULT '',
  social_linkedin TEXT NOT NULL DEFAULT '',
  social_twitter TEXT NOT NULL DEFAULT '',
  social_tiktok TEXT NOT NULL DEFAULT '',

  -- Brand
  brand_colors JSONB NOT NULL DEFAULT '[]',
  brand_style TEXT NOT NULL DEFAULT '',
  font_preference TEXT NOT NULL DEFAULT '',
  inspiration_urls JSONB NOT NULL DEFAULT '[]',

  -- Business content
  description TEXT NOT NULL DEFAULT '',
  usp TEXT NOT NULL DEFAULT '',
  target_audience TEXT NOT NULL DEFAULT '',
  years_in_business TEXT NOT NULL DEFAULT '',

  -- Structured data
  services JSONB NOT NULL DEFAULT '[]',
  testimonials JSONB NOT NULL DEFAULT '[]',
  review_urls JSONB NOT NULL DEFAULT '[]',
  certifications TEXT NOT NULL DEFAULT '',
  team_members JSONB NOT NULL DEFAULT '[]',

  -- Project spec
  primary_goal TEXT NOT NULL DEFAULT '',
  cta_text TEXT NOT NULL DEFAULT '',
  pages_needed JSONB NOT NULL DEFAULT '[]',
  domain_name TEXT NOT NULL DEFAULT '',
  budget TEXT NOT NULL DEFAULT '',
  timeline TEXT NOT NULL DEFAULT '',

  -- Assets
  has_logo BOOLEAN NOT NULL DEFAULT FALSE,
  has_photos BOOLEAN NOT NULL DEFAULT FALSE,
  has_videos BOOLEAN NOT NULL DEFAULT FALSE,
  asset_notes TEXT NOT NULL DEFAULT '',

  -- AI Workflow
  build_stage TEXT NOT NULL DEFAULT 'intake',
  ai_notes TEXT NOT NULL DEFAULT '',
  research_data JSONB,
  generated_content JSONB,
  preview_url TEXT NOT NULL DEFAULT '',
  live_url TEXT NOT NULL DEFAULT '',

  -- CRM meta
  source TEXT NOT NULL DEFAULT '',
  assigned_to TEXT NOT NULL DEFAULT 'admin',
  priority TEXT NOT NULL DEFAULT 'medium',
  notes TEXT NOT NULL DEFAULT '',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_crm_web_leads_updated_at
  BEFORE UPDATE ON crm_web_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS: allow service role full access
ALTER TABLE crm_web_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all" ON crm_web_leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
