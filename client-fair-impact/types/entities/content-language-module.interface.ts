export interface IContentLanguageModule {
  uuid: string;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date | null;
  digitalObjectType: {
    uuid: string;
    label: string;
    code: string;
  };
  digitalObjectTypeSchema: {
    version: string;
  };
  language: {
    code: string;
    englishLabel: string;
  };
}
