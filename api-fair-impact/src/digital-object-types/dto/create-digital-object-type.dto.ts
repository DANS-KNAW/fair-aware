import { PickType } from '@nestjs/mapped-types';
import { DigitalObjectType } from '../entities/digital-object-type.entity';

export class CreateDigitalObjectTypeDto extends PickType(DigitalObjectType, [
  'label',
  'code',
]) {}
