import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ContentLanguageModule } from 'src/content-language-modules/entities/content-language-module.entity';
import { DigitalObjectType } from 'src/digital-object-types/entities/digital-object-type.entity';
import {
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
      onDelete: 'CASCADE',
    },
  )
  contentLanguageModules: ContentLanguageModule[];

  @ManyToOne(() => DigitalObjectType, (dot) => dot.digitalObjectTypeSchemas, {
    onDelete: 'CASCADE',
  })
  digitalObjectType: DigitalObjectType;
}
