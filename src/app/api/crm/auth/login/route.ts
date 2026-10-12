import { takeRateLimit } from "@/lib/durable-rate-limit";
import { NextResponse } from "next/server";
import {
  getSessionCookieOptions,
  CRM_SESSION_COOKIE,
  signToken,
  validateCredentials,
  getKofiEmail,
  type CrmRole,
  type CrmUser,
} from "@/lib/crm-auth";

interface LoginBody {
  email: string;
  password: string;
}

function getDisplayName(role: CrmRole, email: string): string {
  if (role === "esteban") return "Esteban";
  if (email === getKofiEmail()) return "Kofi";
  return "Admin";
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return NextResponse.json({ error: "Foreign origin" }, { status: 403 });
  const allowed = await takeRateLimit(request, "crm-login", 5);
  if (allowed !== true)
    return NextResponse.json(
      {
        error:
          allowed === false
            ? "Too many attempts. Try again shortly."
            : "Authentication temporarily unavailable.",
      },
      { status: allowed === false ? 429 : 503 },
    );
  const raw = await request.text();
  if (raw.length > 2048) return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  let body: unknown;

  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    typeof (body as Partial<LoginBody>).email !== "string" ||
    typeof (body as Partial<LoginBody>).password !== "string"
  ) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const payload = body as LoginBody;
  const email = payload.email.trim().toLowerCase();
  const password = payload.password;
  const role = validateCredentials(email, password);

  if (!role) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const user: CrmUser = {
    role,
    email,
    name: getDisplayName(role, email),
  };

  const token = await signToken(user);
  const response = NextResponse.json({ user });
  response.cookies.set(CRM_SESSION_COOKIE, token, getSessionCookieOptions());
  return response;
}
