import { IGlossaryItem } from "../entities/glossary.interface";

export interface IFormCreateGlossary {
    title: string;
    items: IGlossaryItem[];
}