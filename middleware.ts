import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const uuid = req.cookies.get("uuid")?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (uuid && (isAuthPage || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  const protectedPaths = ["/", "/courier", "/admin", "/user", "/dashboard"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (!uuid && isProtected && !isAuthPage)
    return NextResponse.redirect(new URL("/login", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/dashboard",
    "/courier/:path*",
    "/admin/:path*",
    "/user/:path*",
  ],
};
