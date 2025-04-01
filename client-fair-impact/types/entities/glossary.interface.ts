export interface IGlossary {
    uuid: string;

    updatedAt: string;
    createdAt: string;
    deletedAt: string;

    title: string;
    items: IGlossaryItem[];

    digitalObjectType: {
      uuid: string;
      label: string;
      code: string;
    };
    language: {
      code: string;
      englishLabel: string;
    };
  }

  export interface IGlossaryItem {
    uuid: string;
    id: string;
    term: string;
    definition: string;
    sourceUrl: string | null;
    acronym: string | null;
  }

  export type IGlossaries = Omit<IGlossary, "items">;