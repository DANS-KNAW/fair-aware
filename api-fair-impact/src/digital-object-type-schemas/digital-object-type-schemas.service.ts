import {
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

  async findAll() {}

  async findOne() {}

  async update() {}

  async remove() {}
}
