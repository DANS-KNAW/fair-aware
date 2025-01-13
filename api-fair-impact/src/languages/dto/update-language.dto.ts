import { PartialType, PickType } from '@nestjs/mapped-types';
import { Language } from '../entities/language.entity';

export class UpdateLanguageDto extends PartialType(
  PickType(Language, [] as const),
) {}
