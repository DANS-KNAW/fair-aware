import { createContext } from "react";

export interface ToastContextProps {
  toasts: {
    message: string;
    type: "success" | "error" | "info";
  }[];
}

export const ToastContext = createContext<ToastContextProps>({ toasts: [] });
