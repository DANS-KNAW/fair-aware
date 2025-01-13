import { PartialType } from '@nestjs/mapped-types';
import { CreateDigitalObjectTypeSchemaDto } from './create-digital-object-type-schema.dto';

export class UpdateDigitalObjectTypeSchemaDto extends PartialType(
  CreateDigitalObjectTypeSchemaDto,
) {}
