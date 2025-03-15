import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Assessment } from './entities/assessment.entity';
import { Repository } from 'typeorm';
import { LanguagesService } from 'src/languages/languages.service';
import { DigitalObjectTypesService } from 'src/digital-object-types/digital-object-types.service';
import { DigitalObjectTypeSchemasService } from 'src/digital-object-type-schemas/digital-object-type-schemas.service';

@Injectable()
export class AssessmentsService {
  private readonly logger = new Logger(AssessmentsService.name, {
    timestamp: true,
  });

  constructor() {}

  async create() {}

  async findAll() {}

  async findOne() {}

  async update() {}

  async archive() {}

  async unarchive() {}
}
