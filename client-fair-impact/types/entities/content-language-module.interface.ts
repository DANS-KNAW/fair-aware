import { ContentLanguageModuleFairAwareTemplate } from "../assessment-template-fair-aware.interface";

export interface IContentLanguageModule {
  uuid: string;

  schema: ContentLanguageModuleFairAwareTemplate;

  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date | null;
  digitalObjectType: {
    uuid: string;
    label: string;
    code: string;
  };
  digitalObjectTypeSchema: {
    uuid: string;
    version: string;
  };
  language: {
    code: string;
    englishLabel: string;
  };
}

export type IContentLanguageModules = Omit<IContentLanguageModule, "schema">;
