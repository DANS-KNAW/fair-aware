import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { IsGlobalAlpha } from 'src/decorators/is-global-alpha';
import {
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity()
export class Language {
  /**
   * The language code following ISO 639-1 standard.
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  @PrimaryColumn()
  code: string;

  /**
   * The full english name of the language.
   */
  @IsNotEmpty()
  @IsString()
  @IsGlobalAlpha()
  @MaxLength(255)
  @Column()
  englishLabel: string;

  /**
   * The full name of the language in the language itself.
   */
  @IsNotEmpty()
  @IsString()
  @IsGlobalAlpha()
  @MaxLength(255)
  @Column()
  nativeLabel: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
