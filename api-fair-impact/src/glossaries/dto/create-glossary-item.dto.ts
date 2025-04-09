import { PickType } from "@nestjs/mapped-types";
import { GlossaryItem } from "../entities/glossary-item.entity";

export class CreateGlossaryItemDto extends PickType(GlossaryItem, [
  'term',
  'definition',
  'sourceUrl',
  'acronym',
] as const) {}
