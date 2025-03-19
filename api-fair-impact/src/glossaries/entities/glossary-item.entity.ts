import { IsNotEmpty, IsString } from "class-validator";
import { Entity, ManyToOne } from "typeorm";
import { Glossary } from "./glossary.entity";

// note that the term with the glossary should be unique, but this is not enforced in the code
@Entity()
export class GlossaryItem {
    @IsNotEmpty()
    @IsString()
    term: string;
    
    @IsNotEmpty()
    @IsString()
    definition: string;

    @ManyToOne(() => Glossary, (glossary) => glossary.items)
    glossary: Glossary;
}