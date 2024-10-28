import { NextRequest, NextResponse } from "next/server";
import getRedirectUrl from "./app/lib/get-redirect-url";

export async function middleware(request: NextRequest) {
  console.log(request.cookies.getAll());
  

  const token = request.cookies.get("session");

  if (!token || typeof token.value !== "string" || !token.value) {
    return NextResponse.redirect(getRedirectUrl("/login"), { status: 302 });
  }

  const response = await fetch(
    getRedirectUrl("/api/auth/verify?token=" + token.value),
  );

  console.log(await response.json());

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path"],
};
