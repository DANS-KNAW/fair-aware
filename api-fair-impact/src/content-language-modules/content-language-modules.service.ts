import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentLanguageModule } from './entities/content-language-module.entity';
import { Repository } from 'typeorm';
import { CreateContentLanguageModuleDto } from './dto/create-content-language-module.dto';

@Injectable()
export class ContentLanguageModulesService {
  private readonly logger = new Logger(ContentLanguageModulesService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(ContentLanguageModule)
    private contentLanguageModuleRepository: Repository<ContentLanguageModule>,
  ) {}

  /**
   * Creates a new content language module.
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

  async findAll() {}

  async findByLanguageAndDot() {}

  async findOne() {}

  async update() {}

  async remove() {}
}
