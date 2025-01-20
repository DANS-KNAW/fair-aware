"use client";

import useContentLanguageModule from "@/hooks/use-content-language-module";
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

export default function AssessmentBuilder() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<IFormInput>();
  // @TODO Ensure parameters are not hardcoded
  const { data, isLoading, isError } = useContentLanguageModule("en", "DATA");
  const formMutation = useMutation({
    mutationFn: (assessment: AssessmentCreation) => submitAssesment(assessment),
    onSuccess: (response) => {
      router.push(`/assessment/${response.uuid}`);
    },
  });
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [supportDrawerOpen, setSupportDrawerOpen] = useState(false);

  useEffect(() => {
    if (data && !activeQuestion) {
      const firstQuestion =
        data.schema.assessment[0].criteria[0].criteria ?? null;
      setActiveQuestion(firstQuestion);
    }
  }, [data, activeQuestion]);

  // @TODO Add loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || formMutation.error || !data) {
    return <div>Error...</div>;
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
        <div className="flex-grow">
          {activeQuestionObject && (
            <>
              <AssessHeader question={activeQuestionObject} />
              <Question
                key={activeQuestionObject.criteria} // Ensure unique key
                criteria={activeQuestionObject}
                register={register}
                formState={formState}
                supportToggle={handleSupportDrawerOpen}
              />
            </>
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
