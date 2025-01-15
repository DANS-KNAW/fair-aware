"use client";

import useContentLanguageModule from "@/hooks/use-content-language-module";
import AssessmentNavigation from "./assessment-navigation";
import { useState } from "react";
import AssessHeader from "./assess-header";
import Question from "./question";

export default function AssessmentBuilder() {
  const { data, isLoading, isError } = useContentLanguageModule("en", "DATA");
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

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

  if (!activeQuestion) {
    const firstQuestion =
      data.schema.assessment[0].criteria[0].criteria ?? null; // @TODO - improve this.
    setActiveQuestion(firstQuestion);
  }

  const handleQuestionChange = (question: string) => {
    setActiveQuestion(question);
  };

  const activeQuestionObject = data.schema.assessment
    .flatMap((item) => item.criteria)
    .find((crit) => crit.criteria === activeQuestion);

  return (
    <div className="mt-8 flex flex-row gap-8">
      <AssessmentNavigation
        navigation={navigation}
        onQuestionChange={handleQuestionChange}
      />
      <div className="flex-grow">
        {activeQuestionObject && (
          <>
            <AssessHeader question={activeQuestionObject} />
            <Question criteria={activeQuestionObject} />
          </>
        )}
      </div>
    </div>
  );
}
