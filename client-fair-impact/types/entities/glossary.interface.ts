import { IDigitalObjectType } from "./digital-object-type.interface";

export interface IGlossary {
    uuid: string;

    updatedAt: string;
    createdAt: string;
    deletedAt: string;

    title: string;
    items: IGlossaryItem[];

    digitalObjectType: IDigitalObjectType;
    language: ILanguage;
  }

  // Need to specify the type of the language here
  export interface ILanguage {
    code: string;
    englishLabel: string;
  };

  export interface IGlossaryItem {
    //uuid: string;
    id: string;
    term: string;
    definition: string;
    sourceUrl: string | null;
    acronym: string | null;
  }

  export type IGlossaries = Omit<IGlossary, "items">;