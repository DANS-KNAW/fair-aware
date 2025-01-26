"use client";

import Toast from "@/components/toast";
import { IToast, ToastContext } from "./toast-context";
import { useState } from "react";

export function Providers({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const [toasts, setToasts] = useState<IToast[]>([]);

  return (
    <ToastContext.Provider value={{ toasts, setToasts }}>
      {children}
      <Toast />
    </ToastContext.Provider>
  );
}
