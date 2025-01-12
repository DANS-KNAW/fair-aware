import { PartialType } from '@nestjs/mapped-types';
import { CreateDigitalObjectTypeDto } from './create-digital-object-type.dto';
export class UpdateDigitalObjectTypeDto extends PartialType(
  CreateDigitalObjectTypeDto,
) {}
