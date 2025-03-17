import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Language, LanguageStatus } from './entities/language.entity';
import { InjectRepository } from '@nestjs/typeorm';
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

  /**
   * Retrieves all languages.
   * @returns A list of languages.
   */
  async findAll(): Promise<Language[]> {
    try {
      // Returning it directly since at worst it will return an empty array.
      // We don't need pagination as it is an finite list.
      return this.languageRepository.find();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to fetch languages!');
    }
  }

  /**
   * Retrieves a language by its code.
   *
   * @param code - The code of the language.
   * @returns The language with the given code.
   */
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

  /**
   * Retrieves all enabled languages.
   * @returns A list of enabled languages.
   */
  async findEnabled(): Promise<Language[]> {
    try {
      return this.languageRepository.find({
        where: { status: LanguageStatus.ENABLED },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to fetch enabled languages!',
      );
    }
  }

  /**
   * Enables a language.
   * @param code - The code of the language to enable.
   * @returns The enabled language.
   */
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

  /**
   * Disables a language.
   * @param code - The code of the language to disable.
   * @returns The disabled language.
   */
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
