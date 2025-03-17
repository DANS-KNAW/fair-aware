import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Assessment } from './entities/assessment.entity';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { LanguagesService } from 'src/languages/languages.service';
import { DigitalObjectTypesService } from 'src/digital-object-types/digital-object-types.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AssessmentsService {
  private readonly logger = new Logger(AssessmentsService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(Assessment)
    private readonly assessmentRepository: Repository<Assessment>,
    private readonly languagesService: LanguagesService,
    private readonly digitalObjectTypesService: DigitalObjectTypesService,
  ) {}

  /**
   * Creates a new assessment.
   * @param createAssessmentDto - The data to create the assessment.
   * @returns The created assessment.
   */
  async create(createAssessmentDto: CreateAssessmentDto): Promise<Assessment> {
    try {
      // Check if the language and digital object type exist.
      // @todo should update entity for actual relation.
      await this.languagesService.findOne(createAssessmentDto.languageCode);
      await this.digitalObjectTypesService.findOne(createAssessmentDto.dotCode);

      let assessment = this.assessmentRepository.create(createAssessmentDto);
      assessment = await this.assessmentRepository.save(assessment);

      return assessment;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to create assessment!');
    }
  }
  async findAll() {}

  async findOne() {}

  async update() {}

  async archive() {}

  async unarchive() {}
}
