import { NextRequest, NextResponse } from "next/server";
import { extractUserFromCookie } from "./utils/auth/auth";

export function middleware(request: NextRequest) {
  const user = extractUserFromCookie(request);
  const { pathname } = request.nextUrl;

  const publicPaths = ["/signin", "/signup", "/public"];

  // 🔹 If user is authenticated and tries to access /signin, redirect to home (/)
  if (user && pathname === "/signin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow public paths without authentication
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // 🔹 Handle sign-out: Clear JWT and redirect to /signin
  if (pathname === "/signout") {
    const response = NextResponse.redirect(new URL("/signin", request.url));
    response.cookies.set("jwt", "", { maxAge: -1 }); // Expire the cookie immediately
    return response;
  }

  // 🔹 Redirect unauthenticated users to /signin
  if (!user) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

// Middleware applies to all pages except API routes, Next.js internals, and static files
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
