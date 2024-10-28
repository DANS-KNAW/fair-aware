import { OrcidAuthService } from "@/app/lib/auth/orcid";
import getRedirectUrl from "@/app/lib/get-redirect-url";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const orcidAuth = new OrcidAuthService({
  clientId: process.env.ORCID_CLIENT_ID!,
  clientSecret: process.env.ORCID_CLIENT_SECRET!,
  redirectUri: process.env.REDIRECT_URI!,
  sandbox: false,
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    console.error("No authorization code received from ORCID");
    return Response.redirect(
      getRedirectUrl("/login?authError=AUTH_ERR_FAIL"),
      303,
    );
  }

  try {
    const tokenData = await orcidAuth.exchangeCodeForToken(code);

    console.log(tokenData);

    // Store the token in an HTTP-only cookie
    const cookieStore = cookies();
    cookieStore.set("session", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return Response.redirect(getRedirectUrl("/"), 303);
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    return Response.redirect(
      getRedirectUrl("/login?authError=AUTH_ERR_FAIL"),
      303,
    );
  }
}
