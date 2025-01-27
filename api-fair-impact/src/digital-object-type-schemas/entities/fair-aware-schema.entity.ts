import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class FairAwareSchema {
  @IsString()
  @MaxLength(6)
  dot: string;

  @IsString()
  version: string;

  @IsEmail()
  supportEmail?: string;

  @ValidateNested({ each: true })
  @Type(() => IFAIRPrinciple)
  assessment: IFAIRPrinciple[];
}

export class IFAIRPrinciple {
  @ValidateNested({ each: true })
  @Type(() => IFAIRCriterium)
  criteria: IFAIRCriterium[];
}

export class IFAIRCriterium {
  @IsBoolean()
  required: boolean;

  @IsBoolean()
  displayLikelihood: boolean;
}
