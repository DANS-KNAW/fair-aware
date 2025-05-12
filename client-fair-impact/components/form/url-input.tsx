import { BaseFormHookProps } from "@/types/form/base-form-hook-props.interface";
import { FieldValues } from "react-hook-form";

export default function UrlInput<T extends FieldValues>({
  name,
  register,
  placeholder,
  disabled,
  required,
}: BaseFormHookProps<T>) {
  return (
    <input
      {...register(name)}
      id={name}
      type="url"
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className="focus:outline-fair_dark_blue-600 block w-full rounded-md border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
    />
  );
}
