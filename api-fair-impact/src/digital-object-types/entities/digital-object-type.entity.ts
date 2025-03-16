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
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { IsGlobalAlpha } from '../../decorators/is-global-alpha';
import { ContentLanguageModule } from '../../content-language-modules/entities/content-language-module.entity';
import { DigitalObjectTypeSchema } from '../../digital-object-type-schemas/entities/digital-object-type-schema.entity';

export enum SchemaType {
  FAIR = 'FAIR',
}

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
  @Column({ unique: true })
  code: string;

  /**
   * The schema type of the Digital Object Type.
   */
  @IsNotEmpty()
  @IsEnum(SchemaType)
  @Column({
    type: 'enum',
    enum: SchemaType,
  })
  schemaType: SchemaType;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date;

  @OneToMany(() => ContentLanguageModule, (clm) => clm.digitalObjectType, {
    cascade: ['soft-remove'],
    orphanedRowAction: 'soft-delete',
  })
  contentLanguageModules: ContentLanguageModule[];

  @OneToMany(
    () => DigitalObjectTypeSchema,
    (dotSchema) => dotSchema.digitalObjectType,
    {
      cascade: ['soft-remove'],
      orphanedRowAction: 'soft-delete',
    },
  )
  digitalObjectTypeSchemas: DigitalObjectTypeSchema[];
}
