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
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { IsGlobalAlpha } from 'src/decorators/is-global-alpha';
import { ContentLanguageModule } from 'src/content-language-modules/entities/content-language-module.entity';

/**
 * Digital Object Type (DOT) represents things like datasets, software, etc.
 */
@Entity()
export class DigitalObjectType {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  /**
   * The full name of the Digital Object Type.
   */
  @IsNotEmpty()
  @IsString()
  @IsGlobalAlpha()
  @MaxLength(255)
  @Column()
  label: string;

  /**
   * A 4 digit short code that can be used to identify the Digital Object Type.
   */
  @IsNotEmpty()
  @IsString()
  @IsGlobalAlpha()
  @MaxLength(6)
  @Column()
  code: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;

  @OneToMany(() => ContentLanguageModule, (clm) => clm.digitalObjectType, {
    cascade: ['soft-remove'],
    orphanedRowAction: 'soft-delete',
  })
  contentLanguageModules: ContentLanguageModule[];
}
