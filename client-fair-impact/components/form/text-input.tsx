import { FieldValues, FormState, Path, UseFormRegister } from "react-hook-form";

// We specifiy generic type T as type argument so the component can be used with any form values.
// The reason for this is that it makes the component more flexible and reusable.
interface Props<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  formState: FormState<T>;
  label: string;
  placeholder?: string;
}

/**
 * Basic text based input component.
 */
export default function TextInput<T extends FieldValues>({
  name,
  register,
  formState,
  label,
  placeholder,
}: Props<T>) {
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
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-fair_dark_blue-600 sm:text-sm/6"
        />
      </div>
    </div>
  );
}
