import {
  Column,
  CreateDateColumn,
  Entity,
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

  @IsNotEmpty()
  @IsBoolean()
  @Column({ default: false })
  archived: boolean;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
