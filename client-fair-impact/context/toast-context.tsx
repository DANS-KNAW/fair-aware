import { createContext } from "react";

export type ToastType = "success" | "error" | "info";

export interface IToast {
  message: string;
  type: ToastType;
  subtext?: string;
}

export interface ToastContextProps {
  toasts: IToast[];
  setToasts: (toasts: IToast) => void;
}

export const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  setToasts: () => {},
});
