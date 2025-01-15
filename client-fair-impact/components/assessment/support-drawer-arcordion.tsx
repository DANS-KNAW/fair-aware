import { DotSupportSection } from "@/types/assessment-template-fair-aware.interface";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

interface SupportDrawerAccordionProps {
  materials: DotSupportSection[];
}

export default function SupportDrawerAccordion({
  materials,
}: SupportDrawerAccordionProps) {
  return (
    <dl className="space-y-6 divide-y divide-gray-900/10">
      {materials.map((material) => (
        <Disclosure key={material.title} as="div" className="pt-6">
          <dt>
            <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-700">
              <span className="text-base/7 font-semibold">
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
                  className="size-6 group-data-[open]:hidden"
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
          <DisclosurePanel as="dd" className="mt-2 pr-12">
            <div
              className="text-sm text-gray-600"
              dangerouslySetInnerHTML={{ __html: material.text }}
            />
          </DisclosurePanel>
        </Disclosure>
      ))}
    </dl>
  );
}
