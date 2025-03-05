import { NextRequest, NextResponse } from "next/server";
import { extractUserFromCookie } from "./utils/auth/auth";

export function middleware(request: NextRequest) {
  const user = extractUserFromCookie(request); // ดึงข้อมูล user จาก Cookie
  const { pathname } = request.nextUrl;

  const publicPaths = ["/signin", "/signup", "/public"];
  const adminOnlyPaths = ["/users"]; // เฉพาะ ADMIN เท่านั้น
  const userOnlyPaths = ["/all-stock-requests"]; // เฉพาะ USER เท่านั้น

  console.log("Middleware triggered: ", { pathname, user });

  // ✅ 1. ถ้ายังไม่ได้ล็อกอิน → Redirect ไป /signin
  if (!user && !publicPaths.includes(pathname)) {
    console.log("Unauthorized access, redirecting to /signin");
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // ✅ 2. ถ้าเป็น ADMIN และพยายามเข้า user-only paths → Redirect ไป /users
  if (user?.role === "ADMIN" && userOnlyPaths.includes(pathname)) {
    console.log("ADMIN trying to access", pathname, "Redirecting to /users");
    return NextResponse.redirect(new URL("/users", request.url));
  }

  // ✅ 3. ถ้าเป็น USER และพยายามเข้า admin-only paths → Redirect ไป /all-stock-requests
  if (user?.role !== "ADMIN" && adminOnlyPaths.includes(pathname)) {
    console.log("USER trying to access", pathname, "Redirecting to /all-stock-requests");
    return NextResponse.redirect(new URL("/all-stock-requests", request.url));
  }

  // ✅ 4. ถ้าผู้ใช้ล็อกอินแล้ว ห้ามเข้า /signin (ADMIN → /users, USER → /all-stock-requests)
  if (user && pathname === "/signin") {
    if (user.role === "ADMIN") {
      console.log("Redirecting ADMIN from /signin to /users");
      return NextResponse.redirect(new URL("/users", request.url));
    } else {
      console.log("Redirecting USER from /signin to /all-stock-requests");
      return NextResponse.redirect(new URL("/all-stock-requests", request.url));
    }
  }

  // ✅ 5. อนุญาตให้เข้าหน้าสาธารณะ (Public Paths)
  if (publicPaths.includes(pathname)) {
    console.log("Allowing access to public path:", pathname);
    return NextResponse.next();
  }

  // ✅ 6. Logout: ลบ cookie แล้ว redirect ไป /signin
  if (pathname === "/signout") {
    console.log("User signing out, clearing cookie...");
    const response = NextResponse.redirect(new URL("/signin", request.url));
    response.cookies.set("jwt", "", { maxAge: -1 }); // ลบ Token ออกจาก Cookie
    return response;
  }

  console.log("Allowing access to:", pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
