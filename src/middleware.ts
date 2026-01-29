import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isReservedRoute } from "@/config/routes";

const AUTH_ROUTES = ["/auth/signin", "/auth/signup", "/auth/forgot-password"];

const PUBLIC_ROUTES = [
  "/tos",
  "/privacy",
  "/cookie",
  "/support",
  "/status",
  "/about",
  "/blog",
];

// Helper to get session cookie name
function getSessionCookieName() {
  return process.env.NODE_ENV === "production"
    ? "__Secure-better-auth.session_token"
    : "better-auth.session_token";
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const sessionToken = request.cookies.get(getSessionCookieName());
  const isAuthenticated = !!sessionToken;

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isRootPath = pathname === "/";

  // 1. Redirect logged-in users away from Landing and Auth pages to Home
  if (isAuthenticated && (isRootPath || isAuthRoute)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // 2. Handle potential username routes (single segment paths)
  const pathSegments = pathname.split("/").filter(Boolean);
  const isUsernamePath = pathSegments.length === 1 && !pathname.includes(".");

  if (isUsernamePath) {
    const firstSegment = pathSegments[0];

    // If it's a reserved route, let it through normally
    if (isReservedRoute(firstSegment)) {
      return NextResponse.next();
    }

    // If it's a public route, let it through
    if (isPublicRoute) {
      return NextResponse.next();
    }

    // Otherwise, it's potentially a username - let Next.js handle it
    // The [username] route will determine if the user exists
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)"],
};
