import { PickType } from '@nestjs/mapped-types';
import { Assessment } from '../entities/assessment.entity';

export class CreateAssessmentDto extends PickType(Assessment, [
  'answerSchema',
  'dotCode',
  'dotSchemaVersion',
  'languageCode',
]) {}
