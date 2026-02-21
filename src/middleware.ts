import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes, static files, Next.js internals
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/icon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // If user already has a locale cookie, respect it
  const localeCookie = request.cookies.get("locale")?.value;
  if (localeCookie === "en" || localeCookie === "es") {
    return NextResponse.next();
  }

  // Geo-detect using Vercel's x-vercel-ip-country header
  const country =
    request.headers.get("x-vercel-ip-country") || "";

  const response = NextResponse.next();

  if (country === "PY") {
    // Paraguay → Spanish
    response.cookies.set("locale", "es", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  } else {
    // Everyone else → English
    response.cookies.set("locale", "en", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)",
  ],
};
