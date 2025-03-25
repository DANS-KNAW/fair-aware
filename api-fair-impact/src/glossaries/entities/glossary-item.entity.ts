import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Glossary } from './glossary.entity';

// note that the term with the glossary should be unique, but this is not enforced in the code
@Entity()
export class GlossaryItem {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @Column()
  term: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  definition: string;

  @ManyToOne(() => Glossary, (glossary) => glossary.items)
  glossary: Glossary;
}
