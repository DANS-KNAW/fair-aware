"use client";

import Breadcrumbs from "@/components/beardcrumbs";
import useSetting from "@/hooks/use-setting";

export default function SettingsClient() {
  // The settings, maybe more efficient to fetch them all at once?
  const { data: contactEmail } = useSetting("ContactEmail");
  const { data: privacyPolicyLink } = useSetting("PrivacyPolicyLink");
  const { data: introductionText } = useSetting("IntroductionText");

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
      </div>
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
