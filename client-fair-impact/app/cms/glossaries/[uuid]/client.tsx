"use client";

import Breadcrumbs from "@/components/beardcrumbs";
import useGlossary from "@/hooks/use-glossary";

export default function ClientPage({ uuid }: { uuid: string }) {
  const { data, isLoading, isError } = useGlossary(uuid);

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
      </div>
      <h2 className="mt-8 border-t border-gray-500 pt-8 text-base/7 font-semibold text-gray-900">
        Glossary items
      </h2>
      {data.items.map((item, index) => (
        <div
          key={index}
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 border-t border-gray-300 sm:grid-cols-6"
        >
          <div className="sm:col-span-6">
            <label className="block text-sm/6 font-medium text-gray-900"></label>
            <div className="mt-2">
              <p className="block w-full py-1.5 text-base font-bold text-gray-600 sm:text-sm/6">
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
        </div>
      ))}
    </>
  );
}
