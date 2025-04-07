import {
    Column,
    Entity,
    PrimaryColumn,
    Unique,
  } from 'typeorm';
  
  import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';

@Entity()
@Unique(['id'])
export class Setting {
    @IsNotEmpty()
    @IsString()
    @PrimaryColumn()
    id: string;

    @IsString()
    @Column()
    value: string;
}
