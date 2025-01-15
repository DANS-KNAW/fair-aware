"use client";

import useContentLanguageModule from "@/hooks/use-content-language-module";

export default function AssessmentBuilder() {
  const { data, isLoading, isError } = useContentLanguageModule("en", "DATA");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div>
      <h1>Data: {data?.version}</h1>
    </div>
  );
}
