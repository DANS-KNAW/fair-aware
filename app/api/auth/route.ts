"use server";

import { OrcidAuthService } from "@/app/lib/auth/orcid";
import getRedirectUrl from "@/app/lib/get-redirect-url";
import { NextRequest } from "next/server";

const orcidAuth = new OrcidAuthService({
  clientId: process.env.ORCID_CLIENT_ID!,
  clientSecret: process.env.ORCID_CLIENT_SECRET!,
  redirectUri: process.env.REDIRECT_URI!,
  sandbox: false,
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const SSOType = searchParams.get("type");

  try {
    let authUrl = "";
    switch (SSOType) {
      case "ORCID":
        authUrl = orcidAuth.getAuthorizationUrl();
        break;
      default:
        throw new Error("SSO type not supported " + SSOType);
    }
    return Response.redirect(authUrl, 303);
  } catch (error) {
    console.error(error);
    return Response.redirect(
      getRedirectUrl("/login?authError=AUTH_ERR_SSO_URL"),
      303,
    );
  }
}
