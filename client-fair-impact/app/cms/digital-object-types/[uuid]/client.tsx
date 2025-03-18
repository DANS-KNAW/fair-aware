"use client";

import useDigitalObjectType from "@/hooks/use-digital-object-type";
import Breadcrumbs from "@/components/beardcrumbs";

export default function ClientPage({ uuid }: { uuid: string }) {
  const { data, isLoading, isError } = useDigitalObjectType(uuid);

  if (isLoading) {
    return <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>;
  }

  if (isError || !data) {
    return <h1 className="text-2xl font-bold text-gray-800">Error</h1>;
  }

  async function handleDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
    event.preventDefault();
    if (confirm("Are you sure you want to delete this Digital Object Type?")) {
      try {
        // Replace with your actual delete logic, e.g., an API call
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/digital-object-types/${uuid}`, {
          method: "DELETE",
        });
        alert("Digital Object Type deleted successfully.");
        // redirect or update the UI after deletion
        window.location.href = "/cms/digital-object-types";
      } catch (error) {
        console.error("Failed to delete Digital Object Type:", error);
        alert("Failed to delete Digital Object Type.");
      }
    }
  }
  
  return (

    <>
      <div className="sticky top-0 z-10 -mt-14 border-b border-gray-300 bg-white pt-14 pb-8">
        <Breadcrumbs />
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-gray-800">
              Digital Object Type
            </h1>
            <p className="text-base text-gray-600">
              Here you can view and edit the details of a Digital Object Type.
            </p>
          </div>
          <div className="flex space-x-8">
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-500 focus-visible:outline-red-600 flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="mr-2">Delete</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
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
          </div>
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
    </>
  );
}
