import { IsGlobalAlpha } from 'src/decorators/is-global-alpha';
import { CreateGlossaryItemDto } from './create-glossary-item.dto';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGlossaryItemDto)
  items: CreateGlossaryItemDto[];
  //items: GlossaryItem[];
}
