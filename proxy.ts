 
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const signInUrl = new URL("/sign-in", request.url);

    signInUrl.searchParams.set(
      "redirectTo",
      request.nextUrl.pathname
    );

    signInUrl.searchParams.set(
      "message",
      "Please sign in first to view product details."
    );

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/dashboard/:path*",
    "/product/:path*",
  ],
};