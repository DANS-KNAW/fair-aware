"use client";

import useSetting from "@/hooks/use-setting";
import React from "react";

export default function Introduction() {
  const { data: introductionText } = useSetting("IntroductionText");

  return (
    <div
      className="space-y-8"
      dangerouslySetInnerHTML={{ __html: introductionText?.value || "" }}
    />
  );
}
