import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { GlossaryItem } from './glossary-item.entity';
import { Type } from 'class-transformer';
import { DigitalObjectType } from 'src/digital-object-types/entities/digital-object-type.entity';
import { Language } from 'src/languages/entities/language.entity';

// Note: we could make combination with the title unique; probably per language,
@Entity()
@Unique(['language', 'digitalObjectType'])
export class Glossary {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255) // Note: arbitrary limit, but we should limit strings to reasonable values
  @Column()
  title: string;

  // Note: probably have a glossary per language, but that might be handled via the CLM later on

  @Type(() => GlossaryItem)
  @ValidateNested({ each: true })
  @OneToMany(() => GlossaryItem, (item) => item.glossary, {
    cascade: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  items: GlossaryItem[];

  //@IsNotEmpty()
  @ManyToOne(() => DigitalObjectType, (dot) => dot.glossaries, {
    onDelete: 'CASCADE',
  })
  digitalObjectType: DigitalObjectType;

  @ManyToOne(() => Language, (language) => language.glossaries, {
    onDelete: 'CASCADE',
  })
  language: Language;
}
