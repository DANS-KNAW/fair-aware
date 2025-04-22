"use client";

import AssessmentNavigation from "./assessment-navigation";
import { useEffect, useState } from "react";
import AssessHeader from "./assess-header";
import Question from "./question";
import { SubmitHandler, useForm } from "react-hook-form";
import SupportDrawer from "./support-drawer";
import { ContentLanguageModuleFairAwareTemplateWithAnswers } from "@/types/assessment-template-fair-aware.interface";
import { useMutation } from "@tanstack/react-query";
import { AssessmentCreation } from "@/types/assesment-creation.interface";
import { useRouter } from "next/navigation";
import useContentLanguageModuleByLanguageAndDOT from "@/hooks/use-content-language-module-by-language-and-dot";
import Link from "next/link";

interface IFormInput {
  [key: string]: string; // Dynamic input keys based on the question names
}

const submitAssesment = async (
  assessment: AssessmentCreation,
): Promise<{ uuid: string }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/assessments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assessment),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to submit assessment");
  }

  return response.json();
};

export default function AssessmentBuilder({
  lang,
  dot,
}: {
  lang: string;
  dot: string;
}) {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<IFormInput>();
  const { data, isLoading, isError } = useContentLanguageModuleByLanguageAndDOT(
    lang,
    dot,
  );
  const formMutation = useMutation({
    mutationFn: (assessment: AssessmentCreation) => submitAssesment(assessment),
    onSuccess: (response) => {
      router.push(`/assessment/${response.uuid}`);
    },
  });
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [supportDrawerOpen, setSupportDrawerOpen] = useState(false);

  useEffect(() => {
    if (data && data.schema.assessment.length > 0 && !activeQuestion) {
      const firstQuestion =
        data.schema.assessment[0].criteria[0].criteria ?? null;
      setActiveQuestion(firstQuestion);
    }
  }, [data, activeQuestion]);

  // @TODO Add loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || formMutation.error) {
    return (
      <div className="mx-auto my-20 max-w-7xl space-y-4 px-2 py-12 text-center lg:px-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Assessment not found
        </h1>
        <p className="text-gray-600">
          Sorry, we couldn&apos;t find the assessment type you&apos;re looking
          for
        </p>
        <Link href="/" className="text-fair_dark_blue-600 underline">
          Go back home
        </Link>
      </div>
    );
  }

  if (!data || data.schema.assessment.length == 0) {
    return (
      <div className="mx-auto my-20 max-w-7xl space-y-4 px-2 py-12 text-center lg:px-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Something went wrong!
        </h1>
        <p className="text-gray-600">
          Sorry, the assessment schema you request was not valid! Please try
          again later.
        </p>
        <Link href="/" className="text-fair_dark_blue-600 underline">
          Go back home
        </Link>
      </div>
    );
  }

  const navigation = data.schema.assessment.map((item) => ({
    principle: item.principle,
    crit: item.criteria.map((crit) => crit.criteria),
  }));

  const handleQuestionChange = (question: string) => {
    setActiveQuestion(question);
  };

  const handleSupportDrawerOpen = () => {
    setSupportDrawerOpen((supportDrawerOpen) => !supportDrawerOpen);
  };

  const activeQuestionObject = data.schema.assessment
    .flatMap((item) => item.criteria)
    .find((crit) => crit.criteria === activeQuestion);

  const onSubmit: SubmitHandler<IFormInput> = (formData) => {
    const result: ContentLanguageModuleFairAwareTemplateWithAnswers = {
      ...data.schema,
      assessment: data.schema.assessment.map((principle) => ({
        ...principle,
        criteria: principle.criteria.map((criterion) => ({
          ...criterion,
          answer: formData[criterion.criteria] || undefined,
        })),
      })),
    };

    formMutation.mutate({
      answerSchema: result,
      dotCode: "DATA",
      dotSchemaVersion: "1.0",
      languageCode: "en",
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 flex flex-row gap-8"
      >
        <AssessmentNavigation
          navigation={navigation}
          onQuestionChange={handleQuestionChange}
        />
        <div className="relative grow">
          {activeQuestionObject && (
            <div className="sticky top-20">
              <AssessHeader question={activeQuestionObject} />
              <Question
                key={activeQuestionObject.criteria} // Ensure unique key
                criteria={activeQuestionObject}
                register={register}
                formState={formState}
                supportToggle={handleSupportDrawerOpen}
              />
            </div>
          )}
        </div>
      </form>
      {activeQuestionObject && (
        <SupportDrawer
          open={supportDrawerOpen}
          onClose={handleSupportDrawerOpen}
          question={activeQuestionObject}
        />
      )}
    </>
  );
}
