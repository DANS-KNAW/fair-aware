import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ContentLanguageModule } from 'src/content-language-modules/entities/content-language-module.entity';
import { IsGlobalAlpha } from 'src/decorators/is-global-alpha';
import {
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  Column,
  OneToMany,
} from 'typeorm';

export enum LanguageStatus {
  ENABLED = 'enabled',
  PENDING = 'pending',
  DISABLED = 'disabled',
}

@Entity()
export class Language {
  /**
   * The language code following ISO 639-1 standard (e.g. nl).
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  @PrimaryColumn()
  code: string;

  /**
   * The full english name of the language. (e.g. Dutch)
   */
  @IsNotEmpty()
  @IsString()
  @IsGlobalAlpha()
  @MaxLength(255)
  @Column()
  englishLabel: string;

  /**
   * The full name of the language in the language itself. (e.g. Nederlands)
   */
  @IsNotEmpty()
  @IsString()
  @IsGlobalAlpha()
  @MaxLength(255)
  @Column()
  nativeLabel: string;

  @IsNotEmpty()
  @IsEnum(LanguageStatus)
  @Column({
    type: 'enum',
    enum: LanguageStatus,
    default: LanguageStatus.DISABLED,
  })
  status: LanguageStatus;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;

  @OneToMany(() => ContentLanguageModule, (clm) => clm.language, {
    cascade: ['soft-remove'],
    orphanedRowAction: 'soft-delete',
  })
  contentLanguageModules: ContentLanguageModule[];
}
