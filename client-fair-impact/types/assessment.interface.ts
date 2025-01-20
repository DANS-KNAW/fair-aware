import { ContentLanguageModuleFairAwareTemplateWithAnswers } from "./assessment-template-fair-aware.interface";

export interface Assessment {
  uuid: string;
  answerSchema: ContentLanguageModuleFairAwareTemplateWithAnswers;
  languageCode: string;
  dotSchemaVersion: string;
  dotCode: string;
  updatedAt: string;
  createdAt: string;
  deletedAt: string;
}
