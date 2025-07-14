"use client";

import { AuthProvider } from "react-oidc-context";
import oidcConfig from "./oidc-config";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // Wrap the children with AuthProvider to provide authentication context
    <AuthProvider {...oidcConfig}>{children}</AuthProvider>
  );
}
