"use client";

import { useContext, useState } from "react";
import { Transition } from "@headlessui/react";
import { ToastContext } from "@/context/toast-context";

function Notification({ message, type }: { message: string; type: string }) {
  const [show, setShow] = useState(true);

  return (
    <Transition show={show}>
      <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white ring-1 shadow-lg ring-black/5 transition data-closed:opacity-0 data-enter:transform data-enter:duration-300 data-enter:ease-out data-closed:data-enter:translate-y-2 data-leave:duration-100 data-leave:ease-in data-closed:data-enter:sm:translate-x-2 data-closed:data-enter:sm:translate-y-0">
        <div className="p-4">
          <div className="flex items-start">
            <div className="shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
                className="size-6 text-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">{message}</p>
              <p className="mt-1 text-sm text-gray-500">
                The DOT <strong>DATA</strong> has been created.
              </p>
            </div>
            <div className="ml-4 flex shrink-0">
              <button
                type="button"
                onClick={() => {
                  setShow(false);
                }}
                className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
              >
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}

export default function Toast() {
  const { toasts } = useContext(ToastContext);

  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {toasts.map((toast, index) => (
            <Notification
              key={index}
              message={toast.message}
              type={toast.type}
            />
          ))}
        </div>
      </div>
    </>
  );
}
