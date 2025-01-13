import { PartialType, PickType } from '@nestjs/mapped-types';
import { DigitalObjectTypeSchema } from '../entities/digital-object-type-schema.entity';

export class UpdateDigitalObjectTypeSchemaDto extends PartialType(
  PickType(DigitalObjectTypeSchema, ['schema'] as const),
) {}
