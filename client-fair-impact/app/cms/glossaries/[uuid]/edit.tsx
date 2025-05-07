import BasicTextInput from "@/components/form/basic-text-input";
import { ToastContext } from "@/context/toast-context";
import PatchGlossaryFetch from "@/lib/mutations/patch-glossary-fetch";
import { getQueryClient } from "@/lib/query-provider";
import { IGlossary } from "@/types/entities/glossary.interface";
import { IFormCreateGlossary } from "@/types/form/form-create-glossary.interface";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";

interface GlossaryReadViewProps {
  glossary: IGlossary;
  handleEditMode: () => void;
}
export default function GlossaryEditView({
  glossary,
  handleEditMode,
}: GlossaryReadViewProps) {
  const queryClient = getQueryClient();
  const { register, handleSubmit, setValue, watch } =
    useForm<IFormCreateGlossary>({
      defaultValues: {
        title: glossary.title,
        items: glossary.items,
      },
    });
  const toasts = useContext(ToastContext);

  const mutation = useMutation({
    mutationFn: (newGlossary: IGlossary) => PatchGlossaryFetch(newGlossary),
    onSuccess: () => {
      toasts.setToasts({
        type: "success",
        message: "Successfully updated!",
        subtext: "Glossary has been updated successfully.",
      });
      queryClient.invalidateQueries({
        queryKey: ["glossary", glossary.uuid],
      });
      handleEditMode();
    },
    onError: (error) => {
      toasts.setToasts({
        type: "error",
        message: "Failed to update Glossary.",
        subtext: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    },
  });

  const watchItems = watch("items");

  const handleAddItem = () => {
    setValue("items", [
      ...watchItems,
      {
        id: "",
        acronym: "",
        term: "",
        definition: "",
        sourceUrl: "",
        uuid: "", // null also doesn't work
        // generate uuid for uuid
        //uuid: crypto.randomUUID() as string, // uuid v4
        // undefined won't compile, "" also gives Bad Request...
      },
    ]);
  };

  return (
    <>
      <form
        id="GLOSSARY-EDIT-FORM"
        onSubmit={handleSubmit(async (data: IFormCreateGlossary) => {
          const updatedGlossary: IGlossary = {
            ...glossary,
            title: data.title,
            items: data.items,
          };
          mutation.mutate(updatedGlossary);
        })}
      >
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label className="block text-sm/6 font-medium text-gray-900">
              UUID
            </label>
            <div className="mt-2">
              <p className="block w-full py-1.5 text-base font-bold text-gray-600 sm:text-sm/6">
                {glossary.uuid}
              </p>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label className="block text-sm/6 font-medium text-gray-900">
              Title
            </label>
            <div className="mt-2">
              {/* <p className="block w-full py-1.5 text-base font-bold text-gray-600 sm:text-sm/6">
                {glossary.title}
              </p> */}
              <BasicTextInput register={register} name="title" required />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label className="block text-sm/6 font-medium text-gray-900">
              DOT Code
            </label>
            <div className="mt-2">
              <p className="block w-full py-1.5 text-base font-bold text-gray-600 sm:text-sm/6">
                {glossary.digitalObjectType.code}
              </p>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label className="block text-sm/6 font-medium text-gray-900">
              Language
            </label>
            <div className="mt-2">
              <p className="block w-full py-1.5 text-base font-bold text-gray-600 sm:text-sm/6">
                {glossary.language.englishLabel}
              </p>
            </div>
          </div>
        </div>

        <h2 className="mt-8 border-t border-gray-500 pt-8 text-base/7 font-semibold text-gray-900">
          Glossary items
        </h2>
        {watchItems.length < 1 && (
          <div
            className={`mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6`}
          >
            <div className="sm:col-span-full">
              <h3 className="block text-center text-base/6 font-medium text-gray-900">
                There are no items (for terms) defined in this glossary.
              </h3>
            </div>
          </div>
        )}
        {watchItems
          //.slice()
          //.sort((a, b) => a.id.localeCompare(b.id))
          .map((item, index) => (
            <div
              key={item.uuid}
              className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 border-t border-gray-300 py-6 sm:grid-cols-6"
            >
              <div className="sm:col-span-6">
                <label className="block text-sm/6 font-medium text-gray-900">
                  ID
                </label>
                <div className="mt-2">
                  <BasicTextInput
                    register={register}
                    name={`items.${index}.id`}
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Acronym
                </label>
                <div className="mt-2">
                  <BasicTextInput
                    register={register}
                    name={`items.${index}.acronym`}
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Term
                </label>
                <div className="mt-2">
                  <BasicTextInput
                    register={register}
                    name={`items.${index}.term`}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Definition
                </label>
                <div className="mt-2">
                  <BasicTextInput
                    register={register}
                    name={`items.${index}.definition`}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Source URL
                </label>
                <div className="mt-2">
                  <BasicTextInput
                    register={register}
                    name={`items.${index}.sourceUrl`}
                  />
                </div>
              </div>
            </div>
          ))}
        <div className="mt-8 flex justify-center border-t border-gray-400 pt-8 sm:col-span-full">
          <button
            type="button"
            onClick={handleAddItem}
            className="bg-fair_dark_blue-600 hover:bg-fair_dark_blue-500 focus-visible:outline-fair_dark_blue-600 w-48 cursor-pointer rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Add Item
          </button>
        </div>
      </form>
    </>
  );
}
