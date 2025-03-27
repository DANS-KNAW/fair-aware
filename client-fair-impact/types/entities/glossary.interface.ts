export interface IGlossary {
    uuid: string;

    updatedAt: string;
    createdAt: string;
    deletedAt: string;

    title: string;
    items: IGlossaryItem[];
  }

  export interface IGlossaryItem {
    uuid: string;
    
    term: string;
    definition: string;
  }

  export type IGlossaries = Omit<IGlossary, "items">;