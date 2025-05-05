import { NextRequest, NextResponse } from "next/server";
import { extractUserFromCookie } from "./utils/auth/auth";

export function middleware(request: NextRequest) {
  const user = extractUserFromCookie(request); // ✅ JWT user from cookie
  const { pathname } = request.nextUrl;

  const publicPaths = ["/", "/signin", "/signup", "/public", "/dashboard", "/profile"];
  const adminOnlyPaths = ["/users", "/days"];
  const approverAndDirectorPaths = ["/all-stock-requests", "/task"];
  const userOnlyPaths = ["/dashboard", "/profile"];

  console.log("Middleware triggered: ", { pathname, user });

  // 1. Redirect unauthenticated users away from protected routes
  if (!user && !publicPaths.includes(pathname)) {
    console.log("Unauthorized access → redirect to /signin");
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // 2. Authenticated user accessing /signin → redirect based on role
  if (user && pathname === "/signin") {
    if (user.role === "ADMIN") {
      return NextResponse.redirect(new URL("/users", request.url));
    } else if (["APPROVER", "DIRECTOR"].includes(user.role)) {
      return NextResponse.redirect(new URL("/all-stock-requests", request.url));
    } else {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // 3. Signout route → clear JWT
  if (pathname === "/signout") {
    const response = NextResponse.redirect(new URL("/signin", request.url));
    response.cookies.set("jwt", "", { maxAge: -1 });
    return response;
  }

  // 4. Role-based route access control
  if (user) {
    const role = user.role;

    if (role === "ADMIN" && ![...adminOnlyPaths, ...publicPaths].includes(pathname)) {
      console.log("ADMIN blocked from", pathname);
      return NextResponse.redirect(new URL("/users", request.url));
    }

    if (
      ["APPROVER", "DIRECTOR"].includes(role) &&
      ![...approverAndDirectorPaths, ...publicPaths].includes(pathname)
    ) {
      console.log(`${role} blocked from ${pathname}`);
      return NextResponse.redirect(new URL("/all-stock-requests", request.url));
    }

    if (role === "USER" && !userOnlyPaths.includes(pathname)) {
      console.log("USER blocked from", pathname);
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!["ADMIN", "APPROVER", "DIRECTOR", "USER"].includes(role)) {
      console.log("Unknown role → redirect to /dashboard");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
