"use client";

import Breadcrumbs from "@/components/beardcrumbs";
import BasicTextInput from "@/components/form/basic-text-input";
import Editor from "@/components/form/lexical/editor";
import { ToastContext } from "@/context/toast-context";
import useContentLanguageModule from "@/hooks/use-content-language-module";
import PatchCLMFetch from "@/lib/mutations/patch-clm-fetch";
import { getQueryClient } from "@/lib/query-provider";
import { ContentLanguageModuleFairAwareTemplate } from "@/types/assessment-template-fair-aware.interface";
import { IContentLanguageModule } from "@/types/entities/content-language-module.interface";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { Fragment, useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";

function ReadView({
  contentLanguageModule,
}: {
  contentLanguageModule: IContentLanguageModule;
}) {
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
              {contentLanguageModule.uuid}
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
                "/cms/digital-object-types/" +
                contentLanguageModule.digitalObjectType.uuid
              }
              className="hover:text-fair_dark_blue-600 group flex w-full py-1.5 text-base font-bold text-gray-600 hover:underline sm:text-sm/6"
            >
              <span>{contentLanguageModule.digitalObjectType.code}</span>
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
                contentLanguageModule.digitalObjectTypeSchema.uuid
              }
              className="hover:text-fair_dark_blue-600 group flex w-full py-1.5 text-base font-bold text-gray-600 hover:underline sm:text-sm/6"
            >
              <span>{contentLanguageModule.digitalObjectTypeSchema.uuid}</span>
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
              {contentLanguageModule.language.englishLabel}
            </p>
          </div>
        </div>
      </div>

      <h2 className="mt-8 border-t border-gray-500 pt-8 text-base/7 font-semibold text-gray-900">
        Schema Content
      </h2>
      <p className="mt-1 text-sm/6 text-gray-600">
        Contains the content of the schema, such as its principles and
        criteriums.
      </p>

      {contentLanguageModule.schema.assessment.length < 1 && (
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
                  contentLanguageModule.digitalObjectTypeSchema.uuid
                }
              >
                Please add content to the respective CLM schema.
              </Link>
            </div>
          </div>
        </div>
      )}

      {contentLanguageModule.schema.assessment.map((principle, index) => (
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
                  Criterium - {criteriumIndex + 1}
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

              <div className="sm:col-span-full">
                <h4 className="block text-sm/6 font-medium text-gray-900">
                  Support
                </h4>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">
                  What - Title
                </label>
                <div className="mt-2">
                  <p className="block min-h-[2.375rem] w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                    {criterium.support.what.title}
                  </p>
                </div>
              </div>

              <div className="sm:col-span-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  What - Text
                </label>
                <div className="mt-2">
                  <div
                    className="prose prose-a:text-fair_dark_blue-600 prose-a:hover:text-fair_dark_blue-500 block min-h-[2.375rem] w-full min-w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6"
                    dangerouslySetInnerHTML={{
                      __html: criterium.support.what.text,
                    }}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Why - Title
                </label>
                <div className="mt-2">
                  <p className="block min-h-[2.375rem] w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                    {criterium.support.why.title}
                  </p>
                </div>
              </div>

              <div className="sm:col-span-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Why - Text
                </label>
                <div className="mt-2">
                  <div
                    className="prose prose-a:text-fair_dark_blue-600 prose-a:hover:text-fair_dark_blue-500 block min-h-[2.375rem] w-full min-w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6"
                    dangerouslySetInnerHTML={{
                      __html: criterium.support.why.text,
                    }}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">
                  How - Title
                </label>
                <div className="mt-2">
                  <p className="block min-h-[2.375rem] w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                    {criterium.support.how.title}
                  </p>
                </div>
              </div>

              <div className="sm:col-span-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  How - Text
                </label>
                <div className="mt-2">
                  <div
                    className="prose prose-a:text-fair_dark_blue-600 prose-a:hover:text-fair_dark_blue-500 block min-h-[2.375rem] w-full min-w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6"
                    dangerouslySetInnerHTML={{
                      __html: criterium.support.how.text,
                    }}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">
                  More - Title
                </label>
                <div className="mt-2">
                  <p className="block min-h-[2.375rem] w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                    {criterium.support.more.title}
                  </p>
                </div>
              </div>

              <div className="sm:col-span-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  More - Text
                </label>
                <div className="mt-2">
                  <div
                    className="prose prose-a:text-fair_dark_blue-600 prose-a:hover:text-fair_dark_blue-500 block min-h-[2.375rem] w-full min-w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6"
                    dangerouslySetInnerHTML={{
                      __html: criterium.support.more.text,
                    }}
                  />
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      ))}
    </>
  );
}

function EditView({
  contentLanguageModule,
  handleEditMode,
}: {
  contentLanguageModule: IContentLanguageModule;
  handleEditMode: () => void;
}) {
  const queryClient = getQueryClient();
  const toasts = useContext(ToastContext);
  const { register, handleSubmit, control } =
    useForm<ContentLanguageModuleFairAwareTemplate>({
      defaultValues: contentLanguageModule.schema,
    });

  const mutation = useMutation({
    mutationFn: (updatedContentLanguageModule: IContentLanguageModule) =>
      PatchCLMFetch(updatedContentLanguageModule),
    onSuccess: () => {
      toasts.setToasts({
        type: "success",
        message: "Successfully updated!",
        subtext: "CLM has been updated successfully.",
      });
      queryClient.invalidateQueries({
        queryKey: ["contentLanguageModule", contentLanguageModule.uuid],
      });
      handleEditMode();
    },
    onError: () => {
      toasts.setToasts({
        type: "error",
        message: "Failed to update CLM.",
      });
    },
  });

  return (
    <form
      id="CLM-EDIT-FORM"
      onSubmit={handleSubmit((data) =>
        mutation.mutate({ ...contentLanguageModule, schema: data }),
      )}
    >
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
              {contentLanguageModule.uuid}
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
                "/cms/digital-object-types/" +
                contentLanguageModule.digitalObjectType.uuid
              }
              className="hover:text-fair_dark_blue-600 group flex w-full py-1.5 text-base font-bold text-gray-600 hover:underline sm:text-sm/6"
            >
              <span>{contentLanguageModule.digitalObjectType.code}</span>
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
                contentLanguageModule.digitalObjectTypeSchema.uuid
              }
              className="hover:text-fair_dark_blue-600 group flex w-full py-1.5 text-base font-bold text-gray-600 hover:underline sm:text-sm/6"
            >
              <span>{contentLanguageModule.digitalObjectTypeSchema.uuid}</span>
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
              {contentLanguageModule.language.englishLabel}
            </p>
          </div>
        </div>
      </div>

      <h2 className="mt-8 border-t border-gray-500 pt-8 text-base/7 font-semibold text-gray-900">
        Schema Content
      </h2>
      <p className="mt-1 text-sm/6 text-gray-600">
        Contains the content of the schema, such as its principles and
        criteriums.
      </p>

      {contentLanguageModule.schema.assessment.length < 1 && (
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
                  contentLanguageModule.digitalObjectTypeSchema.uuid
                }
              >
                Please add content to the respective CLM schema.
              </Link>
            </div>
          </div>
        </div>
      )}

      {contentLanguageModule.schema.assessment.map((principle, index) => (
        <div
          key={"PRINCIPLE" + index}
          className={`mt-10 grid grid-cols-1 gap-x-6 gap-y-8 py-4 pt-8 sm:grid-cols-6`}
        >
          <div className="sm:col-span-full">
            <label className="block text-base/6 font-medium text-gray-900">
              Principle - {index + 1} <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <BasicTextInput
                register={register}
                name={`assessment.${index}.principle`}
                required
              />
            </div>
          </div>

          {/* We do not check if the length of criteria is empty as a principle should ALWAYS have one criteria. */}
          {principle.criteria.map((_, criteriumIndex) => (
            <Fragment key={"CRITERIUM" + criteriumIndex + index}>
              <div
                className={`sm:col-span-full ${principle.criteria.length - 1 < criteriumIndex ? "" : "border-t border-gray-300 pt-4"}`}
              >
                <h4 className="block text-sm/6 font-medium text-gray-900">
                  Criterium - {criteriumIndex + 1}
                </h4>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Criterium Label <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <BasicTextInput
                    register={register}
                    name={`assessment.${index}.criteria.${criteriumIndex}.criteria`}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Criterium Question <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <BasicTextInput
                    register={register}
                    name={`assessment.${index}.criteria.${criteriumIndex}.question`}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Criterium Principle <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <BasicTextInput
                    register={register}
                    name={`assessment.${index}.criteria.${criteriumIndex}.principle`}
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-full">
                <h4 className="block text-sm/6 font-medium text-gray-900">
                  Support
                </h4>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">
                  What - Title <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <BasicTextInput
                    register={register}
                    name={`assessment.${index}.criteria.${criteriumIndex}.support.what.title`}
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  What - Text <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <Controller
                    name={`assessment.${index}.criteria.${criteriumIndex}.support.what.text`}
                    control={control}
                    defaultValue=""
                    rules={{ required: "This field is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Editor
                          namespace={`assessment.${index}.criteria.${criteriumIndex}.support.what.text`}
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {error && <p className="error">{error.message}</p>}
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Why - Title <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <BasicTextInput
                    register={register}
                    name={`assessment.${index}.criteria.${criteriumIndex}.support.why.title`}
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Why - Text <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <Controller
                    name={`assessment.${index}.criteria.${criteriumIndex}.support.why.text`}
                    control={control}
                    defaultValue=""
                    rules={{ required: "This field is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Editor
                          namespace={`assessment.${index}.criteria.${criteriumIndex}.support.why.text`}
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {error && <p className="error">{error.message}</p>}
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">
                  How - Title <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <BasicTextInput
                    register={register}
                    name={`assessment.${index}.criteria.${criteriumIndex}.support.how.title`}
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  How - Text <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <Controller
                    name={`assessment.${index}.criteria.${criteriumIndex}.support.how.text`}
                    control={control}
                    defaultValue=""
                    rules={{ required: "This field is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Editor
                          namespace={`assessment.${index}.criteria.${criteriumIndex}.support.how.text`}
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {error && <p className="error">{error.message}</p>}
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">
                  More - Title <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <BasicTextInput
                    register={register}
                    name={`assessment.${index}.criteria.${criteriumIndex}.support.more.title`}
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  More - Text <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <Controller
                    name={`assessment.${index}.criteria.${criteriumIndex}.support.more.text`}
                    control={control}
                    defaultValue=""
                    rules={{ required: "This field is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Editor
                          namespace={`assessment.${index}.criteria.${criteriumIndex}.support.more.text`}
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {error && <p className="error">{error.message}</p>}
                      </>
                    )}
                  />
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      ))}
    </form>
  );
}

export default function CLMDetailClientPage({ uuid }: { uuid: string }) {
  const [editMode, setEditMode] = useState(false);
  const { data, isLoading, isError } = useContentLanguageModule(uuid);
  const queryClient = getQueryClient();
  const toasts = useContext(ToastContext);

  const mutation = useMutation({
    mutationFn: (newClm: IContentLanguageModule) =>
      PatchCLMFetch(newClm),
    onSuccess: () => {
      toasts.setToasts({
        type: "success",
        message: "Successfully updated!",
        subtext: "CLM has been updated successfully.",
      });
      queryClient.invalidateQueries({
        queryKey: ["contentLanguageModule", uuid],
      });
    },
    onError: (error) => {
      toasts.setToasts({
        type: "error",
        message: "Failed to update CLM.",
        subtext: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    },
  });

  const handleEditMode = () => {
    setEditMode((editMode) => !editMode);
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
            <h1 className="mb-2 text-2xl font-bold text-gray-800">
              Content Language Module
            </h1>
            <p className="text-base text-gray-600">
              This is a content language module any language changes can be made
              here.
            </p>
          </div>

          {editMode ? (
            <div className="flex space-x-8">
              <button
                type="submit"
                form="CLM-EDIT-FORM"
                className="bg-fair_dark_blue-600 hover:bg-fair_dark_blue-500 focus-visible:outline-fair_dark_blue-600 flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleEditMode}
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
                  const blob = new Blob([JSON.stringify(data, null, 2)], {
                    type: "application/json",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `content-language-module-${uuid}.json`;
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
                        console.log("Uploaded CLM:", parsedData);
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
                onClick={handleEditMode}
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
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 mb-24">
        {editMode ? (
          <EditView
            contentLanguageModule={data}
            handleEditMode={handleEditMode}
          />
        ) : (
          <ReadView contentLanguageModule={data} />
        )}
      </div>
    </>
  );
}
