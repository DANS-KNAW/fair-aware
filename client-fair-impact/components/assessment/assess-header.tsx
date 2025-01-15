import { DigitalObjectTypeCriteria } from "@/types/assessment-template-fair-aware.interface";

export default function AssessHeader({
  question,
}: {
  question: DigitalObjectTypeCriteria;
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex w-full items-center border-b border-gray-900/10 pb-4">
          <p className="text-2xl font-bold text-gray-800">
            {question.criteria}
          </p>
        </div>
      </div>
    </>
  );
}
