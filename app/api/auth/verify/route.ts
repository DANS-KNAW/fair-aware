import { OrcidAuthService } from "@/app/lib/auth/orcid";
import { NextRequest } from "next/server";

const orcidAuth = new OrcidAuthService({
  clientId: process.env.ORCID_CLIENT_ID!,
  clientSecret: process.env.ORCID_CLIENT_SECRET!,
  redirectUri: process.env.REDIRECT_URI!,
  sandbox: false,
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (!token) {
    return Response.json({ isvalid: false });
  }

  const valid = await orcidAuth.verifyToken(token);

  return Response.json({ isValid: valid });
}
