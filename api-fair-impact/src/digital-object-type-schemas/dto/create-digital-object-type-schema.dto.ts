import { PickType } from '@nestjs/mapped-types';
import { DigitalObjectTypeSchema } from '../entities/digital-object-type-schema.entity';

export class CreateDigitalObjectTypeSchemaDto extends PickType(
  DigitalObjectTypeSchema,
  ['schema'] as const,
) {}
