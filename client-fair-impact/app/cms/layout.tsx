"use client";

import Header from "@/components/cms/header";
import { AuthProvider, useAuth } from "react-oidc-context";
import oidcConfig from "../login/oidc-config";

export default function CMSLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider {...oidcConfig}>
      <Authenticate>
        <div className="h-full lg:ml-72 xl:ml-80">
          <Header />
          <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
            <main className="flex-auto">
              <div className="[html_:where(&>*)]:max-w-40rem] [html_:where(&>*)]:mx-auto lg:[html_:where(&>*)]:mx-[calc(50%-min(50%,33rem))] 2xl:[html_:where(&>*)]:max-w-[66rem]">
                {children}
              </div>
            </main>
          </div>
        </div>
      </Authenticate>
    </AuthProvider>
  );
}

function Authenticate ({children}: {children: React.ReactNode}) {
  const auth = useAuth();
  if (!auth.isAuthenticated) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-600">You must be logged in to view this content.</p>
      </div>
    );
  };
  return (
    <>
      {children}
    </>
  );

}