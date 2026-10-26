/**
 * @file watch-link-store.ts
 * @description Server-side lookup for token-gated watch links (watch_links
 *   table via Supabase service role). Never throws: a missing table or env
 *   degrades to null so the page degrades to a clean 404.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import { createClient } from "@supabase/supabase-js";
import type { WatchLinkRow } from "@/lib/watch-links";

const COLUMNS = [
  "token",
  "lead_id",
  "first_name",
  "company_name",
  "practice_name",
  "demo_id",
  "email",
  "campaign",
  "link_ref",
  "trade",
  "approved_by",
  "measurement_off_at",
  "created_at",
  "expires_at",
  "revoked_at",
].join(",");

function client() {
  const url = process.env.CRM_SUPABASE_URL;
  const key = process.env.CRM_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.warn("[watch-links] supabase env missing; lookup skipped");
    return null;
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function getWatchLink(token: string): Promise<WatchLinkRow | null> {
  const supabase = client();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from("watch_links")
      .select(COLUMNS)
      .eq("token", token)
      .maybeSingle();
    if (error) {
      console.warn("[watch-links] lookup failed", error.message);
      return null;
    }
    return (data as WatchLinkRow | null) ?? null;
  } catch (err) {
    console.warn("[watch-links] lookup threw", err);
    return null;
  }
}

export async function getWatchLinkByRef(linkRef: string): Promise<WatchLinkRow | null> {
  const supabase = client();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from("watch_links")
      .select(COLUMNS)
      .eq("link_ref", linkRef)
      .maybeSingle();
    if (error) {
      console.warn("[watch-links] ref lookup failed", error.message);
      return null;
    }
    return (data as WatchLinkRow | null) ?? null;
  } catch (err) {
    console.warn("[watch-links] ref lookup threw", err);
    return null;
  }
}

export async function stopWatchMeasurement(linkRef: string): Promise<boolean> {
  const supabase = client();
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from("watch_links")
      .update({ measurement_off_at: new Date().toISOString() })
      .eq("link_ref", linkRef)
      .is("measurement_off_at", null);
    if (error) {
      console.warn("[watch-links] measurement opt-out failed", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[watch-links] measurement opt-out threw", err);
    return false;
  }
}
