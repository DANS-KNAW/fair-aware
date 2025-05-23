"use client";

import { OAuthButton } from "@/components/oauth-button";
import Image from "next/image";

export default function Login() {
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
          <p className="mt-1 text-sm text-gray-600">
            Sign in to your account to continue.
          </p>

          <div className="mt-8 space-y-6">
            <OAuthButton
              callback={() => {}}
              icon="/ORCID.svg"
              label="Continue with ORCID"
            />
          </div>
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="from-fair_dark_blue-600 via-fair_blue-600 to-fair_yellow-600 absolute -top-44 -left-36 z-10 h-96 w-[30rem] rotate-[190deg] bg-linear-to-br from-0% via-45% to-100% blur-3xl"></div>
      </div>
    </div>
  );
}
