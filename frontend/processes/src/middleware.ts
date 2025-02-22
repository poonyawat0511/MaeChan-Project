import { NextRequest, NextResponse } from "next/server";
import { extractUserFromCookie } from "./utils/auth/auth";

export function middleware(request: NextRequest) {
  const user = extractUserFromCookie(request);
  const { pathname } = request.nextUrl;

  const publicPaths = ["/signin", "/signup", "/public"];

  if (user && pathname === "/signin") {
    return NextResponse.redirect(new URL("/all-stock-requests", request.url));
  }

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  if (pathname === "/signout") {
    const response = NextResponse.redirect(new URL("/signin", request.url));
    response.cookies.set("jwt", "", { maxAge: -1 });
    return response;
  }

  if (!user) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
