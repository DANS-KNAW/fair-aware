import {
  ConflictException,
  forwardRef,
  Inject,
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
import { DigitalObjectTypeSchemasService } from 'src/digital-object-type-schemas/digital-object-type-schemas.service';

@Injectable()
export class DigitalObjectTypesService {
  private readonly logger = new Logger(DigitalObjectTypesService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(DigitalObjectType)
    private readonly digitalObjectTypesRepository: Repository<DigitalObjectType>,
    @Inject(forwardRef(() => DigitalObjectTypeSchemasService))
    private readonly digitalObjectTypeSchemasService: DigitalObjectTypeSchemasService,
  ) {}

  /**
   * @TODO Creating an DOT should also create an DigitalObjectTypeSchema.
   */
  async create(
    createDigitalObjectTypeDto: CreateDigitalObjectTypeDto,
  ): Promise<DigitalObjectType> {
    // Holds all the rollback actions, in case of an error.
    const rollbackActions: (() => Promise<void>)[] = [];

    try {
      let digitalObjectType = this.digitalObjectTypesRepository.create(
        createDigitalObjectTypeDto,
      );

      digitalObjectType =
        await this.digitalObjectTypesRepository.save(digitalObjectType);

      rollbackActions.push(async () => {
        await this.remove(digitalObjectType.uuid);
        this.logger.warn(
          `ROLLBACK: Removed DOT ${digitalObjectType.uuid} - ${digitalObjectType.label}`,
        );
      });

      // Create a default schema for the DOT
      await this.digitalObjectTypeSchemasService.create({
        digitalObjectTypeUUID: digitalObjectType.uuid,
      });

      return digitalObjectType;
    } catch (error) {
      // Rollback any actions that were executed.
      for (const action of rollbackActions.reverse()) {
        try {
          await action();
        } catch (rollbackError) {
          this.logger.error(
            'Failed to execute rollback action:',
            rollbackError,
          );
        }
      }

      if (error instanceof DigitalObjectTypeSchemasService) {
        throw error;
      }

      this.logger.error(error);
      if (error.code === '23505') {
        throw new ConflictException('DOT code already exists!');
      }
      this.logger.error(error);
      throw new InternalServerErrorException('Failed create DOT!');
    }
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
        relations: {
          digitalObjectTypeSchemas: true,
        },
        select: {
          digitalObjectTypeSchemas: {
            version: true,
            active: true,
          },
        },
      });

      // @TODO Should research if this can be done in the initial query to safe resources.
      // Remove any digitalObjectTypeSchemas from an dot that is not active.
      digitalObjectTypes.forEach((dot) => {
        dot.digitalObjectTypeSchemas = dot.digitalObjectTypeSchemas.filter(
          (dotSchema) => dotSchema.active,
        );

        // Should an dot have more than one active schema, return an error.
        if (dot.digitalObjectTypeSchemas.length > 1) {
          throw new InternalServerErrorException(
            'An DOT should only have one active schema!',
          );
        }

        return dot;
      });

      return digitalObjectTypes;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to get DOTs!');
    }
  }

  async findOneByCode(code: string): Promise<DigitalObjectType> {
    try {
      const digitalObjectType = await this.digitalObjectTypesRepository.findOne(
        {
          where: { code },
        },
      );

      if (!digitalObjectType) {
        throw new NotFoundException('DOT not found!');
      }

      return digitalObjectType;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to get DOT!');
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
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(error);
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

      return this.digitalObjectTypesRepository.save(digitalObjectType);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(error);
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

  async remove(uuid: string) {
    try {
      const digitalObjectType = await this.findOne(uuid);

      return this.digitalObjectTypesRepository.remove(digitalObjectType);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to remove DOT!');
    }
  }
}
