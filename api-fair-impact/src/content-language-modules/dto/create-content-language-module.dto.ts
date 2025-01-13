import { PickType } from '@nestjs/mapped-types';
import { ContentLanguageModule } from '../entities/content-language-module.entity';

export class CreateContentLanguageModuleDto extends PickType(
  ContentLanguageModule,
  ['language', 'digitalObjectType', 'digitalObjectTypeSchema'] as const,
) {}
