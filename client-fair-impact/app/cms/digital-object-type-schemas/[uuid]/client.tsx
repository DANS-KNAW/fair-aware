"use client";

import useDigitalObjectTypeSchema from "@/hooks/use-digital-object-type-schema";
import DOTSReadView from "./read";
import { useContext, useState } from "react";
import DOTSEditView from "./edit";
import Breadcrumbs from "@/components/beardcrumbs";
import { IDigitalObjectTypeSchema } from "@/types/entities/digital-object-type-schema.interface";
import PatchDOTSFetch from "@/lib/mutations/patch-dots-fetch";
import { getQueryClient } from "@/lib/query-provider";
import { ToastContext } from "@/context/toast-context";
import { useMutation } from "@tanstack/react-query";

function ViewWrapper({
  dots,
  uuid,
  toggleEditMode,
  editMode,
  children,
}: {
  dots: IDigitalObjectTypeSchema;
  uuid: string;
  toggleEditMode: () => void;
  editMode: boolean;
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  const toasts = useContext(ToastContext);

  const mutation = useMutation({
    mutationFn: (newDots: IDigitalObjectTypeSchema) => PatchDOTSFetch(newDots),
    onSuccess: () => {
      toasts.setToasts({
        type: "success",
        message: "Successfully updated!",
        subtext: "DOTS has been updated successfully.",
      });
      queryClient.invalidateQueries({
        queryKey: ["digitalObjectTypeSchema", uuid],
      });
    },
    onError: (error) => {
      toasts.setToasts({
        type: "error",
        message: "Failed to update DOTS.",
        subtext: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    },
  });

  async function handleDelete() {
    const confirmed = confirm(
      "Are you sure you want to delete this Digital Object Type Schema? This action cannot be undone.",
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/digital-object-type-schemas/${uuid}`,
          {
            method: "DELETE", // tip: use GET for testing, or make above url invalid!
          },
        );
        if (!response.ok) {
          throw new Error(
            `Failed to delete the Digital Object Type Schema: ${uuid}`,
          );
        }
        // Ahh, we don't want the toast message, because we are redirected to the list page
        window.location.href = "/cms/digital-object-type-schemas";
      } catch (error) {
        toasts.setToasts({
          type: "error",
          message: "Failed to delete DOTS.",
          subtext: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
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
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => {
                  const blob = new Blob([JSON.stringify(dots, null, 2)], {
                    type: "application/json",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `digital-object-type-schema-${uuid}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex cursor-pointer items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                <span className="mr-2">Download</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                  className="size-4"
                >
                  <path d="M8 1.5a.75.75 0 0 1 .75.75v6.69l2.22-2.22a.75.75 0 0 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 0 1 1.06-1.06l2.22 2.22V2.25A.75.75 0 0 1 8 1.5Z" />
                  <path d="M3.5 9.75a.75.75 0 0 1 .75.75v2.25c0 .69.56 1.25 1.25 1.25h4.5c.69 0 1.25-.56 1.25-1.25V10.5a.75.75 0 0 1 1.5 0v2.25A2.75 2.75 0 0 1 10 15.5H5.75A2.75 2.75 0 0 1 3 12.75V10.5a.75.75 0 0 1 .75-.75Z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "application/json";
                  input.onchange = async (event) => {
                    const file = (event.target as HTMLInputElement).files?.[0];
                    if (file) {
                      const text = await file.text();
                      try {
                        const parsedData = JSON.parse(text);
                        console.log("Uploaded DOTS:", parsedData);
                        mutation.mutate(parsedData);
                      } catch (error) {
                        console.error("Invalid JSON file: " + error);
                        toasts.setToasts({
                          type: "error",
                          message: `Invalid JSON file: ${error instanceof Error ? error.message : "Unknown error"}`,
                          subtext: "Please upload a valid JSON file.",
                        });
                      }
                    }
                  };
                  input.click();
                }}
                className="flex cursor-pointer items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                <span className="mr-2">Upload</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                  className="size-4"
                >
                  <path d="M8 14.5a.75.75 0 0 1-.75-.75V7.06L5.03 9.28a.75.75 0 0 1-1.06-1.06l3.5-3.5a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 0 1-1.06 1.06L8.75 7.06v6.69a.75.75 0 0 1-.75.75Z" />
                  <path d="M3.5 6.25a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H4.25a.75.75 0 0 1-.75-.75Z" />
                </svg>
              </button>

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

              <button
                disabled={true}
                type="button"
                onClick={() => {
                  handleDelete();
                }}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  true // Replace with a condition if needed
                    ? "cursor-not-allowed bg-gray-400 text-gray-200"
                    : "cursor-pointer bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600"
                }`}
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
      <ViewWrapper
        dots={data}
        uuid={uuid}
        editMode={editMode}
        toggleEditMode={handleEditMode}
      >
        <DOTSEditView dots={data} handleEditMode={handleEditMode} />
      </ViewWrapper>
    );
  }

  return (
    <ViewWrapper
      dots={data}
      uuid={uuid}
      editMode={editMode}
      toggleEditMode={handleEditMode}
    >
      <DOTSReadView dots={data} />
      {/* <ClientDOTSssPage uuid={uuid} /> */}
    </ViewWrapper>
  );
}
