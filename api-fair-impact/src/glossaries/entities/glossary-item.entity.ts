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
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Glossary } from './glossary.entity';

// note that the term with the glossary should be unique, but this is not enforced in the code
@Entity()
// The following constraint gives problems when updating, therefore we disable it! @Unique(['id', 'glossary'])
export class GlossaryItem {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  // TODO: remove the id and use the uuid instead when referencing the glossary item in the future
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

  @ManyToOne(() => Glossary, (glossary) => glossary.items, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  glossary: Glossary;
}
