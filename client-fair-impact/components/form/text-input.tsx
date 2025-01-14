import { BaseFormHookProps } from "@/types/base-form-hook-props.interface";
import { FieldValues } from "react-hook-form";

/**
 * Basic text based input component.
 */
export default function TextInput<T extends FieldValues>({
  name,
  register,
  formState,
  label,
  placeholder,
  disabled,
}: BaseFormHookProps<T>) {
  const { errors } = formState;
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm/6 font-medium text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={name}
          type="text"
          {...register(name)}
          aria-invalid={errors[name] ? "true" : "false"}
          placeholder={placeholder}
          disabled={disabled}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-fair_dark_blue-600 disabled:cursor-not-allowed disabled:bg-gray-900/10 sm:text-sm/6"
        />
      </div>
    </div>
  );
}
