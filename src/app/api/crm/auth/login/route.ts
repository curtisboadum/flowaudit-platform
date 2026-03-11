import { NextResponse } from "next/server";
import {
  getSessionCookieOptions,
  CRM_SESSION_COOKIE,
  signToken,
  validateCredentials,
  type CrmRole,
  type CrmUser,
} from "@/lib/crm-auth";

interface LoginBody {
  email: string;
  password: string;
}

function roleName(role: CrmRole): string {
  return role === "admin" ? "Admin" : "Esteban";
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
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
    name: roleName(role),
  };

  const token = await signToken(user);
  const response = NextResponse.json({ user });
  response.cookies.set(CRM_SESSION_COOKIE, token, getSessionCookieOptions());
  return response;
}
