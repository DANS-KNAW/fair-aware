"use client";

//import Breadcrumbs from "@/components/breadcrumbs";
import Breadcrumbs from "@/components/beardcrumbs"; // this is weird, what was going on here deliberate typo?
import useDigitalObjectType from "@/hooks/use-digital-object-type";

export default function ClientPage({ uuid }: { uuid: string }) {
  const { data, isLoading, isError } = useDigitalObjectType(uuid);

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

        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          Digital Object Type
        </h1>
        <p className="text-base text-gray-600">
          Here you can view and edit the details of a Digital Object Type.
        </p>

        <div className="flex space-x-8">
          
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
