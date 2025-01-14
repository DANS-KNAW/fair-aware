import { FieldValues, FormState, Path, UseFormRegister } from "react-hook-form";

// We specifiy generic type T as type argument so the component can be used with any form values.
// The reason for this is that it makes the component more flexible and reusable.
export interface BaseFormHookProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  formState: FormState<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}
