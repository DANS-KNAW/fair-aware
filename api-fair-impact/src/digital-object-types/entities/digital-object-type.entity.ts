import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Digital Object Type (DOT) represents things like datasets, software, etc.
 */
@Entity()
export class DigitalObjectType {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  /**
   * The full name of the Digital Object Type.
   */
  @Column()
  label: string;

  /**
   * A 4 digit short code that can be used to identify the Digital Object Type.
   */
  @Column()
  code: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
