interface RadioGroupProps {
  legendLabel: string;
  ariaOnly?: boolean;
  legendDescription?: string;
  children: React.ReactNode | React.ReactNode[];
}

export default function RadioGroup({
  legendLabel,
  ariaOnly,
  legendDescription,
  children,
}: RadioGroupProps) {
  return (
    <fieldset>
      <legend
        className={`text-sm/6 font-semibold text-gray-900 ${ariaOnly ? "sr-only" : ""}`}
      >
        {legendLabel}
      </legend>
      {legendDescription && (
        <p className="mt-1 text-sm/6 text-gray-600">{legendDescription}</p>
      )}
      <div className="mt-4 space-y-6 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
        {children}
      </div>
    </fieldset>
  );
}
