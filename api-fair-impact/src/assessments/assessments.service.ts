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

  constructor(
    @InjectRepository(Assessment)
    private readonly assessmentRepository: Repository<Assessment>,
    private readonly languagesService: LanguagesService,
    private readonly digitalObjectTypesService: DigitalObjectTypesService,
    private readonly digitalObjectTypeSchemasService: DigitalObjectTypeSchemasService,
  ) {}

  async create(createAssessmentDto: CreateAssessmentDto): Promise<Assessment> {
    /**
     * @TODO There should be logic here that validates the given schema compare to the specified DOT schema.
     */
    try {
      // find language with lanuge code
      const language = await this.languagesService.findOne(
        createAssessmentDto.languageCode,
      );

      if (!language) {
        throw new BadRequestException('Invalid language code!');
      }

      const digitalObjectType = await this.digitalObjectTypesService.findOne(
        createAssessmentDto.dotCode,
      );

      if (!digitalObjectType) {
        throw new BadRequestException('Invalid DOT code!');
      }

      let assessment = this.assessmentRepository.create({
        ...createAssessmentDto,
      });

      assessment = await this.assessmentRepository.save(assessment);

      return assessment;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException('Failed to create assessment!');
    }
  }

  async findAll(page: number = 1, amount: number = 50): Promise<Assessment[]> {
    try {
      const skip = (page - 1) * amount;
      const assessments = await this.assessmentRepository.find({
        skip,
        take: amount,
      });
      return assessments;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to find assessments!');
    }
  }

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

  async archive(uuid: string): Promise<Assessment> {
    try {
      let assessment = await this.findOne(uuid);

      assessment = await this.assessmentRepository.softRemove(assessment);

      return assessment;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException('Failed to archive assessment!');
    }
  }

  async unarchive(uuid: string): Promise<Assessment> {
    try {
      let assessment = await this.findOne(uuid);

      assessment = await this.assessmentRepository.recover(assessment);

      return assessment;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException('Failed to unarchive assessment!');
    }
  }
}
