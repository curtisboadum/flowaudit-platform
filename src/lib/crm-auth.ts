import { jwtVerify, SignJWT } from "jose";
import type { JWTPayload } from "jose";
import type { NextRequest } from "next/server";

export type CrmRole = "admin" | "esteban";

export interface CrmUser {
  role: CrmRole;
  email: string;
  name: string;
}

export const CRM_SESSION_COOKIE = "CRM_SESSION";
export const CRM_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

interface CrmSessionPayload extends JWTPayload {
  role: CrmRole;
  email: string;
  name: string;
}

function getJwtSecret(): Uint8Array {
  const secret = process.env.CRM_JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("CRM_JWT_SECRET must be set and at least 32 characters long");
  }
  return new TextEncoder().encode(secret);
}

function parseCookieHeader(cookieHeader: string | null, key: string): string | null {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  for (const cookie of cookies) {
    if (!cookie.startsWith(`${key}=`)) continue;
    return cookie.slice(key.length + 1);
  }

  return null;
}

function getCookieFromRequest(request: Request | NextRequest, key: string): string | null {
  if ("cookies" in request && typeof request.cookies.get === "function") {
    return request.cookies.get(key)?.value ?? null;
  }

  return parseCookieHeader(request.headers.get("cookie"), key);
}

function safeCompare(left: string, right: string): boolean {
  return left.trim().toLowerCase() === right.trim().toLowerCase();
}

export function validateCredentials(email: string, pass: string): CrmRole | null {
  const adminEmail = process.env.CRM_ADMIN_EMAIL ?? "";
  const adminPass = process.env.CRM_ADMIN_PASS ?? "";
  const kofiEmail = process.env.CRM_KOFI_EMAIL ?? "";
  const kofiPass = process.env.CRM_KOFI_PASS ?? "";
  const estebanEmail = process.env.CRM_ESTEBAN_EMAIL ?? "esteban@flowaudit.co.uk";
  const estebanPass = process.env.CRM_ESTEBAN_PASS ?? "";

  if (adminEmail && adminPass && safeCompare(email, adminEmail) && pass === adminPass) {
    return "admin";
  }

  if (kofiEmail && kofiPass && safeCompare(email, kofiEmail) && pass === kofiPass) {
    return "admin";
  }

  if (estebanEmail && estebanPass && safeCompare(email, estebanEmail) && pass === estebanPass) {
    return "esteban";
  }

  return null;
}

export function getKofiEmail(): string {
  return (process.env.CRM_KOFI_EMAIL ?? "").trim().toLowerCase();
}

export async function signToken(payload: CrmUser): Promise<string> {
  const jwtPayload: CrmSessionPayload = { ...payload };
  return new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

export async function verifyToken(token: string): Promise<CrmUser | null> {
  try {
    const { payload } = await jwtVerify<CrmSessionPayload>(token, getJwtSecret(), {
      algorithms: ["HS256"],
    });

    if (
      (payload.role !== "admin" && payload.role !== "esteban") ||
      typeof payload.email !== "string" ||
      typeof payload.name !== "string"
    ) {
      return null;
    }

    return {
      role: payload.role,
      email: payload.email,
      name: payload.name,
    };
  } catch {
    return null;
  }
}

export async function getUserFromRequest(request: Request | NextRequest): Promise<CrmUser | null> {
  const token = getCookieFromRequest(request, CRM_SESSION_COOKIE);
  if (!token) return null;
  return verifyToken(token);
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    maxAge: CRM_SESSION_MAX_AGE,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}
