import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
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

  async create(
    createDigtialObjectTypeDto: CreateDigitalObjectTypeDto,
  ): Promise<DigitalObjectType> {
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

  async findAll(page: number = 1): Promise<DigitalObjectType[]> {
    try {
      const skip = (Math.max(page, 1) - 1) * 10;
      const digitalObjectTypes = await this.digitalObjectTypeRepository.find({
        where: { deletedAt: null },
        skip,
        take: 10,
        order: { createdAt: 'DESC' },
      });
      return digitalObjectTypes;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        "Something went wrong trying to fetch DOT's",
      );
    }
  }

  async findOne(uuid: string): Promise<DigitalObjectType> {
    try {
      const digitalObjectType = await this.digitalObjectTypeRepository.findOne({
        where: { uuid },
      });

      if (!digitalObjectType) {
        throw new NotFoundException('Digital Object Type not found');
      }

      return digitalObjectType;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to fetch Digital Object Type',
      );
    }
  }

  async findOneByCode(code: string) {
    try {
      const digitalObjectType = await this.digitalObjectTypeRepository.findOne({
        where: { code },
      });

      if (!digitalObjectType) {
        throw new NotFoundException('Digital Object Type not found');
      }

      return digitalObjectType;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to fetch Digital Object Type',
      );
    }
  }

  async update() {}

  async archive() {}

  async unarchive() {}

  async remove() {}
}
