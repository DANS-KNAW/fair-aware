import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateContentLanguageModuleDto } from './dto/create-content-language-module.dto';
import { UpdateContentLanguageModuleDto } from './dto/update-content-language-module.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentLanguageModule } from './entities/content-language-module.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentLanguageModulesService {
  private readonly logger = new Logger(ContentLanguageModulesService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(ContentLanguageModule)
    private readonly contentLanguageModuleRepository: Repository<ContentLanguageModule>,
  ) {}

  async create(
    createContentLanguageModuleDto: CreateContentLanguageModuleDto,
  ): Promise<ContentLanguageModule> {
    let contentLanguageModule = this.contentLanguageModuleRepository.create({
      ...createContentLanguageModuleDto,
    });

    try {
      contentLanguageModule = await this.contentLanguageModuleRepository.save(
        contentLanguageModule,
      );
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Content Language Module already exists!');
      }
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to create contentLanguageModule!',
      );
    }

    return contentLanguageModule;
  }

  async findAll(): Promise<ContentLanguageModule[]> {
    try {
      const contentLanguageModules =
        await this.contentLanguageModuleRepository.find({
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

  async update(
    uuid: string,
    updateContentLanguageModuleDto: UpdateContentLanguageModuleDto,
  ) {
    try {
      const contentLanguageModule =
        await this.contentLanguageModuleRepository.preload({
          uuid,
          ...updateContentLanguageModuleDto,
        });

      if (!contentLanguageModule) {
        throw new NotFoundException(
          `Content Language Module with uuid ${uuid} not found for update!`,
        );
      }

      return this.contentLanguageModuleRepository.save(contentLanguageModule);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to update contentLanguageModule!',
      );
    }
  }

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
