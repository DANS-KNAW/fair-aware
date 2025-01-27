"use client";

import { useForm } from "react-hook-form";
import BasicTextInput from "../basic-text-input";
import { useMutation } from "@tanstack/react-query";
import { IFormCreateDOT } from "@/types/form/form-create-dot.interface";
import CreateDOTFetch from "@/lib/mutations/create-dot-fetch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ToastContext } from "@/context/toast-context";

export default function CreateDOTForm() {
  const router = useRouter();
  const toasts = useContext(ToastContext);
  const { register, handleSubmit } = useForm<IFormCreateDOT>();

  const mutation = useMutation({
    mutationFn: (data: IFormCreateDOT) => CreateDOTFetch(data),
    onSuccess: (response) => {
      toasts.setToasts({
        type: "success",
        message: "Successfully created!",
        subtext: "DOT has been created successfully.",
      });
      router.push("/cms/digital-object-types/" + response.uuid);
    },
    onError: () => {
      toasts.setToasts({
        type: "error",
        message: "Failed to create DOT.",
      });
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data: IFormCreateDOT) => mutation.mutate(data))}
    >
      <div className="mt-12 border-t border-gray-900/10">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Label <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <BasicTextInput register={register} name="label" required />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Code <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <BasicTextInput register={register} name="code" required />
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

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          href="/cms/digital-object-types"
          className="cursor-pointer text-sm/6 font-semibold text-gray-900"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={mutation.isPending || mutation.isSuccess === true}
          className={`bg-fair_dark_blue-600 hover:bg-fair_dark_blue-500 focus-visible:outline-fair_dark_blue-600 disabled:hover:bg-fair_dark_blue-600 cursor-pointer rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {mutation.isPending ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
}
