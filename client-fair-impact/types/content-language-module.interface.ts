import { ContentLanguageModuleFairAwareTemplate } from "./assessment-template-fair-aware.interface";

export interface ContentLanguageModule {
  uuid: string;
  version: number;
  schema: ContentLanguageModuleFairAwareTemplate;
}
