import { DotSupportSection } from "@/types/assessment-template-fair-aware.interface";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

interface SupportDrawerAccordionProps {
  material: DotSupportSection;
}

export default function SupportDrawerAccordion({
  material,
}: SupportDrawerAccordionProps) {
  return (
    <dl className="space-y-6">
      <Disclosure key={material.title} as="div" className="pt-6">
        <dt className="mt-2">
          <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-700">
            <span className="text-fair_dark_blue-600 text-lg/7 font-bold">
              {material.title}
            </span>
            <span className="ml-6 flex h-7 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
                className="size-6 group-data-open:hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
                className="size-6 group-[&:not([data-open])]:hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </span>
          </DisclosureButton>
        </dt>
        <DisclosurePanel as="dd" className="mt-6 pr-12">
          <div
            className="prose prose-a:text-fair_dark_blue-600 prose-a:underline prose-a:hover:text-fair_dark_blue-400 space-y-4 text-sm text-gray-600"
            dangerouslySetInnerHTML={{ __html: material.text }}
          />
        </DisclosurePanel>
      </Disclosure>
    </dl>
  );
}
