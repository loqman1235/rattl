import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
    pathname.startsWith(route)
  );
  const isRootPath = pathname === "/";

  // // Prevents authenticated users from accessing auth routes
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If not authenticated and not on auth route and not on root path and not on public route redirect to root
  if (!isAuthenticated && !isAuthRoute && !isRootPath && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)"],
};
