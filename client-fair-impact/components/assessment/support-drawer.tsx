"use client";

import { DigitalObjectTypeCriteria } from "@/types/assessment-template-fair-aware.interface";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import SupportDrawerAccordion from "./support-drawer-arcordion";

interface SupportDrawerProps {
  open: boolean;
  onClose: () => void;
  question: DigitalObjectTypeCriteria;
}

export default function SupportDrawer({
  open,
  onClose,
  question,
}: SupportDrawerProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      unmount={false}
      className="relative z-50"
    >
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold text-gray-900">
                      Support Material
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => onClose()}
                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                          aria-hidden="true"
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
                <div className="relative mt-12 flex-1 px-4 sm:px-6">
                  <div className="text-sm text-gray-800">
                    <dl className="space-y-6 divide-y divide-gray-900/10">
                      <SupportDrawerAccordion
                        material={question.support.what}
                      />
                      <SupportDrawerAccordion material={question.support.why} />
                      <SupportDrawerAccordion material={question.support.how} />
                      <SupportDrawerAccordion
                        material={question.support.more}
                      />
                    </dl>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
