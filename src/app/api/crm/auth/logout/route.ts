import { NextResponse } from "next/server";
import { CRM_SESSION_COOKIE } from "@/lib/crm-auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(CRM_SESSION_COOKIE, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
