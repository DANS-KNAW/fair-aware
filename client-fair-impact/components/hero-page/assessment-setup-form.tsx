"use client";

import TextInput from "@/components/form/text-input";
import { useForm } from "react-hook-form";

interface IFormInput {
  groupIdentification: string;
  language: { identifier: string; label: string };
  digitalObjectType: { identifier: string; label: string };
}

export default function AssessmentSetupForm() {
  const { register, formState } = useForm<IFormInput>();

  return (
    <form className="w-full max-w-lg space-y-8 rounded-md bg-white px-4 py-6 sm:px-10 sm:py-12">
      <h2 className="text-center text-xl font-medium text-gray-900 sm:text-2xl">
        FAIR-Aware module and language
      </h2>
      <TextInput
        register={register}
        formState={formState}
        label="Group Identification"
        name="groupIdentification"
        placeholder="XXX-XXX-XXX"
      />
      <TextInput
        register={register}
        formState={formState}
        label="Language"
        name="language"
      />
      <TextInput
        register={register}
        formState={formState}
        label="Digital Object Type"
        name="digitalObjectType"
      />
      <button
        type="submit"
        className="w-full rounded-md bg-fair_dark_blue-600 py-2.5 font-bold text-gray-100"
      >
        Start Assessment
      </button>
    </form>
  );
}
