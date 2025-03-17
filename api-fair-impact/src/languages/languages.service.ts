import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Language } from './entities/language.entity';
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

  async findEnabled() {}

  async enable() {}

  async disable() {}
}
