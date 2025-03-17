import {
  Injectable,
  InternalServerErrorException,
  Logger,
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

  async findOne() {}

  async findEnabled() {}

  async enable() {}

  async disable() {}
}
