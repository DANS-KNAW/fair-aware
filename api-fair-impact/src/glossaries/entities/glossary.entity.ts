import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';

import { IsNotEmpty, IsString, IsUUID, MaxLength, ValidateNested } from 'class-validator';
import { GlossaryItem } from './glossary-item.entity';
import { Type } from 'class-transformer';

@Entity()
export class Glossary {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  // Note: probably have a glossary per language, but that might be handled via the CLM later on


  @OneToMany(() => GlossaryItem, (item) => item.glossary)
  @ValidateNested({ each: true })
  @Type(() => GlossaryItem)
  items: GlossaryItem[];
}
