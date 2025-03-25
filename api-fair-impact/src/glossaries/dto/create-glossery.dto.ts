import { PickType } from "@nestjs/mapped-types";
import { GlossaryItem } from "../entities/glossary-item.entity";
import { Glossary } from "../entities/glossary.entity";

export class CreateGlossaryDto extends PickType(Glossary, ["title", "items"]) {
}