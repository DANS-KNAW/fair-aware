import ToggleInput from "@/components/form/toggle.input";
import { IDigitalObjectTypeSchema } from "@/types/entities/digital-object-type-schema.interface";
import { data } from "framer-motion/client";
import Link from "next/link";
import { Fragment } from "react";

interface DOTSReadViewProps {
  dots: IDigitalObjectTypeSchema;
}

export default function DOTSReadView({ dots }: DOTSReadViewProps) {
  return (
    <>
      <h2 className="mt-8 text-base/7 font-semibold text-gray-900">
        Schema Metadata
      </h2>
      <p className="mt-1 text-sm/6 text-gray-600">
        Contains key details about the schema, such as its digital object type,
        and version.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label className="block text-sm/6 font-medium text-gray-900">
            UUID
          </label>
          <div className="mt-2">
            <p className="block w-full py-1.5 text-base font-bold text-gray-600 sm:text-sm/6">
              {dots.uuid}
            </p>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-sm/6 font-medium text-gray-900">
            Version
          </label>
          <div className="mt-2">
            <p className="block w-full py-1.5 text-base font-bold text-gray-600 sm:text-sm/6">
              {dots.version}
            </p>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-sm/6 font-medium text-gray-900">
            Digital Object Type
          </label>
          <div className="mt-2">
            <Link
              href={"/cms/digital-object-types/" + dots.digitalObjectType.uuid}
              className="hover:text-fair_dark_blue-600 group flex w-full py-1.5 text-base font-bold text-gray-600 hover:underline sm:text-sm/6"
            >
              <span>{dots.digitalObjectType.code}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
                className="group-hover:text-fair_dark_blue-600 ml-1 size-4"
              >
                <path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z" />
                <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-sm/6 font-medium text-gray-900">
            Schema Type
          </label>
          <div className="mt-2">
            <p className="block w-full py-1.5 text-base font-bold text-gray-600 sm:text-sm/6">
              FAIR
            </p>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-sm/6 font-medium text-gray-900">
            Support Email
          </label>
          <div className="mt-2">
            <p className="block w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
              {dots.schema.supportEmail || "-"}
            </p>
          </div>
        </div>
      </div>

      <h2 className="mt-8 border-t border-gray-500 pt-8 text-base/7 font-semibold text-gray-900">
        Schema Content
      </h2>
      <p className="mt-1 text-sm/6 text-gray-600">
        This section manages the structure of the schema. Note: The actuall
        content of the schema is defined in it's respective CLM schema.
      </p>
      {dots.schema.assessment.length < 1 && (
        <div
          className={`mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6`}
        >
          <div className="sm:col-span-full">
            <h3 className="block text-center text-base/6 font-medium text-gray-900">
              There are no principles defined in this schema.
            </h3>
          </div>
        </div>
      )}

      {dots.schema.assessment.map((printiple, index) => (
        <div
          key={"PRINCIPLE" + index}
          className={`mt-10 grid grid-cols-1 gap-x-6 gap-y-8 rounded-md border border-gray-300 px-6 py-4 pt-8 shadow-md sm:grid-cols-6`}
        >
          <div className="sm:col-span-full">
            <h3 className="block text-base/6 font-medium text-gray-900">
              Principle - {index + 1}
            </h3>
          </div>

          {/* We do not check if the length of criteria is empty as an principle should ALWAYS have one criteria. */}
          {printiple.criteria.map((criterium, index) => (
            <Fragment key={"CRITERIUM" + index}>
              <div
                className={`sm:col-span-full ${printiple.criteria.length - 1 < index ? "" : "border-t border-gray-300 pt-4"}`}
              >
                <h4 className="block text-sm/6 font-medium text-gray-900">
                  Criterium - {index + 1}
                </h4>
              </div>

              <div className="sm:col-span-3">
                <label className="mr-3 block text-sm/6 text-gray-900">
                  Criterium required
                </label>
              </div>
              <div className="sm:col-span-3">
                <ToggleInput />
              </div>

              <div className="sm:col-span-3">
                <label className="mr-3 block text-sm/6 text-gray-900">
                  Include Likelihood Question
                </label>
              </div>
              <div className="sm:col-span-3">
                <ToggleInput />
              </div>
            </Fragment>
          ))}
        </div>
      ))}
    </>
  );
}
