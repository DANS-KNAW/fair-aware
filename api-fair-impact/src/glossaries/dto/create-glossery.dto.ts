import { PickType } from '@nestjs/mapped-types';
import { Glossary } from '../entities/glossary.entity';

export class CreateGlossaryDto extends PickType(Glossary, [
  'title',
  'items',
  'language',
  'digitalObjectType',
] as const) {}
