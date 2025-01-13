import { PickType } from '@nestjs/mapped-types';
import { DigitalObjectTypeSchema } from '../entities/digital-object-type-schema.entity';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateDigitalObjectTypeSchemaDto extends PickType(
  DigitalObjectTypeSchema,
  ['schema'] as const,
) {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  digitalObjectTypeUUID: string;
}
