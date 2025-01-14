"use client";

import TextInput from "@/components/form/text-input";
import useActiveLanguages from "@/hooks/use-active-languages";
import { Language } from "@/types/language.interface";
import { useForm } from "react-hook-form";
import ComboboxInput from "../form/combobox-input";
import useDigitalObjectTypes from "@/hooks/use-digital-object-types";

interface IFormInput {
  groupIdentification: string;
  language: Language;
  digitalObjectType: { identifier: string; label: string };
}

export default function AssessmentSetupForm() {
  const { register, formState } = useForm<IFormInput>();

  const {
    data: languagesData = [],
    isLoading: isLanguagesLoading,
    isError: isLanguagesError,
  } = useActiveLanguages();
  const {
    data: dotData = [],
    isLoading: isTypesLoading,
    isError: isTypesError,
  } = useDigitalObjectTypes();

  const isLoading = isLanguagesLoading || isTypesLoading;
  const isError = isLanguagesError || isTypesError;

  const mappedLanguages = languagesData.map((language) => ({
    identifier: language.code,
    label: language.englishLabel,
  }));

  const mappedDots = dotData.map((type) => ({
    identifier: type.uuid,
    label: type.label,
  }));

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
        disabled={isLoading || isError}
      />
      <ComboboxInput
        register={register}
        formState={formState}
        label="Language"
        name="language"
        placeholder="Select a language"
        disabled={isLoading || isError}
        items={mappedLanguages}
        required
      />
      <ComboboxInput
        register={register}
        formState={formState}
        label="Digital Object Type"
        name="digitalObjectType"
        placeholder="Select a (DOT)"
        disabled={isLoading || isError}
        items={mappedDots}
        required
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
