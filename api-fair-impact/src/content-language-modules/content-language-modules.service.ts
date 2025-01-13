import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
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
    let contentLanguageModule = this.contentLanguageModuleRepository.create(
      createContentLanguageModuleDto,
    );

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

  findAll() {
    return `This action returns all contentLanguageModules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contentLanguageModule`;
  }

  update(
    id: number,
    updateContentLanguageModuleDto: UpdateContentLanguageModuleDto,
  ) {
    return `This action updates a #${id} contentLanguageModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} contentLanguageModule`;
  }
}
