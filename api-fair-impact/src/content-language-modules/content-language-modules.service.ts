import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentLanguageModule } from './entities/content-language-module.entity';
import { Repository } from 'typeorm';
import { CreateContentLanguageModuleDto } from './dto/create-content-language-module.dto';
import { UpdateContentLanguageModuleDto } from './dto/update-content-language-module.dto';
import { SchemasServiceFactory } from 'src/digital-object-type-schemas/schemas/schemas.service.factory';

@Injectable()
export class ContentLanguageModulesService {
  private readonly logger = new Logger(ContentLanguageModulesService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(ContentLanguageModule)
    private contentLanguageModuleRepository: Repository<ContentLanguageModule>,
    private readonly schemasServiceFactory: SchemasServiceFactory,
  ) {}

  /**
   * Creates a new content language module.
   *
   * @param createContentLanguageModuleDto - The data to create the new content language module.
   * @returns The created content language module.
   */
  async create(
    createContentLanguageModuleDto: CreateContentLanguageModuleDto,
  ): Promise<ContentLanguageModule> {
    try {
      let contentLanguageModule = this.contentLanguageModuleRepository.create(
        createContentLanguageModuleDto,
      );

      contentLanguageModule = await this.contentLanguageModuleRepository.save(
        contentLanguageModule,
      );

      return contentLanguageModule;
    } catch (error) {
      this.logger.error(error);
      // Check if the error is a unique constraint violation.
      if (error.code === '23505') {
        throw new ConflictException('Content language module already exists!');
      }
      throw new InternalServerErrorException(
        'Failed to create content language module!',
      );
    }
  }

  /**
   * Retrieves all content language modules with pagination support.
   *
   * @param page - The page number for pagination.
   * @returns  A list of content language modules.
   */
  async findAll(page: number = 1): Promise<ContentLanguageModule[]> {
    try {
      const skip = (Math.max(page, 1) - 1) * 10;
      const contentLanguageModules =
        await this.contentLanguageModuleRepository.find({
          skip,
          take: 10,
          select: {
            uuid: true,
            updatedAt: true,
            createdAt: true,
            deletedAt: true,
            digitalObjectType: {
              uuid: true,
              code: true,
              label: true,
            },
            digitalObjectTypeSchema: {
              version: true,
            },
            language: {
              code: true,
              englishLabel: true,
            },
          },
          relations: {
            digitalObjectType: true,
            digitalObjectTypeSchema: true,
            language: true,
          },
        });
      return contentLanguageModules;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to find CLMs!');
    }
  }

  /**
   * Finds a content language module by language and digital object type code.
   *
   * @param language - The language code.
   * @param digitalObjectTypeCode - The digital object type code.
   * @returns The found content language module.
   */
  async findByLanguageAndDot(
    language: string,
    digitalObjectTypeCode: string,
  ): Promise<ContentLanguageModule> {
    try {
      const contentLanguageModule =
        await this.contentLanguageModuleRepository.findOne({
          where: {
            language: {
              code: language,
            },
            digitalObjectType: {
              code: digitalObjectTypeCode,
            },
          },
        });

      if (!contentLanguageModule) {
        throw new NotFoundException(
          `Content Language Module with language ${language} and digital object type code ${digitalObjectTypeCode} not found!`,
        );
      }

      return contentLanguageModule;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to fetch contentLanguageModule!',
      );
    }
  }

  /**
   * Finds a content language module by its UUID.
   *
   * @param uuid - The UUID of the content language module to find.
   * @returns The found content language module.
   */
  async findOne(uuid: string): Promise<ContentLanguageModule> {
    try {
      const contentLanguageModule =
        await this.contentLanguageModuleRepository.findOne({
          where: { uuid },
          relations: {
            digitalObjectType: true,
            digitalObjectTypeSchema: true,
            language: true,
          },
        });

      if (!contentLanguageModule) {
        throw new NotFoundException(
          `Content Language Module with uuid ${uuid} not found!`,
        );
      }

      return contentLanguageModule;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to fetch contentLanguageModule!',
      );
    }
  }

  /**
   * Updates a content language module by its UUID.
   *
   * @param uuid - The UUID of the content language module to update.
   * @param updateContentLanguageModuleDto - The data to update the content language module.
   * @returns The updated content language module.
   */
  async update(
    uuid: string,
    updateContentLanguageModuleDto: UpdateContentLanguageModuleDto,
  ): Promise<ContentLanguageModule> {
    try {
      let contentLanguageModule = await this.findOne(uuid);

      const validSchema = this.schemasServiceFactory
        .get('FAIR')
        .validateContentSchema(
          updateContentLanguageModuleDto.schema,
          contentLanguageModule.digitalObjectTypeSchema.schema,
        );

      if (!validSchema) {
        throw new BadRequestException('Invalid schema!');
      }

      contentLanguageModule = this.contentLanguageModuleRepository.create({
        ...contentLanguageModule,
        ...updateContentLanguageModuleDto,
      });

      contentLanguageModule = await this.contentLanguageModuleRepository.save(
        contentLanguageModule,
      );

      return contentLanguageModule;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to update contentLanguageModule!',
      );
    }
  }

  /**
   * Removes a content language module from the repository.
   *
   * @param uuid - The UUID of the content language module to remove.
   * @returns The removed content language module.
   */
  async remove(uuid: string): Promise<ContentLanguageModule> {
    try {
      const contentLanguageModule = await this.findOne(uuid);

      return this.contentLanguageModuleRepository.remove(contentLanguageModule);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to remove contentLanguageModule!',
      );
    }
  }
}
