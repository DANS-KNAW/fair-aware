import { PartialType, PickType, OmitType } from '@nestjs/mapped-types';
import { Glossary } from '../entities/glossary.entity';
import { GlossaryItem } from '../entities/glossary-item.entity';
import { CreateGlossaryItemDto } from './create-glossary-item.dto';
import { Type } from 'class-transformer';
import { IsOptional, IsArray, ValidateNested } from 'class-validator';

export class UpdateGlossaryDto extends PartialType(
  PickType(Glossary, ['title'] as const),
) {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGlossaryItemDto)
  items?: (GlossaryItem | CreateGlossaryItemDto)[];
}
