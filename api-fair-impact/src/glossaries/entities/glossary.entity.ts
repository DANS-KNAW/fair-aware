import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
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

// Note: we could make combination with the title unique; probably per language,
@Entity()
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
  @OneToMany(() => GlossaryItem, (item) => item.glossary, { cascade: true })
  items: GlossaryItem[];
}
