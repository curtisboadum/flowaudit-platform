/**
 * @file route.ts
 * @description Scoped SDR watch administration: mint/revoke personalized
 *   watch links and read the funnel events the email/SDR systems need.
 *   Protected by a single scoped token, never the service-role key. The token
 *   is never returned by list/events.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomBytes, timingSafeEqual } from "crypto";
import { demoId } from "@/lib/demo-registry";

export const dynamic = "force-dynamic";

const WATCH_BASE = "https://flowaudit.co.uk";
const ALLOWED_EVENTS = new Set([
  "watch_open",
  "video_start",
  "video_25",
  "video_50",
  "video_75",
  "video_complete",
  "cta_click",
  "book_click",
  "transcript_click",
  "measurement_off",
]);
const LINK_REF_RE = /^(wl_[a-z0-9]{8,32}|sdr-[a-z0-9-]{1,80})$/;
const LEAD_ID_RE = /^[a-z0-9-]+$/;

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

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validEmail(value: string): boolean {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validExpiry(value: unknown): { ok: boolean; value: string | null } {
  if (value === undefined || value === null || value === "") return { ok: true, value: null };
  if (typeof value !== "string") return { ok: false, value: null };
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) return { ok: false, value: null };
  const now = Date.now();
  if (parsed <= now || parsed > now + 90 * 24 * 60 * 60 * 1000) {
    return { ok: false, value: null };
  }
  return { ok: true, value: new Date(parsed).toISOString() };
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
      .select(
        "lead_id,first_name,company_name,practice_name,demo_id,trade,campaign,link_ref,created_at,expires_at,revoked_at,measurement_off_at,approved_by",
      )
      .order("created_at", { ascending: false })
      .limit(200);
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

  if (action === "revoke") {
    const linkRef = clean(body.link_ref, 80);
    const leadId = clean(body.lead_id, 80);
    if (!linkRef && !leadId) {
      return NextResponse.json({ error: "link_ref or lead_id is required" }, { status: 400 });
    }
    let query = client
      .from("watch_links")
      .update({ revoked_at: new Date().toISOString() })
      .is("revoked_at", null);
    query = linkRef ? query.eq("link_ref", linkRef) : query.eq("lead_id", leadId);
    const { data, error } = await query.select("link_ref,lead_id");
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ revoked: data?.length ?? 0, rows: data ?? [] });
  }

  if (action === "mint") {
    const leadId = clean(body.lead_id, 80);
    const firstName = clean(body.first_name, 80);
    const company = clean(body.company_name ?? body.company ?? body.practice_name, 120);
    const demo = demoId(body.demo_id);
    const trade = clean(body.trade, 80).toLowerCase();
    const email = clean(body.email, 200).toLowerCase();
    const campaign = clean(body.campaign, 80) || "sdr-home-services";
    const approvedBy = clean(body.approved_by, 80);
    let linkRef = clean(body.link_ref, 80);
    const expiry = validExpiry(body.expires_at);

    if (!LEAD_ID_RE.test(leadId) || !firstName || !company) {
      return NextResponse.json(
        { error: "valid lead_id, first_name and company_name are required" },
        { status: 400 },
      );
    }
    if (!demo) {
      return NextResponse.json(
        { error: "demo_id is required and must be one of the approved recordings" },
        { status: 400 },
      );
    }
    if (demo === "roof-leak" && !approvedBy) {
      return NextResponse.json(
        { error: "roof-leak needs explicit approved_by" },
        { status: 400 },
      );
    }
    if (!validEmail(email) || !expiry.ok) {
      return NextResponse.json({ error: "invalid email or expires_at" }, { status: 400 });
    }
    if (!linkRef) {
      linkRef = campaign.startsWith("sdr")
        ? `sdr-${leadId}`
        : `wl_${randomBytes(8).toString("hex")}`;
    }
    if (!LINK_REF_RE.test(linkRef)) {
      return NextResponse.json({ error: "invalid link_ref" }, { status: 400 });
    }

    const existing = await client
      .from("watch_links")
      .select("token,link_ref,lead_id,demo_id,expires_at,revoked_at,created_at")
      .eq("link_ref", linkRef)
      .maybeSingle();
    if (existing.error) {
      return NextResponse.json({ error: existing.error.message }, { status: 500 });
    }
    if (existing.data) {
      if (existing.data.revoked_at) {
        return NextResponse.json(
          { error: "link_ref was already revoked; mint with a new link_ref" },
          { status: 409 },
        );
      }
      return NextResponse.json({
        created: false,
        link_ref: existing.data.link_ref,
        token: existing.data.token,
        url: `${WATCH_BASE}/watch/${existing.data.token}`,
        lead_id: existing.data.lead_id,
        demo_id: existing.data.demo_id,
        expires_at: existing.data.expires_at,
      });
    }

    const token = randomBytes(32).toString("base64url");
    const row = {
      token,
      lead_id: leadId,
      first_name: firstName,
      practice_name: company,
      company_name: company,
      demo_id: demo,
      email: email || null,
      campaign,
      link_ref: linkRef,
      trade: trade || null,
      approved_by: approvedBy || null,
      expires_at: expiry.value,
    };
    const { error } = await client.from("watch_links").insert(row);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({
      created: true,
      link_ref: linkRef,
      token,
      url: `${WATCH_BASE}/watch/${token}`,
      lead_id: leadId,
      demo_id: demo,
      expires_at: expiry.value,
    });
  }

  if (action === "events") {
    const lastId = Number.isFinite(Number(body.last_id)) ? Math.max(0, Number(body.last_id)) : 0;
    const requested = Array.isArray(body.events) ? body.events : [];
    const events = requested
      .filter((value): value is string => typeof value === "string" && ALLOWED_EVENTS.has(value))
      .slice(0, 12);
    const limit = Math.min(200, Math.max(1, Number(body.limit) || 100));
    let query = client
      .from("sdr_events")
      .select("id,event_id,lead_ref,event,created_at,payload")
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
