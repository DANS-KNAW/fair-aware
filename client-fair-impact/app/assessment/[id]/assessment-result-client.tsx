"use client";

import CopyTooltip from "@/components/copy-tooltip";
import useAssessment from "@/hooks/use-assessment";
import { DotSupportSection } from "@/types/assessment-template-fair-aware.interface";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Fragment } from "react";

interface AssessmentResultClientProps {
  uuid: string;
}

export default function AssessmentResultClient({
  uuid,
}: Readonly<AssessmentResultClientProps>) {
  const { data, isLoading, isError } = useAssessment(uuid);

  const NOTANSWERED = (
    <p>
      You have <span className="font-bold">not</span> answered this question.
    </p>
  );

  if (isLoading) {
    return <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>;
  }

  if (isError || !data) {
    return <h1 className="text-2xl font-bold text-gray-800">Error</h1>;
  }

  return (
    <div>
      <div className="border-b border-gray-100 px-4 pb-4 sm:px-0">
        <h3 className="text-xl/7 font-semibold text-gray-900">
          Assessment Result for{" "}
          <span className="font-black text-fair_dark_blue-400">
            {data.answerSchema.dot}
          </span>{" "}
          in{" "}
          <span className="font-black text-fair_dark_blue-400">
            {data.answerSchema.lang}
          </span>
        </h3>

        <CopyTooltip data={data.uuid}>
          <div className="relative mt-2 inline-flex max-w-2xl cursor-pointer space-x-1 text-base/6 text-gray-800 hover:text-gray-600 hover:underline">
            <span>#{data.uuid}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M15.621 4.379a3 3 0 0 0-4.242 0l-7 7a3 3 0 0 0 4.241 4.243h.001l.497-.5a.75.75 0 0 1 1.064 1.057l-.498.501-.002.002a4.5 4.5 0 0 1-6.364-6.364l7-7a4.5 4.5 0 0 1 6.368 6.36l-3.455 3.553A2.625 2.625 0 1 1 9.52 9.52l3.45-3.451a.75.75 0 1 1 1.061 1.06l-3.45 3.451a1.125 1.125 0 0 0 1.587 1.595l3.454-3.553a3 3 0 0 0 0-4.242Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </CopyTooltip>
      </div>

      <div className="pt-52 sm:pt-36 lg:pt-28 xl:pt-36">
        {data.answerSchema.assessment.map((principle, i) => (
          <Fragment key={principle.principle + i}>
            <section
              className={`grid grid-cols-1 items-baseline gap-x-6 gap-y-10 pb-16 sm:pb-20 lg:grid-cols-3 lg:pb-28 ${i > 0 ? "pt-10" : ""}`}
            >
              <h2 className="text-2xl/9 font-semibold tracking-tight text-slate-900">
                {principle.principle}
              </h2>
              <div className="prose prose-sm prose-slate max-w-2xl space-y-5 divide-y prose-a:font-semibold prose-a:text-fair_light_blue-600 prose-a:no-underline hover:prose-a:text-fair_light_blue-700 lg:col-span-2 [&>:not(first-child)]:pt-10">
                {principle.criteria.map((criterion, i) => (
                  <Fragment key={criterion.question + i}>
                    <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
                      <strong>{criterion.question}</strong>
                      {criterion.answer ? (
                        <p>
                          You answered "
                          <strong className="text-base font-black capitalize text-fair_dark_blue-600">
                            {criterion.answer}
                          </strong>
                          " to this question.
                          {/* " to this question and gave a{" "}
                          <strong className="text-base font-black text-fair_dark_blue-600">
                            5
                          </strong>{" "}
                          for how likely you are to comply with this criterion. */}
                        </p>
                      ) : (
                        <>{NOTANSWERED}</>
                      )}

                      <Disclosure as="div">
                        <DisclosureButton className="flex w-full items-center justify-between">
                          <p className="font-medium">Supportive Information</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="size-5 group-[&:not([data-open])]:rotate-0 group-data-[open]:rotate-180"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </DisclosureButton>
                        <DisclosurePanel
                          as="div"
                          transition
                          className="origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
                        >
                          {Object.entries(criterion.support).map(
                            ([key, value]) => (
                              <div key={key}>
                                <p className="text-base font-medium italic">
                                  {value.title}
                                </p>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: value.text,
                                  }}
                                />
                              </div>
                            ),
                          )}
                        </DisclosurePanel>
                      </Disclosure>
                    </div>
                  </Fragment>
                ))}
              </div>
            </section>
            <hr className="h-px bg-slate-200" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
