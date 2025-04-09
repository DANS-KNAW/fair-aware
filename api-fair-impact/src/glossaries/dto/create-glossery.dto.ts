import { IsGlobalAlpha } from 'src/decorators/is-global-alpha';
import { CreateGlossaryItemDto } from './create-glossary-item.dto';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateGlossaryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  items: CreateGlossaryItemDto[];
  
  @IsNotEmpty()
  @IsString()
  languageCode: string;

  // @IsNotEmpty()
  // @IsString()
  // @IsUUID()
  // digitalObjectTypeUUID: string; 
  
  @IsNotEmpty()
  @IsString()
  @IsGlobalAlpha()
  @MaxLength(6)
  digitalObjectTypeCode: string;
}