"use client";

import useContentLanguageModule from "@/hooks/use-content-language-module";
import AssessmentNavigation from "./assessment-navigation";
import { useEffect, useState } from "react";
import AssessHeader from "./assess-header";
import Question from "./question";
import { SubmitHandler, useForm } from "react-hook-form";
import SupportDrawer from "./support-drawer";
import { ContentLanguageModuleFairAwareTemplateWithAnswers } from "@/types/assessment-template-fair-aware.interface";

interface IFormInput {
  [key: string]: string; // Dynamic input keys based on the question names
}

export default function AssessmentBuilder() {
  const { register, handleSubmit, formState } = useForm<IFormInput>();
  const { data, isLoading, isError } = useContentLanguageModule("en", "DATA");
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [supportDrawerOpen, setSupportDrawerOpen] = useState(false);

  useEffect(() => {
    if (data && !activeQuestion) {
      const firstQuestion =
        data.schema.assessment[0].criteria[0].criteria ?? null;
      setActiveQuestion(firstQuestion);
    }
  }, [data, activeQuestion]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
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
    console.log(result);
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
