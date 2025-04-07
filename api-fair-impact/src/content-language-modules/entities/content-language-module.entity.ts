import { IsNotEmpty, IsObject, IsString, IsUUID } from 'class-validator';
import { DigitalObjectTypeSchema } from 'src/digital-object-type-schemas/entities/digital-object-type-schema.entity';
import { DigitalObjectType } from 'src/digital-object-types/entities/digital-object-type.entity';
import { Language } from 'src/languages/entities/language.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['digitalObjectTypeSchema', 'language', 'digitalObjectType'])
export class ContentLanguageModule {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @IsNotEmpty()
  @IsObject()
  @Column({ type: 'jsonb' })
  schema: object;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;

  @IsNotEmpty()
  @ManyToOne(() => DigitalObjectType, (dot) => dot.contentLanguageModules, {
    onDelete: 'CASCADE',
  })
  digitalObjectType: DigitalObjectType;

  @IsNotEmpty()
  @IsString()
  @ManyToOne(
    () => DigitalObjectTypeSchema,
    (dotSchema) => dotSchema.contentLanguageModules,
    {
      onDelete: 'CASCADE',
    },
  )
  digitalObjectTypeSchema: DigitalObjectTypeSchema;

  @ManyToOne(() => Language, (language) => language.contentLanguageModules, {
    onDelete: 'CASCADE',
  })
  language: Language;
}
