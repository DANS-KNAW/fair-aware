import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
} from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Glossary } from './glossary.entity';

// note that the term with the glossary should be unique, but this is not enforced in the code
@Entity()
@Unique(['id', 'glossary'])
export class GlossaryItem {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @Column()
  term: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  definition: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @Column({ nullable: true })
  sourceUrl: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Column({ nullable: true })
  acronym: string | null;

  @ManyToOne(() => Glossary, (glossary) => glossary.items)
  glossary: Glossary;
}
