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
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

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

  /**
   * Retrieves all assessments.
   * @param page - The page number to fetch.
   * @returns A list of assessments.
   */
  async findAll(page: number = 1): Promise<Assessment[]> {
    try {
      const skip = (Math.max(page, 1) - 1) * 10;
      const asessments = await this.assessmentRepository.find({
        skip,
        take: 10,
        select: {
          uuid: true,
          dotCode: true,
          dotSchemaVersion: true,
          languageCode: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      });

      return asessments;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to fetch assessments!');
    }
  }

  /**
   * Retrieves a single assessment by its UUID.
   * @param uuid - The UUID of the assessment.
   * @returns The assessment.
   */
  async findOne(uuid: string): Promise<Assessment> {
    try {
      const assessment = await this.assessmentRepository.findOne({
        where: { uuid },
      });

      if (!assessment) {
        throw new NotFoundException('Assessment not found!');
      }

      return assessment;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException('Failed to find assessment!');
    }
  }

  /**
   * Updates an assessment.
   * @param uuid - The UUID of the assessment.
   * @param updateAssessmentDto - The data to update the assessment.
   * @returns The updated assessment.
   */
  async update(
    uuid: string,
    updateAssessmentDto: UpdateAssessmentDto,
  ): Promise<Assessment> {
    try {
      const assessment = await this.assessmentRepository.preload({
        uuid,
        ...updateAssessmentDto,
      });

      if (!assessment) {
        throw new NotFoundException('Assessment not found!');
      }

      return this.assessmentRepository.save(assessment);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException('Failed to update assessment!');
    }
  }

  async archive() {}

  async unarchive() {}
}
