import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateContentLanguageModuleDto } from './create-content-language-module.dto';

export class UpdateContentLanguageModuleDto extends PartialType(
  PickType(CreateContentLanguageModuleDto, ['schema'] as const),
) {}
