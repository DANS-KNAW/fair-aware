import { IsGlobalAlpha } from 'src/decorators/is-global-alpha';
import { CreateGlossaryItemDto } from './create-glossary-item.dto';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { GlossaryItem } from '../entities/glossary-item.entity';

export class CreateGlossaryDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  
  @IsNotEmpty()
  @IsString()
  languageCode: string;

  @IsNotEmpty()
  @IsString()
  @IsGlobalAlpha()
  @MaxLength(6)
  digitalObjectTypeCode: string;

  items: CreateGlossaryItemDto[];
  //items: GlossaryItem[];
}