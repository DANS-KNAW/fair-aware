import {
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

@Injectable()
export class AssessmentsService {
  private readonly logger = new Logger(AssessmentsService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(Assessment)
    private readonly assessmentRepository: Repository<Assessment>,
  ) {}

  async create(createAssessmentDto: CreateAssessmentDto): Promise<Assessment> {
    /**
     * @TODO There should be logic here that validates the given schema compare to the specified DOT schema.
     */

    let assessment = this.assessmentRepository.create(createAssessmentDto);

    try {
      assessment = await this.assessmentRepository.save(assessment);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to create assessment!');
    }

    return assessment;
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

  remove(id: number) {
    return `This action removes a #${id} assessment`;
  }
}
