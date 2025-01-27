import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateDigitalObjectTypeSchemaDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  digitalObjectTypeUUID: string;
}
