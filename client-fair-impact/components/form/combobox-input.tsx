"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput as ComboboxInputBase,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from "@headlessui/react";
import { useState } from "react";
import { FieldValues, FormState, Path, UseFormRegister } from "react-hook-form";

interface ItemType {
  identifier: string;
  label: string;
  [key: string]: unknown;
}

// We specifiy generic type T as type argument so the component can be used with any form values.
// The reason for this is that it makes the component more flexible and reusable.
interface Props<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  formState: FormState<T>;
  label: string;
  placeholder?: string;
  items: ItemType[];
  defaultValue?: ItemType;
}

export default function ComboboxInput<T extends FieldValues>({
  name,
  register,
  formState,
  label,
  placeholder,
  items,
  defaultValue,
}: Props<T>) {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(
    defaultValue || null,
  );

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          return item.label.toLowerCase().includes(query.toLowerCase());
        });

  const { onBlur, ...rest } = register(name);

  return (
    <Combobox
      as="div"
      value={selectedItem}
      onChange={(item) => {
        setQuery("");
        setSelectedItem(item);
        rest.onChange({ target: { name, value: item } });
      }}
    >
      <Label className="block text-sm/6 font-medium text-gray-900">
        {label}
      </Label>
      <div className="relative mt-2">
        <ComboboxInputBase
          className="block w-full rounded-md bg-white py-1.5 pl-3 pr-12 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-fair_dark_blue-600 sm:text-sm/6"
          displayValue={(item: ItemType) => item?.label}
          {...rest}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          onBlur={(event) => {
            setQuery("");
            onBlur(event);
          }}
          aria-invalid={formState.errors[name] ? "true" : "false"}
          placeholder={placeholder}
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 text-gray-400"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </ComboboxButton>

        {filteredItems.length === 0 && (
          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            <div className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-fair_dark_blue-600 data-[focus]:text-white data-[focus]:outline-none">
              <span className="block truncate group-data-[selected]:font-semibold">
                No results found
              </span>
            </div>
          </ComboboxOptions>
        )}

        {filteredItems.length > 0 && (
          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredItems.map((item) => (
              <ComboboxOption
                key={item.identifier}
                value={item}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-fair_dark_blue-600 data-[focus]:text-white data-[focus]:outline-none"
              >
                <span className="block truncate group-data-[selected]:font-semibold">
                  {item.label}
                </span>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </div>
    </Combobox>
  );
}
