import { DigitalObjectTypeCriteria } from "@/types/assessment-template-fair-aware.interface";

export default function Question({
  criteria,
}: {
  criteria: DigitalObjectTypeCriteria;
}) {
  return (
    <div className="my-8 border-b border-gray-900/10 pb-8">
      <div className="flex gap-4">
        <p className="text-gray-600">Suppport</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
      </div>
      <p className="mt-4 font-medium text-gray-800">{criteria.question}</p>
    </div>
  );
}
