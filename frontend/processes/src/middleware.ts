import { NextRequest, NextResponse } from "next/server";
import { extractUserFromCookie } from "./utils/auth/auth";

export function middleware(request: NextRequest) {
  const user = extractUserFromCookie(request); // ✅ Extract user from JWT cookies
  const { pathname } = request.nextUrl;

  const publicPaths = ["/signin", "/signup", "/public"];
  const adminOnlyPaths = ["/users"]; // ✅ Only for ADMIN
  const userOnlyPaths = ["/all-stock-requests"]; // ✅ Only for USER

  console.log("Middleware triggered: ", { pathname, user });

  // ✅ 1. Redirect to /signin if user is not authenticated and the route is not public
  if (!user && !publicPaths.includes(pathname)) {
    console.log("Unauthorized access, redirecting to /signin");
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // ✅ 2. Prevent ADMIN from accessing "/" → Redirect to /users
  if (user?.role === "ADMIN" && pathname === "/") {
    console.log("ADMIN trying to access '/', Redirecting to /users");
    return NextResponse.redirect(new URL("/users", request.url));
  }

  // ✅ 3. Prevent ADMIN from accessing user-only paths → Redirect to /users
  if (user?.role === "ADMIN" && userOnlyPaths.includes(pathname)) {
    console.log("ADMIN trying to access", pathname, "Redirecting to /users");
    return NextResponse.redirect(new URL("/users", request.url));
  }

  // ✅ 4. Prevent USER from accessing admin-only paths → Redirect to /all-stock-requests
  if (user?.role !== "ADMIN" && adminOnlyPaths.includes(pathname)) {
    console.log("USER trying to access", pathname, "Redirecting to /all-stock-requests");
    return NextResponse.redirect(new URL("/all-stock-requests", request.url));
  }

  // ✅ 5. If user is authenticated, prevent access to /signin
  if (user && pathname === "/signin") {
    if (user.role === "ADMIN") {
      console.log("Redirecting ADMIN from /signin to /users");
      return NextResponse.redirect(new URL("/users", request.url));
    } else {
      console.log("Redirecting USER from /signin to /all-stock-requests");
      return NextResponse.redirect(new URL("/all-stock-requests", request.url));
    }
  }

  // ✅ 6. Allow access to public paths
  if (publicPaths.includes(pathname)) {
    console.log("Allowing access to public path:", pathname);
    return NextResponse.next();
  }

  // ✅ 7. Handle logout: Clear cookie and redirect to /signin
  if (pathname === "/signout") {
    console.log("User signing out, clearing cookie...");
    const response = NextResponse.redirect(new URL("/signin", request.url));
    response.cookies.set("jwt", "", { maxAge: -1 }); // ✅ Delete JWT Cookie
    return response;
  }

  console.log("Allowing access to:", pathname);
  return NextResponse.next();
}

// ✅ Apply middleware to all pages except assets
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
