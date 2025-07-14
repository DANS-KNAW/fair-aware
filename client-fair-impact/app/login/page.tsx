"use client";

import { OAuthButton } from "@/components/oauth-button";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "react-oidc-context";

export default function Login() {
  const auth = useAuth();

  console.log(`${process.env.KEYCLOAK_AUTH_SERVER_URL}`);
  console.log(`${process.env.KEYCLOAK_REALM}`);
  console.log(`${process.env.KEYCLOAK_CLIENT_ID}`);
  console.log(`${process.env.NEXT_PUBLIC_API_HOST}`);

  // log the authentication state for debugging
  // if (!auth.isLoading && auth.isAuthenticated) {
  //   console.log("Authentication state:", {
  //     user: auth.user,
  //   });
  // }

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  return (
    <div className="h-dvh overflow-hidden">
      <div className="relative mx-auto max-w-7xl">
        <div className="from-fair_dark_blue-600 via-fair_blue-600 to-fair_yellow-600 absolute -top-44 right-0 z-10 h-96 w-80 rotate-[80deg] bg-linear-to-br from-0% via-45% to-100% blur-3xl"></div>
      </div>
      <div className="relative z-50 flex h-dvh flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-md rounded-xl border border-gray-300 bg-white p-4 shadow-lg sm:p-12">
          <div className="relative h-8 w-auto">
            <Image
              src="/fair-aware.svg"
              alt=""
              width={0}
              height={0}
              sizes="100vh"
              style={{ height: "100%", width: "auto" }}
            />
          </div>
          <h2 className="mt-8 font-bold text-gray-900">
            Welcome to FairAware!
          </h2>

          {auth.isAuthenticated ? (
            <>
              <p>Welcome, {auth.user?.profile?.preferred_username || ""}!</p>
              <p>
                <Link href="/" className="text-fair_dark_blue-600 underline">
                  Continue with FairAwaire
                </Link>
              </p>
              <hr className="my-4" />
              <p>You are already logged in, maybe you want to logout?</p>
              <button
                className="bg-fair_blue-600 hover:bg-fair_blue-700 focus:ring-fair_blue-500 mt-4 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
                onClick={() =>
                  auth.signoutRedirect({
                    post_logout_redirect_uri: window.location.origin,
                  })
                }
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <p className="mt-1 text-sm text-gray-600">
                Sign in to your account to continue.
              </p>

              <div className="mt-8 space-y-6">
                {/* <OAuthButton
              callback={() => { }}
              icon="/ORCID.svg"
              label="Continue with ORCID"
            /> */}
                {/* Users do not need to be aware that it is keycloak, using generic icon and label */}
                <OAuthButton
                  callback={() => void auth.signinRedirect()}
                  icon="/login-svgrepo-com.svg"
                  label="Login"
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="from-fair_dark_blue-600 via-fair_blue-600 to-fair_yellow-600 absolute -top-44 -left-36 z-10 h-96 w-[30rem] rotate-[190deg] bg-linear-to-br from-0% via-45% to-100% blur-3xl"></div>
      </div>
    </div>
  );
}
