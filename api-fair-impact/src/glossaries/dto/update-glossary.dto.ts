import { PartialType, PickType } from "@nestjs/mapped-types";
import { Glossary } from "../entities/glossary.entity";


export class UpdateGlossaryDto extends PartialType(
  PickType(Glossary, ['title', 'items'] as const),
) {}