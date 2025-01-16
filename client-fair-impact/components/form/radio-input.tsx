import { BaseFormHookProps } from "@/types/base-form-hook-props.interface";
import { FieldValues } from "react-hook-form";

interface RadioInputProps<T extends FieldValues> extends BaseFormHookProps<T> {
  /**
   * The name of the specific radio input.
   */
  radioName: string;
}

export default function RadioInput<T extends FieldValues>({
  name,
  radioName,
  register,
  label,
  disabled,
  required,
}: RadioInputProps<T>) {
  const radioId = (name + "-" + radioName)
    .toLocaleLowerCase()
    .replace(/ /g, "-");

  return (
    <div className="flex items-center">
      <input
        type="radio"
        {...register(name)}
        id={radioId}
        value={radioName}
        disabled={disabled}
        required={required}
        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-fair_dark_blue-600 checked:bg-fair_dark_blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fair_dark_blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
      />
      <label
        htmlFor={radioId}
        className="ml-3 block text-sm/6 font-medium text-gray-900"
      >
        {label}
      </label>
    </div>
  );
}
