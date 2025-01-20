import { ContentLanguageModuleFairAwareTemplateWithAnswers } from "./assessment-template-fair-aware.interface";

export interface AssessmentCreation {
  answerSchema: ContentLanguageModuleFairAwareTemplateWithAnswers;
  languageCode: string;
  dotSchemaVersion: string;
  dotCode: string;
}
