import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt");

  const publicPaths = ["/signin", "/signup", "/public"];

  if (publicPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/signout") {
    const response = NextResponse.redirect(
      new URL("/signin", request.url)
    );
    response.cookies.set("jwt", "", { maxAge: -1 });
    return response;
  }

  if (!jwt) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
