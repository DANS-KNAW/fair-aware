import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateDigitalObjectTypeDto } from './dto/create-digital-object-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DigitalObjectType } from './entities/digital-object-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DigitalObjectTypesService {
  private readonly logger = new Logger(DigitalObjectTypesService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(DigitalObjectType)
    private readonly digitalObjectTypeRepository: Repository<DigitalObjectType>,
  ) {}

  async create(createDigtialObjectTypeDto: CreateDigitalObjectTypeDto) {
    try {
      let digitalObjectType = this.digitalObjectTypeRepository.create(
        createDigtialObjectTypeDto,
      );

      digitalObjectType =
        await this.digitalObjectTypeRepository.save(digitalObjectType);

      return digitalObjectType;
    } catch (error) {
      this.logger.error(error);
      if (error.code === '23505') {
        throw new ConflictException('DOT code already exists!');
      }
      throw new InternalServerErrorException('Failed create DOT!');
    }
  }

  async findAll() {}

  async findOneByCode() {}

  async findOne() {}

  async update() {}

  async archive() {}

  async unarchive() {}

  async remove() {}
}
