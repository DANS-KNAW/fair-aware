import {
  Injectable,
  InternalServerErrorException,
  Logger,
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

  findOne(id: number) {
    return `This action returns a #${id} assessment`;
  }

  update(id: number, updateAssessmentDto: UpdateAssessmentDto) {
    return `This action updates a #${id} assessment`;
  }

  remove(id: number) {
    return `This action removes a #${id} assessment`;
  }
}
