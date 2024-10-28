"use client";

import { SSOLogin } from "@/app/components/form/sso-login";
import Notification from "@/app/components/notification";
import { AuthenticationErrors } from "@/app/types/authentication";
import { SSOTypes } from "@/app/types/sso-types";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function NotificationWrapper() {
  const searchParams = useSearchParams();

  const handleNotification = () => {
    const rawError = searchParams.get("authError") as AuthenticationErrors;
    if (!rawError || !(rawError in AuthenticationErrors)) return null;
    const error = rawError as AuthenticationErrors;

    const error_messages: {
      [key in AuthenticationErrors]: { title: string; subtext?: string };
    } = {
      AUTH_ERR_FAIL: {
        title: "Failed to authenticate.",
        subtext: "Try again later.",
      },
      AUTH_ERR_SSO_URL: {
        title: "Failed to authenticate.",
        subtext: "Could not reach SSO provider. Try again later.",
      },
    };

    return (
      <Notification
        title={error_messages[error].title}
        subtext={error_messages[error].subtext}
      />
    );
  };

  return handleNotification();
}

export default function Login() {
  const router = useRouter();

  const handleSSO = async (type: SSOTypes) => {
    try {
      router.replace("/api/auth?type=" + type);
    } catch (error) {
      console.error("Error authenticating with ORCID", error);
    }
  };

  return (
    <>
      <div className="h-dvh overflow-hidden">
        <div className="relative mx-auto max-w-7xl">
          <div className="absolute -top-44 right-0 z-10 h-96 w-80 rotate-[80deg] bg-gradient-to-br from-fair_dark_blue-600 from-0% via-fair_blue-600 via-45% to-fair_yellow-600 to-100% blur-3xl"></div>
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
              <SSOLogin
                callback={() => handleSSO("ORCID")}
                icon="/ORCID.svg"
                label="Continue with ORCID"
              />
              <SSOLogin
                callback={() => handleSSO("GOOGLE")}
                icon="/google.svg"
                label="Continue with Google"
              />
              <SSOLogin
                callback={() => handleSSO("MICROSOFT")}
                icon="/microsoft.svg"
                label="Continue with Microsoft"
              />
            </div>
          </div>
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="absolute -left-36 -top-44 z-10 h-96 w-[30rem] rotate-[190deg] bg-gradient-to-br from-fair_dark_blue-600 from-0% via-fair_blue-600 via-45% to-fair_yellow-600 to-100% blur-3xl"></div>
        </div>
      </div>
      <Suspense fallback={null}>
        <NotificationWrapper />
      </Suspense>
    </>
  );
}
