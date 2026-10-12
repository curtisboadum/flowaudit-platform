import { createHmac } from "crypto";
import { createClient } from "@supabase/supabase-js";
export async function takeRateLimit(
  request: Request,
  scope: string,
  max: number,
): Promise<boolean | null> {
  const url = process.env.CRM_SUPABASE_URL,
    key = process.env.CRM_SUPABASE_SERVICE_ROLE_KEY,
    secret = process.env.CRM_JWT_SECRET;
  if (!url || !key || !secret) return null;
  const ip = (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  ).slice(0, 100);
  const hashed = createHmac("sha256", secret).update(`${scope}:${ip}`).digest("hex");
  try {
    const { data, error } = await createClient(url, key, { auth: { persistSession: false } }).rpc(
      "fa_take_rate_limit",
      { p_key: hashed, p_max: max },
    );
    return error ? null : data === true;
  } catch {
    return null;
  }
}
