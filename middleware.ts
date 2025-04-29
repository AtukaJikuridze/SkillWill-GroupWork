"use server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  // cookieStore.set("uuid", "4");
  cookieStore.set("uuid", "13");

  if (!cookieStore.has("uuid"))
    return NextResponse.redirect(new URL("/login", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/courier/:path*", "/admin/:path*", "/user/:path*"],
};
