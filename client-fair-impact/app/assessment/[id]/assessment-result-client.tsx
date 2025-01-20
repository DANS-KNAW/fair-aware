"use client";

import useAssessment from "@/hooks/use-assessment";

interface AssessmentResultClientProps {
  uuid: string;
}

export default function AssessmentResultClient({
  uuid,
}: Readonly<AssessmentResultClientProps>) {
  const { data, isLoading, isError } = useAssessment(uuid);

  if (isLoading) {
    return <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>;
  }

  if (isError || !data) {
    return <h1 className="text-2xl font-bold text-gray-800">Error</h1>;
  }

  return (
    <div>
      <div className="border-b border-gray-100 px-4 pb-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">
          Assessment Result for{" "}
          <span className="font-black text-fair_dark_blue-400">
            {data.answerSchema.dot}
          </span>{" "}
          in{" "}
          <span className="font-black text-fair_dark_blue-400">
            {data.answerSchema.lang}
          </span>
        </h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">#{data.uuid}</p>
      </div>
      {data.answerSchema.assessment.map((principle) => (
        <div key={principle.principle}>
          <h3 className="mt-4 pb-3 text-xl font-semibold text-gray-900">
            {principle.principle}
          </h3>
          <div className="mt-2 border-t border-gray-100">
            <dl className="divide-y divide-gray-100 border-b border-gray-100">
              {principle.criteria.map((criterion, i) => (
                <div
                  key={criterion.criteria}
                  className={`px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <dt className="text-sm/6 font-medium text-gray-900">
                    {criterion.criteria}
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {criterion.answer ?? "Not answered"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      ))}
    </div>
  );
}
