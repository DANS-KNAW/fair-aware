import {
  Injectable,
  InternalServerErrorException,
  Logger,
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

  findOne(id: number) {
    return `This action returns a #${id} language`;
  }

  update(id: number, updateLanguageDto: UpdateLanguageDto) {
    return `This action updates a #${id} language`;
  }
}
