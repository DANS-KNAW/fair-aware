"use client";

import Breadcrumbs from "@/components/beardcrumbs";
import { ToastContext } from "@/context/toast-context";
import useGlossary from "@/hooks/use-glossary";
import Link from "next/link";
import { useContext } from "react";

export default function ClientPage({ uuid }: { uuid: string }) {
  const { data, isLoading, isError } = useGlossary(uuid);
  const toasts = useContext(ToastContext);

  const handleDelete = async () => {
    const confirmed = confirm(
      "Are you sure you want to delete this glossary? This action cannot be undone.",
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/glossaries/${uuid}`,
          {
            method: "DELETE",
          },
        );
        if (!response.ok) {
          throw new Error(`Failed to delete the glossary: ${uuid}`);
        }
        window.location.href = "/cms/glossaries";
      } catch (error) {
        toasts.setToasts({
          type: "error",
          message: "Failed to delete glossary.",
          subtext: `Error: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        });
      }
    }
  };

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
            <h1 className="mb-2 text-2xl font-bold text-gray-800">Glossary</h1>
            <p className="text-base text-gray-600">This is a glossary.</p>
          </div>
        </div>


        <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => {
            handleDelete();
          }}
          className="flex cursor-pointer items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          <span className="mr-2">Delete</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="size-4"
          >
            <path
              fillRule="evenodd"
              d="M9 3a3 3 0 0 1 6 0h5.25a.75.75 0 0 1 0 1.5h-.801l-.916 14.662A3.75 3.75 0 0 1 14.792 22H9.208a3.75 3.75 0 0 1-3.741-3.838L4.55 4.5H3.75a.75.75 0 0 1 0-1.5H9Zm1.5 0a1.5 1.5 0 0 1 3 0h-3ZM8.05 4.5l.9 14.4a2.25 2.25 0 0 0 2.258 2.1h5.584a2.25 2.25 0 0 0 2.258-2.1l.9-14.4H8.05ZM10 9a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5A.75.75 0 0 1 10 9Zm4 .75a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0v-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      
      </div>



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
            Title
          </label>
          <div className="mt-2">
            <p className="block w-full py-1.5 text-base font-bold text-gray-600 sm:text-sm/6">
              {data.title}
            </p>
          </div>
        </div>
        <div className="sm:col-span-3">
          <label className="block text-sm/6 font-medium text-gray-900">
            DOT Code
          </label>
          <div className="mt-2">
            <p className="block w-full py-1.5 text-base font-bold text-gray-600 sm:text-sm/6">
              {data.digitalObjectType.code}
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
        Glossary items
      </h2>
      {data.items.map((item) => (
        <div
          key={item.uuid}
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 border-t border-gray-300 py-6 sm:grid-cols-6"
        >
          <div className="sm:col-span-6">
            <label className="block text-sm/6 font-medium text-gray-900">
              ID
            </label>
            <div className="mt-2">
              <p className="block min-h-[2.375rem] w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                {item.id}
              </p>
            </div>
          </div>
          <div className="sm:col-span-6">
            <label className="block text-sm/6 font-medium text-gray-900">
              Acronym
            </label>
            <div className="mt-2">
              <p className="block min-h-[2.375rem] w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                {item.acronym}
              </p>
            </div>
          </div>
          <div className="sm:col-span-6">
            <label className="block text-sm/6 font-medium text-gray-900">
              Term
            </label>
            <div className="mt-2">
              <p className="block min-h-[2.375rem] w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                {item.term}
              </p>
            </div>
          </div>
          <div className="sm:col-span-6">
            <label className="block text-sm/6 font-medium text-gray-900">
              Definition
            </label>
            <div className="mt-2">
              <p className="block min-h-[2.375rem] w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                {item.definition}
              </p>
            </div>
          </div>
          <div className="sm:col-span-6">
            <label className="block text-sm/6 font-medium text-gray-900">
              Source URL
            </label>
            <div className="mt-2">
              <p className="block min-h-[2.375rem] w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                {item.sourceUrl ? (
                  <Link
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.sourceUrl}
                  </Link>
                ) : (
                  <span className="text-gray-600">No source available</span>
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
