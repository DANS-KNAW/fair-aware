import {
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Assessment {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @IsNotEmpty()
  @IsObject()
  @Column({ type: 'jsonb' })
  answerSchema: object;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  @Column()
  languageCode: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  dotSchemaVersion: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(6)
  @Column()
  dotCode: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
