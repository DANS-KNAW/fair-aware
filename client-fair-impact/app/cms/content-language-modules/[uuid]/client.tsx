"use client";

import Breadcrumbs from "@/components/beardcrumbs";
import useContentLanguageModule from "@/hooks/use-content-language-module";
import Link from "next/link";
import { Fragment } from "react";

export default function CLMDetailClientPage({ uuid }: { uuid: string }) {
  const { data, isLoading, isError } = useContentLanguageModule(uuid);

  if (isLoading) {
    return <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>;
  }

  if (isError || !data) {
    return <h1 className="text-2xl font-bold text-gray-800">Error</h1>;
  }

  return (
    <>
      <div className="sticky top-0 z-10 -mt-14 border-b border-gray-300 bg-white pt-14 pb-8">
        <Breadcrumbs />
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-gray-800">
              Content Language Module
            </h1>
            <p className="text-base text-gray-600">
              This is a content language module any language changes can be made
              here.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-12 mb-24">
        <h2 className="mt-8 text-base/7 font-semibold text-gray-900">
          Schema Metadata
        </h2>
        <p className="mt-1 text-sm/6 text-gray-600">
          Contains key details about the schema, such as its digital object
          type, and version.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label className="block text-sm/6 font-medium text-gray-900">
              UUID
            </label>
            <div className="mt-2">
              <p className="block w-full py-1.5 text-base font-bold text-gray-600 sm:text-sm/6">
                {data.uuid}
              </p>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm/6 font-medium text-gray-900">
              Digital Object Type
            </label>
            <div className="mt-2">
              <Link
                href={
                  "/cms/digital-object-types/" + data.digitalObjectType.uuid
                }
                className="hover:text-fair_dark_blue-600 group flex w-full py-1.5 text-base font-bold text-gray-600 hover:underline sm:text-sm/6"
              >
                <span>{data.digitalObjectType.code}</span>
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
              DOT Schema Version
            </label>
            <div className="mt-2">
              <Link
                href={
                  "/cms/digital-object-type-schemas/" +
                  data.digitalObjectTypeSchema.uuid
                }
                className="hover:text-fair_dark_blue-600 group flex w-full py-1.5 text-base font-bold text-gray-600 hover:underline sm:text-sm/6"
              >
                <span>{data.digitalObjectTypeSchema.uuid}</span>
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
              Language
            </label>
            <div className="mt-2">
              <p className="block w-full py-1.5 text-base font-bold text-gray-600 sm:text-sm/6">
                {data.language.englishLabel}
              </p>
            </div>
          </div>
        </div>

        <h2 className="mt-8 border-t border-gray-500 pt-8 text-base/7 font-semibold text-gray-900">
          Schema Content
        </h2>
        <p className="mt-1 text-sm/6 text-gray-600">
          This section manages the structure of the schema. Note: The actual
          content of the schema is defined in its respective CLM schema.
        </p>

        {data.digitalObjectTypeSchema.schema.assessment.length < 1 && (
          <div
            className={`mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6`}
          >
            <div className="mt-20 sm:col-span-full">
              <h3 className="block text-center text-base/6 font-medium text-gray-900">
                There was no content found for this schema
              </h3>
              <div className="flex justify-center">
                <Link
                  className="hover:text-fair_dark_blue-600 mt-2 text-gray-600 hover:underline"
                  href={
                    "/cms/digital-object-type-schemas/" +
                    data.digitalObjectTypeSchema.uuid
                  }
                >
                  Please add content to the respective CLM schema.
                </Link>
              </div>
            </div>
          </div>
        )}

        {data.schema.assessment.map((principle, index) => (
          <div
            key={"PRINCIPLE" + index}
            className={`mt-10 grid grid-cols-1 gap-x-6 gap-y-8 py-4 pt-8 sm:grid-cols-6`}
          >
            <div className="sm:col-span-full">
              <label className="block text-base/6 font-medium text-gray-900">
                Principle - {index + 1}
              </label>
              <div className="mt-2">
                <p className="block min-h-[2.375rem] w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                  {principle.principle}
                </p>
              </div>
            </div>

            {/* We do not check if the length of criteria is empty as a principle should ALWAYS have one criteria. */}
            {principle.criteria.map((criterium, criteriumIndex) => (
              <Fragment key={"CRITERIUM" + criteriumIndex + index}>
                <div
                  className={`sm:col-span-full ${principle.criteria.length - 1 < criteriumIndex ? "" : "border-t border-gray-300 pt-4"}`}
                >
                  <h4 className="block text-sm/6 font-medium text-gray-900">
                    Criterium - {index + 1}
                  </h4>
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-sm/6 font-medium text-gray-900">
                    Criterium Label
                  </label>
                  <div className="mt-2">
                    <p className="block min-h-[2.375rem] w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                      {criterium.criteria}
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-sm/6 font-medium text-gray-900">
                    Criterium Question
                  </label>
                  <div className="mt-2">
                    <p className="block min-h-[2.375rem] w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                      {criterium.question}
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-sm/6 font-medium text-gray-900">
                    Criterium Principle
                  </label>
                  <div className="mt-2">
                    <p className="block min-h-[2.375rem] w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                      {criterium.principle}
                    </p>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
