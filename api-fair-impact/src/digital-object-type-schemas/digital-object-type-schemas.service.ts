import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  DigitalObjectTypeSchema,
  SchemaTypeEnum,
} from './entities/digital-object-type-schema.entity';
import { CreateDigitalObjectTypeSchemaDto } from './dto/create-digital-object-type-schema.dto';
import {
  DigitalObjectType,
  SchemaType,
} from 'src/digital-object-types/entities/digital-object-type.entity';
import { SchemasServiceFactory } from './schemas/schemas.service.factory';
import { UpdateDigitalObjectTypeSchemaDto } from './dto/update-digital-object-type-schema.dto';

@Injectable()
export class DigitalObjectTypeSchemasService {
  private readonly logger = new Logger(DigitalObjectTypeSchemasService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(DigitalObjectTypeSchema)
    private readonly digitalObjectTypesSchemaRepository: Repository<DigitalObjectTypeSchema>,
    @InjectRepository(DigitalObjectType)
    private readonly digitalObjectTypesRepository: Repository<DigitalObjectType>,

    private readonly schemasServiceFactory: SchemasServiceFactory,
  ) {}

  /**
   * Creates a new Digital Object Type Schema.
   *
   * @param digitalObjectTypeUuid - UUID of the Digital Object Type to associate with the schema.
   * @returns The Digital Object Type Schema.
   */
  async create(
    digitalObjectTypeUuid: string,
  ): Promise<DigitalObjectTypeSchema> {
    try {
      // Check if the referenced Digital Object Type exists.
      const digitalObjectType = await this.digitalObjectTypesRepository.findOne(
        {
          where: {
            uuid: digitalObjectTypeUuid,
          },
        },
      );

      if (!digitalObjectType) {
        throw new NotFoundException('Digital Object Type not found!');
      }

      // Get the base schema for the Digital Object Type based on the schema type.
      const digitalObjectTypeSchemaBase = this.schemasServiceFactory
        .get('FAIR') // @TODO Currently hardcoded but should be dynamic.
        .getBaseSchema(digitalObjectType.code);

      let digitalObjectTypeSchema =
        this.digitalObjectTypesSchemaRepository.create({
          digitalObjectType,
          active: false,
          version: '1.0',
          schema: digitalObjectTypeSchemaBase,
          schemaType: SchemaTypeEnum.FAIR,
        });

      digitalObjectTypeSchema =
        await this.digitalObjectTypesSchemaRepository.save(
          digitalObjectTypeSchema,
        );

      return digitalObjectTypeSchema;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to create Digital Object Type Schema!',
      );
    }
  }

  /**
   * Retrieves a paginated list of Digital Object Type Schemas.
   *
   * @param page - The page number to retrieve.
   * @param amount - The number of schemas per page.
   * @returns A list of Digital Object Type Schemas.
   */
  async findAll(
    page: number = 1,
    amount: number = 20,
  ): Promise<DigitalObjectTypeSchema[]> {
    try {
      const skip = (Math.max(page, 1) - 1) * amount;
      const digitalObjectTypeSchemas =
        await this.digitalObjectTypesSchemaRepository.find({
          skip,
          take: amount,
          relations: {
            digitalObjectType: true,
          },
          select: {
            uuid: true,
            active: true,
            version: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
          },
        });
      return digitalObjectTypeSchemas;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to find DOT Schemas!');
    }
  }

  /**
   * Finds a Digital Object Type Schema by UUID.
   *
   * @param uuid - UUID of the Digital Object Type Schema to find.
   * @returns The found Digital Object Type Schema.
   */
  async findOne(uuid: string): Promise<DigitalObjectTypeSchema> {
    try {
      const digitalObjectTypeSchema =
        await this.digitalObjectTypesSchemaRepository.findOne({
          where: { uuid },
          relations: ['digitalObjectType'], // We want to include the Digital Object Type in the response.
        });

      if (!digitalObjectTypeSchema) {
        throw new NotFoundException(
          `Digital Object Type Schema with UUID ${uuid} not found!`,
        );
      }

      return digitalObjectTypeSchema;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error while trying find DOT Schema!',
      );
    }
  }

  /**
   * Updates a Digital Object Type Schema by UUID.
   *
   * @param uuid - UUID of the Digital Object Type Schema to update.
   * @param updateDigitalObjectTypeSchemaDto - DTO containing the fields to update.
   * @returns The updated Digital Object Type Schema.
   */
  async update(
    uuid: string,
    updateDigitalObjectTypeSchemaDto: UpdateDigitalObjectTypeSchemaDto,
  ): Promise<DigitalObjectTypeSchema> {
    try {
      // Validate if given schema is valid.
      const validSchema = this.schemasServiceFactory
        .get('FAIR') // @TODO Currently hardcoded but should be dynamic.
        .validateSchema(updateDigitalObjectTypeSchemaDto.schema);

      if (!validSchema) {
        throw new BadRequestException('Not an valid FAIR schema!');
      }

      let digitalObjectTypeSchema = await this.findOne(uuid);

      const updatedDigitalObjectTypeSchema =
        await this.digitalObjectTypesSchemaRepository.save({
          uuid,
          ...digitalObjectTypeSchema,
          ...updateDigitalObjectTypeSchemaDto,
        });

      return updatedDigitalObjectTypeSchema;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error while trying to update DOT Schema!',
      );
    }
  }

  async remove() {}
}
