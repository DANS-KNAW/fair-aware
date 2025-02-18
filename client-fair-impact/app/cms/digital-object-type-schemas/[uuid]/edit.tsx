import BasicTextInput from "@/components/form/basic-text-input";
import ToggleInput from "@/components/form/toggle.input";
import { ToastContext } from "@/context/toast-context";
import PatchDOTSFetch from "@/lib/mutations/patch-dots-fetch";
import { getQueryClient } from "@/lib/query-provider";
import { IDigitalObjectTypeSchema } from "@/types/entities/digital-object-type-schema.interface";
import { IFormCreateDOTSFAIR } from "@/types/form/form-create-dots-fair.interface";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { Fragment, useContext } from "react";
import { useForm } from "react-hook-form";

interface DOTSReadViewProps {
  dots: IDigitalObjectTypeSchema;
  handleEditMode: () => void;
}

export default function DOTSEditView({
  dots,
  handleEditMode,
}: DOTSReadViewProps) {
  const queryClient = getQueryClient();
  const { register, handleSubmit, setValue, watch } =
    useForm<IFormCreateDOTSFAIR>({
      defaultValues: {
        supportEmail: dots.schema.supportEmail,
        assessment: dots.schema.assessment,
      },
    });
  const toasts = useContext(ToastContext);

  const mutation = useMutation({
    mutationFn: (data: IDigitalObjectTypeSchema) => PatchDOTSFetch(data),
    onSuccess: () => {
      toasts.setToasts({
        type: "success",
        message: "Successfully updated!",
        subtext: "DOTS has been updated successfully.",
      });
      queryClient.invalidateQueries({
        queryKey: ["digitalObjectTypeSchema", dots.uuid],
      });
      handleEditMode();
    },
    onError: () => {
      toasts.setToasts({
        type: "error",
        message: "Failed to update DOTS.",
      });
    },
  });

  const watchAssessment = watch("assessment");

  const handleAddPrinciple = () => {
    setValue("assessment", [
      ...watchAssessment,
      {
        criteria: [
          {
            required: true,
            displayLikelihood: true,
          },
        ],
      },
    ]);
  };

  const handleDeletePrinciple = (index: number) => {
    const newAssessment = [...watchAssessment];
    newAssessment.splice(index, 1);
    setValue("assessment", newAssessment);
  };

  const handleAddCriterium = (index: number) => {
    const newAssessment = [...watchAssessment];
    newAssessment[index].criteria.push({
      required: true,
      displayLikelihood: true,
    });
    setValue("assessment", newAssessment);
  };

  const handleDeleteCriterium = (
    principleIndex: number,
    criteriumIndex: number,
  ) => {
    const newAssessment = [...watchAssessment];
    newAssessment[principleIndex].criteria.splice(criteriumIndex, 1);
    setValue("assessment", newAssessment);
  };

  return (
    <>
      <form
        id="DOTS-EDIT-FORM"
        onSubmit={handleSubmit(async (data: IFormCreateDOTSFAIR) => {
          const updatedDOTS: IDigitalObjectTypeSchema = {
            ...dots,
            schema: {
              ...dots.schema,
              supportEmail: data.supportEmail,
              assessment: data.assessment,
            },
          };
          mutation.mutate(updatedDOTS);
        })}
      >
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
                href={
                  "/cms/digital-object-types/" + dots.digitalObjectType.uuid
                }
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
              <BasicTextInput
                register={register}
                name="supportEmail"
                required
              />
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

        {watchAssessment.length < 1 && (
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

        {watchAssessment.map((printiple, principleIndex) => (
          <div
            key={"PRINCIPLE" + principleIndex}
            className={`mt-10 grid grid-cols-1 gap-x-6 gap-y-8 rounded-md border border-gray-300 px-6 py-4 pt-8 shadow-md sm:grid-cols-6`}
          >
            <div className="flex items-center justify-between sm:col-span-full">
              <h3 className="block text-base/6 font-medium text-gray-900">
                Principle - {principleIndex + 1}
              </h3>
              <button
                type="button"
                onClick={() => handleDeletePrinciple(principleIndex)}
                className="hover:text-fair_dark_blue-600 cursor-pointer text-gray-800"
              >
                <span className="sr-only">Delete Principle</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>

            {/* We do not check if the length of criteria is empty as an principle should ALWAYS have one criteria. */}
            {printiple.criteria.map((criterium, index) => (
              <Fragment key={"CRITERIUM" + index}>
                <div
                  className={`flex items-center justify-between sm:col-span-full ${printiple.criteria.length - 1 < index ? "" : "border-t border-gray-300 pt-4"}`}
                >
                  <h4 className="block text-sm/6 font-medium text-gray-900">
                    Criterium - {index + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleDeleteCriterium(principleIndex, index)}
                    className="hover:text-fair_dark_blue-600 cursor-pointer text-gray-800"
                  >
                    <span className="sr-only">Delete Principle</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      aria-hidden="true"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>

                <div className="sm:col-span-3">
                  <label className="mr-3 block text-sm/6 text-gray-900">
                    Criterium required
                  </label>
                </div>
                <div className="sm:col-span-3">
                  <ToggleInput
                    enabled={criterium.required}
                    setEnabled={(enabled) => {
                      const newAssessment = [...watchAssessment];
                      newAssessment[principleIndex].criteria[index].required =
                        enabled;
                      setValue("assessment", newAssessment);
                    }}
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="mr-3 block text-sm/6 text-gray-900">
                    Include Likelihood Question
                  </label>
                </div>
                <div className="sm:col-span-3">
                  <ToggleInput
                    enabled={criterium.displayLikelihood}
                    setEnabled={(enabled) => {
                      const newAssessment = [...watchAssessment];
                      newAssessment[principleIndex].criteria[
                        index
                      ].displayLikelihood = enabled;
                      setValue("assessment", newAssessment);
                    }}
                  />
                </div>
              </Fragment>
            ))}
            <div className="mt-8 flex justify-center sm:col-span-full">
              <button
                type="button"
                onClick={() => handleAddCriterium(principleIndex)}
                className="bg-fair_dark_blue-600 hover:bg-fair_dark_blue-500 focus-visible:outline-fair_dark_blue-600 w-48 cursor-pointer rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Add Criterium
              </button>
            </div>
          </div>
        ))}

        <div className="mt-8 flex justify-center border-t border-gray-400 pt-8 sm:col-span-full">
          <button
            type="button"
            onClick={handleAddPrinciple}
            className="bg-fair_dark_blue-600 hover:bg-fair_dark_blue-500 focus-visible:outline-fair_dark_blue-600 w-48 cursor-pointer rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Add Principle
          </button>
        </div>
      </form>
    </>
  );
}
