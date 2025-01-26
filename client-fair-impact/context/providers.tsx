"use client";

import { ToastContext } from "./toast-context";

export function Providers({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <ToastContext.Provider value={{ toasts: [] }}>
      {children}
    </ToastContext.Provider>
  );
}
