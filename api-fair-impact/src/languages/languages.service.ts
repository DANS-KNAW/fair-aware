import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Language, LanguageStatus } from './entities/language.entity';
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

  async enable(code: string): Promise<Language> {
    try {
      const language = await this.findOne(code);

      /**
       * @TODO Implement checks to see if the language can be enabled.
       */
      language.status = LanguageStatus.ENABLED;

      return this.languageRepository.save(language);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to enable language!');
    }
  }

  async disable(code: string): Promise<Language> {
    try {
      const language = await this.findOne(code);

      /**
       * @TODO Implement checks to see if the language can be disabled.
       */
      language.status = LanguageStatus.DISABLED;

      return this.languageRepository.save(language);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to disable language!');
    }
  }
}
