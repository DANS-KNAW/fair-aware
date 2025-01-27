import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateDigitalObjectTypeSchemaDto } from './dto/create-digital-object-type-schema.dto';
import { UpdateDigitalObjectTypeSchemaDto } from './dto/update-digital-object-type-schema.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DigitalObjectTypeSchema } from './entities/digital-object-type-schema.entity';
import { In, Repository } from 'typeorm';
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
    @Inject(forwardRef(() => DigitalObjectTypesService))
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
          active: false,
          version: '1.0',
          ...createDigitalObjectTypeSchemaDto,
        });

      // Save the DOT Schema
      digitalObjectTypeSchema =
        await this.digitalObjectTypesSchemaRepository.save(
          digitalObjectTypeSchema,
        );

      // Add the rollback action for this DOT Schema.
      rollbackActions.push(async () => {
        await this.remove(digitalObjectTypeSchema.uuid);
        this.logger.warn(
          `ROLLBACK: Removed DOT Schema ${digitalObjectTypeSchema.uuid} from ${digitalObjectType.label}`,
        );
      });

      // Get all enabled languages
      const languages = await this.languagesService.findEnabled();

      // Create a Content Language Module for each language.
      for (const language of languages) {
        // Create the Content Language Module.
        const contentLanguageModule =
          await this.contentLanguageModulesService.create({
            language,
            digitalObjectTypeSchema,
            digitalObjectType,
          });

        this.logger.log(
          `Created Content Language Module in "${language.englishLabel}" for "${digitalObjectType.label}"`,
        );

        // Add the rollback action for this Content Language Module.
        rollbackActions.push(async () => {
          await this.contentLanguageModulesService.remove(
            contentLanguageModule.uuid,
          );
          this.logger.warn(
            `ROLLBACK: Removed Content Language Module in "${language.englishLabel}" for "${digitalObjectType.label}"`,
          );
        });
      }

      return digitalObjectTypeSchema;
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
          relations: {
            digitalObjectType: true,
            language: true,
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

  async update(
    uuid: string,
    updateDigitalObjectTypeSchemaDto: UpdateDigitalObjectTypeSchemaDto,
  ): Promise<DigitalObjectTypeSchema> {
    try {
      const digitalObjectTypeSchema =
        await this.digitalObjectTypesSchemaRepository.preload({
          uuid,
          ...updateDigitalObjectTypeSchemaDto,
        });

      if (!digitalObjectTypeSchema) {
        throw new NotFoundException('DOT Schema not found!');
      }

      return this.digitalObjectTypesSchemaRepository.save(
        digitalObjectTypeSchema,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException('Failed to update DOT Schema!');
    }
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
