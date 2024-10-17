interface BasicInputProps {
  label: string;
  placeholder?: string;
  required?: boolean;
}

export default function BasicInput({
  label,
  placeholder,
  required,
}: BasicInputProps) {
  const internalName = label.trim().toLowerCase();
  return (
    <div>
      <label
        htmlFor={internalName}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={internalName}
          name={internalName}
          type="text"
          placeholder={placeholder}
          required={required}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
