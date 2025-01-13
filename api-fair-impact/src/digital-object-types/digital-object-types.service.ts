import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateDigitalObjectTypeDto } from './dto/create-digital-object-type.dto';
import { UpdateDigitalObjectTypeDto } from './dto/update-digital-object-type.dto';
import { Repository } from 'typeorm';
import { DigitalObjectType } from './entities/digital-object-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DigitalObjectTypesService {
  private readonly logger = new Logger(DigitalObjectTypesService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(DigitalObjectType)
    private readonly digitalObjectTypesRepository: Repository<DigitalObjectType>,
  ) {}

  /**
   * @TODO Creating an DOT should also create an DigitalObjectTypeSchema.
   */
  async create(
    createDigitalObjectTypeDto: CreateDigitalObjectTypeDto,
  ): Promise<DigitalObjectType> {
    let digitalObjectType = this.digitalObjectTypesRepository.create(
      createDigitalObjectTypeDto,
    );

    try {
      digitalObjectType =
        await this.digitalObjectTypesRepository.save(digitalObjectType);
    } catch (error) {
      this.logger.error(error);
      if (error.code === '23505') {
        throw new ConflictException('DOT code already exists!');
      }
      throw new InternalServerErrorException('Failed create DOT!');
    }

    return digitalObjectType;
  }

  async findAll(
    page: number = 1,
    amount: number = 50,
  ): Promise<DigitalObjectType[]> {
    try {
      const skip = (page - 1) * amount;
      const digitalObjectTypes = await this.digitalObjectTypesRepository.find({
        skip,
        take: amount,
      });
      return digitalObjectTypes;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to get DOTs!');
    }
  }

  async findOne(
    uuid: string,
    withRelations: boolean = false,
  ): Promise<DigitalObjectType> {
    try {
      const digitalObjectType = await this.digitalObjectTypesRepository.findOne(
        {
          relations: {
            /**
             * @TODO Ensure that limits are set for the amount of data that can be retrieved.
             */
            contentLanguageModules: withRelations,
          },
          where: { uuid },
        },
      );

      if (!digitalObjectType) {
        throw new NotFoundException('DOT not found!');
      }

      return digitalObjectType;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to get DOT!');
    }
  }

  async update(
    uuid: string,
    updateDigitalObjectTypeDto: UpdateDigitalObjectTypeDto,
  ): Promise<DigitalObjectType> {
    try {
      const digitalObjectType = await this.digitalObjectTypesRepository.preload(
        {
          uuid,
          ...updateDigitalObjectTypeDto,
        },
      );

      if (!digitalObjectType) {
        throw new NotFoundException('DOT not found!');
      }

      return await this.digitalObjectTypesRepository.save(digitalObjectType);
    } catch (error) {
      this.logger.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update DOT!');
    }
  }

  async archive(uuid: string): Promise<DigitalObjectType> {
    try {
      let digitalObjectType = await this.findOne(uuid);

      digitalObjectType =
        await this.digitalObjectTypesRepository.softRemove(digitalObjectType);

      return digitalObjectType;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to archive DOT!');
    }
  }

  async unarchive(uuid: string): Promise<DigitalObjectType> {
    try {
      let digitalObjectType = await this.findOne(uuid);

      digitalObjectType =
        await this.digitalObjectTypesRepository.recover(digitalObjectType);

      return digitalObjectType;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to unarchive DOT!');
    }
  }
}
