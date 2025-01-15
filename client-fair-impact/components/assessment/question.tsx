import { DigitalObjectTypeCriteria } from "@/types/assessment-template-fair-aware.interface";
import RadioGroup from "../form/radio-group";
import RadioInput from "../form/radio-input";
import { FieldValues, FormState, Path, UseFormRegister } from "react-hook-form";

interface QuestionProps<T extends FieldValues> {
  criteria: DigitalObjectTypeCriteria;
  register: UseFormRegister<T>;
  formState: FormState<T>;
  supportToggle: () => void;
}

export default function Question<T extends FieldValues>({
  criteria,
  register,
  formState,
  supportToggle,
}: QuestionProps<T>) {
  return (
    <div className="my-8 border-b border-gray-900/10">
      <div
        className="flex cursor-pointer gap-4 group"
        onClick={supportToggle}
      >
        <p className="text-gray-600 sr-only">Suppport Drawer</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-gray-600 group-hover:text-fair_dark_blue-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
      </div>
      <p className="mt-4 font-medium text-gray-800">{criteria.question}</p>
      <div className="mb-6 mt-8">
        <RadioGroup legendLabel={"Radio buttons for question"} ariaOnly={true}>
          <RadioInput
            name={criteria.criteria as Path<T>}
            radioName="yes"
            register={register}
            formState={formState}
            label="Yes"
            required={true}
          />
          <RadioInput
            name={criteria.criteria as Path<T>}
            radioName="no"
            register={register}
            formState={formState}
            label="No"
            required={true}
          />
        </RadioGroup>
      </div>
    </div>
  );
}
