import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IsGlobalAlpha } from 'src/decorators/is-global-alpha';
import { DigitalObjectType } from 'src/digital-object-types/entities/digital-object-type.entity';
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
@Unique(['version', 'language', 'digitalObjectType'])
export class ContentLanguageModule {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  version: string;

  @IsNotEmpty()
  @IsString()
  @IsGlobalAlpha()
  @Column()
  language: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;

  @ManyToOne(() => DigitalObjectType, (dot) => dot.contentLanguageModules, {
    onDelete: 'CASCADE',
  })
  digitalObjectType: DigitalObjectType;
}
