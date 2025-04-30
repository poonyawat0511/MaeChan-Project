import { NextRequest, NextResponse } from "next/server";
import { extractUserFromCookie } from "./utils/auth/auth";

export function middleware(request: NextRequest) {
  const user = extractUserFromCookie(request); // Extract user from JWT cookies
  const { pathname } = request.nextUrl;

  const publicPaths = ["/signin", "/signup", "/public", "/dashboard"];
  const adminOnlyPaths = ["/users", "/days"];
  const approverAndDirectorPaths = ["/all-stock-requests", "/task"];

  console.log("Middleware triggered: ", { pathname, user });

  // 1. Redirect to /signin if not authenticated and path is not public
  if (!user && !publicPaths.includes(pathname)) {
    console.log("Unauthorized access, redirecting to /signin");
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // 2. Redirect authenticated users away from /signin
  if (user && pathname === "/signin") {
    if (user.role === "ADMIN") {
      return NextResponse.redirect(new URL("/users", request.url));
    } else {
      return NextResponse.redirect(new URL("/all-stock-requests", request.url));
    }
  }

  // 3. Handle logout
  if (pathname === "/signout") {
    const response = NextResponse.redirect(new URL("/signin", request.url));
    response.cookies.set("jwt", "", { maxAge: -1 });
    return response;
  }

  // 4. Block users from accessing unauthorized paths
  if (user) {
    const role = user.role;

    // ADMIN allowed only /users, /days
    if (role === "ADMIN" && !adminOnlyPaths.includes(pathname) && !publicPaths.includes(pathname)) {
      console.log("ADMIN not allowed on", pathname, "→ Redirect to /users");
      return NextResponse.redirect(new URL("/users", request.url));
    }

    // APPROVER or DIRECTOR allowed only /all-stock-requests, /task
    if (
      (role === "APPROVER" || role === "DIRECTOR") &&
      !approverAndDirectorPaths.includes(pathname) &&
      !publicPaths.includes(pathname)
    ) {
      console.log(`${role} not allowed on ${pathname} → Redirect to /all-stock-requests`);
      return NextResponse.redirect(new URL("/all-stock-requests", request.url));
    }

    // Other roles (or no specific role matching)
    if (
      !["ADMIN", "APPROVER", "DIRECTOR"].includes(role) &&
      !publicPaths.includes(pathname)
    ) {
      console.log("Unknown role or access denied → Redirect to /dashboard");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Allow access to public paths or authorized routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
