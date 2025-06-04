"use client";

import { OAuthButton } from "@/components/oauth-button";
import Image from "next/image";
import { useRef, useEffect } from "react";
//import keycloak from "./keycloak"; // your configured keycloak instance
import { useAuth } from "react-oidc-context";
//import AuthButtons from "./authbuttons";
import { usePathname } from "next/navigation";

export default function Login() {
  const auth = useAuth();
  auth.isAuthenticated

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
          <h2 className="mt-8 font-bold text-gray-900">Welkom back!</h2>

          
          {auth.isAuthenticated ? (
            <>
            {console.log(auth.user?.profile)}
              <p>Welcome, {
                auth.user?.profile?.preferred_username || ""
                }!</p>
              <p>You are already logged in, maybe want to logout...</p>
              <button
                className="mt-4 inline-flex items-center justify-center rounded-md bg-fair_blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-fair_blue-700 focus:outline-none focus:ring-2 focus:ring-fair_blue-500 focus:ring-offset-2"
                onClick={() => auth.signoutRedirect()}
              >
                Logout
              </button>
            </>
          ) : (
            <p>Not logged in yet!</p>
          )}

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

          {/* <div className="mt-8 space-y-6">
  <AuthButtons />
</div> */}
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="from-fair_dark_blue-600 via-fair_blue-600 to-fair_yellow-600 absolute -top-44 -left-36 z-10 h-96 w-[30rem] rotate-[190deg] bg-linear-to-br from-0% via-45% to-100% blur-3xl"></div>
      </div>
    </div>
  );
}
