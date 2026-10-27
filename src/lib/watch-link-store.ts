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

export async function getWatchLink(token: string): Promise<WatchLinkRow | null> {
  const url = process.env.CRM_SUPABASE_URL;
  const key = process.env.CRM_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.warn("[watch-links] supabase env missing; lookup skipped");
    return null;
  }
  try {
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { data, error } = await supabase
      .from("watch_links")
      .select(
        "token, lead_id, first_name, practice_name, trade, demo_id, campaign, created_at, expires_at, revoked_at",
      )
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
