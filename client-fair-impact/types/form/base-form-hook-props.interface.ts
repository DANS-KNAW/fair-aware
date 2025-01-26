import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface BaseFormHookProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}
