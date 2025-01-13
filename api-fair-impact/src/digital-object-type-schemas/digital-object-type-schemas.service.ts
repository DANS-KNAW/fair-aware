import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateDigitalObjectTypeSchemaDto } from './dto/create-digital-object-type-schema.dto';
import { UpdateDigitalObjectTypeSchemaDto } from './dto/update-digital-object-type-schema.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DigitalObjectTypeSchema } from './entities/digital-object-type-schema.entity';
import { Repository } from 'typeorm';
import { ContentLanguageModulesService } from 'src/content-language-modules/content-language-modules.service';
import { LanguagesService } from 'src/languages/languages.service';
import { DigitalObjectTypesService } from 'src/digital-object-types/digital-object-types.service';

@Injectable()
export class DigitalObjectTypeSchemasService {
  private readonly logger = new Logger(DigitalObjectTypeSchemasService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(DigitalObjectTypeSchema)
    private readonly digitalObjectTypesSchemaRepository: Repository<DigitalObjectTypeSchema>,
    private readonly languagesService: LanguagesService,
    private readonly digitalObjectTypesService: DigitalObjectTypesService,
    private readonly contentLanguageModulesService: ContentLanguageModulesService,
  ) {}
  /**
   * @TODO Creating an DOT Schema should also create a Content language module for each language.
   */
  async create(
    createDigitalObjectTypeSchemaDto: CreateDigitalObjectTypeSchemaDto,
  ): Promise<DigitalObjectTypeSchema> {
    // Holds all the rollback actions, in case of an error.
    const rollbackActions: (() => Promise<void>)[] = [];

    try {
      // Get the related DOT
      const digitalObjectType = await this.digitalObjectTypesService.findOne(
        createDigitalObjectTypeSchemaDto.digitalObjectTypeUUID,
      );

      this.logger.log(`Creating DOT Schema for ${digitalObjectType.label}`);

      // Create the DOT Schema
      let digitalObjectTypeSchema =
        this.digitalObjectTypesSchemaRepository.create({
          digitalObjectType,
          ...createDigitalObjectTypeSchemaDto,
        });

      // Save the DOT Schema
      digitalObjectTypeSchema =
        await this.digitalObjectTypesSchemaRepository.save(
          digitalObjectTypeSchema,
        );

      // Get all enabled languages
      const languages = await this.languagesService.findEnabled();

      // Create a Content Language Module for each language.
      for (const language of languages) {
        await this.contentLanguageModulesService.create({
          language,
          digitalObjectTypeSchema,
          digitalObjectType,
        });
        this.logger.log(
          `Created Content Language Module for ${language.englishLabel} and ${digitalObjectType.label}`,
        );
      }

      return digitalObjectTypeSchema;
    } catch (error) {
      if (
        error instanceof LanguagesService ||
        error instanceof DigitalObjectTypesService ||
        error instanceof ContentLanguageModulesService
      ) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException('Failed to create DOT Schema!');
    }
  }

  async findAll(
    page: number = 1,
    amount: number = 20,
  ): Promise<DigitalObjectTypeSchema[]> {
    try {
      const skip = (page - 1) * amount;
      const digitalObjectTypeSchemas =
        await this.digitalObjectTypesSchemaRepository.find({
          skip,
          take: amount,
        });
      return digitalObjectTypeSchemas;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to find DOT Schemas!');
    }
  }

  async findOne(uuid: string): Promise<DigitalObjectTypeSchema> {
    try {
      const digitalObjectTypeSchema =
        await this.digitalObjectTypesSchemaRepository.findOne({
          where: { uuid },
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

  update(
    id: number,
    updateDigitalObjectTypeSchemaDto: UpdateDigitalObjectTypeSchemaDto,
  ) {
    return `This action updates a #${id} digitalObjectTypeSchema`;
  }

  async remove(uuid: string) {
    try {
      const digitalObjectTypeSchema = await this.findOne(uuid);

      return this.digitalObjectTypesSchemaRepository.remove(
        digitalObjectTypeSchema,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException('Failed to remove DOT Schema!');
    }
  }
}
