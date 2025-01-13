import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LanguagesService {
  private readonly logger = new Logger(LanguagesService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async findAll(): Promise<Language[]> {
    try {
      // Returning it directly since at worst it will return an empty array.
      return this.languageRepository.find();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to fetch languages!');
    }
  }

  async findOne(code: string): Promise<Language> {
    try {
      const language = await this.languageRepository.findOne({
        where: { code },
      });

      if (!language) {
        throw new NotFoundException(`Language with code ${code} not found!`);
      }

      return language;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to fetch language!');
    }
  }

  update(code: string, updateLanguageDto: UpdateLanguageDto) {
    return `This action updates a #${code} language`;
  }
}
