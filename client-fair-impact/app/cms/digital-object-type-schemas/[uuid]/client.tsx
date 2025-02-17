"use client";

import useDigitalObjectTypeSchema from "@/hooks/use-digital-object-type-schema";
import DOTSReadView from "./read";
import { useState } from "react";
import DOTSEditView from "./edit";
import Breadcrumbs from "@/components/beardcrumbs";

function ViewWrapper({
  toggleEditMode,
  editMode,
  children,
}: {
  toggleEditMode: () => void;
  editMode: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sticky top-0 z-10 -mt-14 border-b border-gray-300 bg-white pt-14 pb-8">
        <Breadcrumbs />
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-gray-800">
              Digital Object Type Schema
            </h1>
            <p className="text-base text-gray-600">
              Inspect and Alter the Digital Object Type Schema (DOTS).
            </p>
          </div>
          {editMode ? (
            <div className="flex space-x-8">
              <button
                type="submit"
                form="DOTS-EDIT-FORM"
                className="bg-fair_dark_blue-600 hover:bg-fair_dark_blue-500 focus-visible:outline-fair_dark_blue-600 flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Save
              </button>
              <button
                type="button"
                onClick={toggleEditMode}
                className="cursor-pointer text-sm/6 font-semibold text-gray-900"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={toggleEditMode}
              className="bg-fair_dark_blue-600 hover:bg-fair_dark_blue-500 focus-visible:outline-fair_dark_blue-600 flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="mr-2">Edit</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="mt-12 mb-24">{children}</div>
    </>
  );
}

export default function ClientDOTSPage({ uuid }: { uuid: string }) {
  const [editMode, setEditMode] = useState(false);
  const { data, isLoading, isError } = useDigitalObjectTypeSchema(uuid);

  const handleEditMode = () => {
    setEditMode((editMode) => !editMode);
  };

  if (isLoading) {
    return <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>;
  }

  if (isError || !data) {
    return <h1 className="text-2xl font-bold text-gray-800">Error</h1>;
  }

  if (editMode) {
    return (
      <ViewWrapper editMode={editMode} toggleEditMode={handleEditMode}>
        <DOTSEditView dots={data} handleEditMode={handleEditMode} />
      </ViewWrapper>
    );
  }

  return (
    <ViewWrapper editMode={editMode} toggleEditMode={handleEditMode}>
      <DOTSReadView dots={data} />
      {/* <ClientDOTSssPage uuid={uuid} /> */}
    </ViewWrapper>
  );
}
