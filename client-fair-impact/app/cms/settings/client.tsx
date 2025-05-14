"use client";

import Breadcrumbs from "@/components/beardcrumbs";
import EmailInput from "@/components/form/email-input";
import Editor from "@/components/form/lexical/editor";
import UrlInput from "@/components/form/url-input";
import { ToastContext } from "@/context/toast-context";
import useSetting from "@/hooks/use-setting";
import PatchSettingFetch from "@/lib/mutations/patch-setting-fetch";
import { getQueryClient } from "@/lib/query-provider";
import { ISetting } from "@/types/entities/setting.interface";
import { IFormCreateSettings } from "@/types/form/form-create-settings";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";

function ReadView({
  contactEmail,
  privacyPolicyLink,
  introductionText,
}: {
  contactEmail: ISetting | undefined;
  privacyPolicyLink: ISetting | undefined;
  introductionText: ISetting | undefined;
}) {
  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 border-t border-gray-300 py-6 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label className="block text-sm/6 font-medium text-gray-900">
            Contact Email
          </label>
          <div className="mt-2">
            <p className="block min-h-[2.375rem] w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
              {contactEmail?.value || "No contact email set."}
            </p>
          </div>
        </div>
        <div className="sm:col-span-6">
          <label className="block text-sm/6 font-medium text-gray-900">
            Privacy Policy
          </label>
          <div className="mt-2">
            <p className="block min-h-[2.375rem] w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
              {privacyPolicyLink?.value || "No privacy policy link set."}
            </p>
          </div>
        </div>
        <div className="sm:col-span-6">
          <label className="block text-sm/6 font-medium text-gray-900">
            Introduction Text
          </label>
          <div
            className="prose prose-a:text-fair_dark_blue-600 prose-a:hover:text-fair_dark_blue-500 block min-h-[2.375rem] w-full min-w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6"
            dangerouslySetInnerHTML={{ __html: introductionText?.value || "" }}
          />
        </div>
      </div>
    </>
  );
}

function EditView({
  contactEmail,
  privacyPolicyLink,
  introductionText,
  handleEditMode,
}: {
  contactEmail: ISetting | undefined;
  privacyPolicyLink: ISetting | undefined;
  introductionText: ISetting | undefined;
  handleEditMode: () => void;
}) {
  const queryClient = getQueryClient();
  const { register, handleSubmit, control } = useForm<IFormCreateSettings>({
    defaultValues: {
      contactEmail: { id: "ContactEmail", value: contactEmail?.value },
      privacyPolicyLink: {
        id: "PrivacyPolicyLink",
        value: privacyPolicyLink?.value,
      },
      introductionText: {
        id: "IntroductionText",
        value: introductionText?.value,
      },
    },
  });
  const toasts = useContext(ToastContext);

  const doMutate = async (newSettings: IFormCreateSettings) => {
    // patch all the settings
    await Promise.all([
      PatchSettingFetch(newSettings.contactEmail),
      PatchSettingFetch(newSettings.privacyPolicyLink),
      PatchSettingFetch(newSettings.introductionText),
    ]);
  };

  const mutation = useMutation({
    mutationFn: (newSettings: IFormCreateSettings) => doMutate(newSettings),
    onSuccess: () => {
      toasts.setToasts({
        type: "success",
        message: "Successfully updated!",
        subtext: "Settings has been updated successfully.",
      });
      queryClient.invalidateQueries({
        queryKey: ["setting", "ContactEmail"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["setting", "PrivacyPolicyLink"],
      });
      queryClient.invalidateQueries({
        queryKey: ["setting", "IntroductionText"],
      });
      handleEditMode();
    },
    onError: (error) => {
      toasts.setToasts({
        type: "error",
        message: "Failed to update Settings.",
        subtext: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    },
  });

  return (
    <>
      <form
        id="SETTINGS-EDIT-FORM"
        onSubmit={handleSubmit((data) => {
          const newSettings: IFormCreateSettings = data;
          mutation.mutate(newSettings);
        })}
      >
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 border-t border-gray-300 py-6 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label className="block text-sm/6 font-medium text-gray-900">
              Contact Email
            </label>
            <div className="mt-2">
              <EmailInput register={register} name={`contactEmail.value`} />
            </div>
          </div>
          <div className="sm:col-span-6">
            <label className="block text-sm/6 font-medium text-gray-900">
              Privacy Policy
            </label>
            <div className="mt-2">
              <UrlInput register={register} name={`privacyPolicyLink.value`} />
            </div>
          </div>
          <div className="sm:col-span-6">
            <label className="block text-sm/6 font-medium text-gray-900">
              Introduction Text
            </label>
            <div className="mt-2">
              <Controller
                name={`introductionText.value`}
                control={control}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Editor
                      namespace={`introductionText.value`}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {error && <p className="error">{error.message}</p>}
                  </>
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default function SettingsClient() {
  const [editMode, setEditMode] = useState(false);

  // The settings, maybe more efficient to fetch them all at once?
  const {
    data: contactEmail,
    isLoading: isContactEmailLoading,
    isError: isContactEmailError,
  } = useSetting("ContactEmail");
  const {
    data: privacyPolicyLink,
    isLoading: isPrivacyPolicyLoading,
    isError: isPrivacyPolicyLinkError,
  } = useSetting("PrivacyPolicyLink");
  const {
    data: introductionText,
    isLoading: isIntroductionTextLoading,
    isError: isIntroductionTextError,
  } = useSetting("IntroductionText");

  if (
    isContactEmailLoading ||
    isPrivacyPolicyLoading ||
    isIntroductionTextLoading
  ) {
    return <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>;
  }

  if (
    isContactEmailError ||
    isPrivacyPolicyLinkError ||
    isIntroductionTextError
  ) {
    return <h1 className="text-2xl font-bold text-gray-800">Error</h1>;
  }

  const handleEditMode = () => {
    setEditMode((editMode) => !editMode);
  };

  return (
    <>
      <Breadcrumbs />
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-base text-gray-600">
            Manage your settings and preferences here.
          </p>
        </div>
        {editMode ? (
          <div className="flex space-x-8">
            <button
              type="submit"
              form="SETTINGS-EDIT-FORM"
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
          <button
            onClick={handleEditMode}
            className="bg-fair_dark_blue-600 hover:bg-fair_dark_blue-500 focus:ring-fair_dark_blue-500 mt-4 rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            Edit
          </button>
        )}
      </div>
      {editMode ? (
        <EditView
          contactEmail={contactEmail}
          privacyPolicyLink={privacyPolicyLink}
          introductionText={introductionText}
          handleEditMode={handleEditMode}
        />
      ) : (
        <ReadView
          contactEmail={contactEmail}
          privacyPolicyLink={privacyPolicyLink}
          introductionText={introductionText}
        />
      )}
    </>
  );
}
