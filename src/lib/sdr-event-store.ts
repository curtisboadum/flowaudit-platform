/** Server-only event storage. False means unavailable; callers must not claim success. */
import { createClient } from "@supabase/supabase-js";

export interface SdrEventRow {
  event_id?: string;
  kind: string;
  lead_ref: string;
  event: string;
  payload: Record<string, unknown>;
}

export async function insertSdrEvent(row: SdrEventRow): Promise<boolean> {
  const url = process.env.CRM_SUPABASE_URL;
  const key = process.env.CRM_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.warn("[sdr-events] storage not configured");
    return false;
  }
  try {
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const data = {
      ...(row.event_id ? { event_id: row.event_id } : {}),
      kind: row.kind,
      lead_ref: row.lead_ref,
      event: row.event,
      payload: row.payload,
    };
    const { error } = row.event_id
      ? await supabase
          .from("sdr_events")
          .upsert(data, { onConflict: "event_id", ignoreDuplicates: true })
      : await supabase.from("sdr_events").insert(data);
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
