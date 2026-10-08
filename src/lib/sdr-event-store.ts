/**
 * @file sdr-event-store.ts
 * @description Best-effort durable store for SDR funnel events (sdr_events
 *   table via Supabase). Never throws: a missing table or env degrades to a
 *   logged no-op so the public endpoints can never break the site.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import { createClient } from "@supabase/supabase-js";

export interface SdrEventRow {
  kind: string;
  lead_ref: string;
  event: string;
  payload: Record<string, unknown>;
}

export async function insertSdrEvent(row: SdrEventRow): Promise<boolean> {
  const url = process.env.CRM_SUPABASE_URL;
  const key = process.env.CRM_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.warn("[sdr-events] supabase env missing; event not stored", row);
    return false;
  }
  try {
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { error } = await supabase.from("sdr_events").insert({
      kind: row.kind,
      lead_ref: row.lead_ref,
      event: row.event,
      payload: row.payload,
    });
    if (error) {
      console.warn("[sdr-events] insert failed", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[sdr-events] insert threw", err);
    return false;
  }
}
