/**
 * @file route.ts
 * @description Scoped SDR watch administration: mint/revoke personalized
 *   watch links and read the funnel events the SDR needs. Protected by a
 *   single scoped token, never the service-role key. The route uses the
 *   deployment's existing CRM_SUPABASE_* environment.
 * @status Temporary migration endpoint. Remove after the SDR has a Keychain
 *   backed watch credential.
 */
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomBytes, timingSafeEqual } from "crypto";

export const dynamic = "force-dynamic";

const WATCH_BASE = "https://flowaudit.co.uk";
const ALLOWED_EVENTS = new Set([
  "watch_open",
  "video_25",
  "video_50",
  "video_75",
  "cta_click",
  "book_click",
]);

function authorized(request: Request): boolean {
  const expected = process.env.FASDR_WATCH_ADMIN_TOKEN || "";
  const received = request.headers.get("x-fasdr-admin") || "";
  if (!expected || received.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(received));
}

function supabase() {
  const url = process.env.CRM_SUPABASE_URL;
  const key = process.env.CRM_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const client = supabase();
  if (!client) {
    return NextResponse.json({ error: "storage not configured" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const action = body.action;

  if (action === "list_links") {
    const { data, error } = await client
      .from("watch_links")
      .select("lead_id,first_name,practice_name,created_at,revoked_at")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ rows: data ?? [] });
  }

  if (action === "revoke_all") {
    const { data, error } = await client
      .from("watch_links")
      .update({ revoked_at: new Date().toISOString() })
      .is("revoked_at", null)
      .select("lead_id");
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ revoked: data?.length ?? 0 });
  }

  if (action === "mint") {
    const leadId = typeof body.lead_id === "string" ? body.lead_id.trim() : "";
    const firstName = typeof body.first_name === "string" ? body.first_name.trim() : "";
    const company = typeof body.company_name === "string" ? body.company_name.trim() : "";
    if (!/^[a-z0-9-]+$/.test(leadId) || !firstName || !company || company.length > 120) {
      return NextResponse.json({ error: "invalid lead, first name, or company" }, { status: 400 });
    }
    const token = randomBytes(32).toString("base64url");
    const { error } = await client.from("watch_links").insert({
      token,
      lead_id: leadId,
      first_name: firstName.slice(0, 80),
      practice_name: company,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({
      lead_id: leadId,
      url: `${WATCH_BASE}/watch/${token}`,
    });
  }

  if (action === "events") {
    const lastId = Number.isFinite(Number(body.last_id)) ? Math.max(0, Number(body.last_id)) : 0;
    const requested = Array.isArray(body.events) ? body.events : [];
    const events = requested
      .filter((value): value is string => typeof value === "string" && ALLOWED_EVENTS.has(value))
      .slice(0, 10);
    const limit = Math.min(100, Math.max(1, Number(body.limit) || 50));
    let query = client
      .from("sdr_events")
      .select("id,lead_ref,event,created_at")
      .gt("id", lastId)
      .order("id", { ascending: true })
      .limit(limit);
    if (events.length) query = query.in("event", events);
    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ rows: data ?? [] });
  }

  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
