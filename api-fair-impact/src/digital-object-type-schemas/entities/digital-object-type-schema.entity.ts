import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
} from 'class-validator';
import { ContentLanguageModule } from '../../content-language-modules/entities/content-language-module.entity';
import { DigitalObjectType } from '../../digital-object-types/entities/digital-object-type.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FairAwareSchema } from './fair-aware-schema.entity';

export enum SchemaTypeEnum {
  FAIR = 'FAIR',
}

@Entity()
export class DigitalObjectTypeSchema {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @IsNotEmpty()
  @IsObject()
  @Column({ type: 'jsonb' })
  schema: FairAwareSchema;

  @IsNotEmpty()
  @IsEnum(SchemaTypeEnum)
  @Column({ type: 'enum', enum: SchemaTypeEnum, nullable: false })
  schemaType: SchemaTypeEnum;

  @IsNotEmpty()
  @IsString()
  @Column()
  version: string;

  @IsBoolean()
  @Column({ default: false })
  active: boolean;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date;

  @OneToMany(
    () => ContentLanguageModule,
    (clm) => clm.digitalObjectTypeSchema,
    {
      cascade: ['soft-remove'],
      orphanedRowAction: 'soft-delete',
    },
  )
  contentLanguageModules: ContentLanguageModule[];

  @ManyToOne(() => DigitalObjectType, (dot) => dot.digitalObjectTypeSchemas, {
    onDelete: 'CASCADE',
  })
  digitalObjectType: DigitalObjectType;
}
