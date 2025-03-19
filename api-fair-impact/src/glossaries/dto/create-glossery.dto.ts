import { GlossaryItem } from "../entities/glossary-item.entity";

export class CreateGlossaryDto {
    uuid: string;
    items: GlossaryItem[];
}