import { PartialType } from '@nestjs/mapped-types';
import { CreateContentLanguageModuleDto } from './create-content-language-module.dto';

export class UpdateContentLanguageModuleDto extends PartialType(
  CreateContentLanguageModuleDto,
) {}
