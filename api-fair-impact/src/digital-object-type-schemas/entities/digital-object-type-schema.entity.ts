import {
  IsBoolean,
  IsJSON,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { ContentLanguageModule } from 'src/content-language-modules/entities/content-language-module.entity';
import { DigitalObjectType } from 'src/digital-object-types/entities/digital-object-type.entity';
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

@Entity()
export class DigitalObjectTypeSchema {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @IsNotEmpty()
  @IsString()
  @IsJSON()
  @Column({ type: 'jsonb' })
  schema: string;

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
  deletedAt: Date;

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
