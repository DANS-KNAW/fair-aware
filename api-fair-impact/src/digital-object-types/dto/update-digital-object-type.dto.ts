import { PartialType } from '@nestjs/mapped-types';
import { DigitalObjectType } from '../entities/digital-object-type.entity';
export class UpdateDigitalObjectTypeDto extends PartialType(
  DigitalObjectType,
) {}
