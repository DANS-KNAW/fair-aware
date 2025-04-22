import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

import { IsAlphanumeric, IsNotEmpty, IsString } from 'class-validator';

@Entity()
@Unique(['id'])
export class Setting {
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  @PrimaryColumn()
  id: string;

  @IsString()
  @Column()
  value: string;
}
