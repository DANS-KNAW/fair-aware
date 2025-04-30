"use client";

//import Breadcrumbs from "@/components/breadcrumbs";
import Breadcrumbs from "@/components/beardcrumbs"; // this is weird, what was going on here deliberate typo?
import { ToastContext } from "@/context/toast-context";
import useDigitalObjectType from "@/hooks/use-digital-object-type";
import { useContext } from "react";

export default function ClientPage({ uuid }: { uuid: string }) {
  const { data, isLoading, isError } = useDigitalObjectType(uuid);
  const toasts = useContext(ToastContext);

  if (isLoading) {
    return <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>;
  }

  if (isError || !data) {
    return <h1 className="text-2xl font-bold text-gray-800">Error</h1>;
  }

  async function handleDelete() {
    const confirmed = confirm(
      "Are you sure you want to delete this Digital Object Type? This action cannot be undone.",
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/digital-object-types/${uuid}`,
          {
            method: "DELETE", // tip: use GET for testing, or make above url invalid!
          },
        );
        if (!response.ok) {
          throw new Error(`Failed to delete the Digital Object Type : ${uuid}`);
        }
        // Ahh, we don't want the toast message, because we are redirected to the list page
        window.location.href = "/cms/digital-object-types";
      } catch (error) {
        toasts.setToasts({
          type: "error",
          message: "Failed to delete DOT.",
          subtext: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }
  }

  return (
    <>
      <div className="sticky top-0 z-10 -mt-14 border-b border-gray-300 bg-white pt-14 pb-8">
        <Breadcrumbs />

        <h1 className="flex flex-col items-center justify-between sm:flex-row">
          Digital Object Type
        </h1>
        <p className="text-base text-gray-600">
          Here you can view and edit the details of a Digital Object Type.
        </p>

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
      <div className="mt-12 border-t border-gray-900/10">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Label
            </label>
            <div className="mt-2">
              <p className="block w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                {data.label}
              </p>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Code
            </label>
            <div className="mt-2">
              <p className="block w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                {data.code}
              </p>
            </div>
          </div>

          {/* <div className="col-span-full">
            <label
              htmlFor="about"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="about"
                name="about"
                rows={3}
                className="focus:outline-fair_dark_blue-600 block w-full rounded-md border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                defaultValue={""}
              />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
