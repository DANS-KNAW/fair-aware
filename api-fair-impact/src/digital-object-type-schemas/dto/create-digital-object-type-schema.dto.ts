import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateDigitalObjectTypeSchemaDto {
  /**
   * We only want an digitalObjectType's UUID to create a new digitalObjectTypeSchema.
   */
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  digitalObjectTypeUUID: string;
}
