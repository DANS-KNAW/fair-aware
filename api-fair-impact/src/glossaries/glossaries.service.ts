import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Glossary } from './entities/glossary.entity';
import { CreateGlossaryDto } from './dto/create-glossery.dto';

@Injectable()
export class GlossariesService {
  private readonly logger = new Logger(GlossariesService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(Glossary)
    private readonly glossaryRepository: Repository<Glossary>,
  ) {}

  async create(createGlossaryDto: CreateGlossaryDto): Promise<Glossary> {
    // get the language and digital object type from the database
    const { languageCode, digitalObjectTypeCode, items, ...rest } = createGlossaryDto;
    const language = await this.glossaryRepository.manager
      .getRepository('Language')
      .findOneBy({ code: languageCode });
    const digitalObjectType = await this.glossaryRepository.manager
      .getRepository('DigitalObjectType')
      .findOneBy({ code: digitalObjectTypeCode });
    if (!language) {
      throw new NotFoundException(`Language with code ${languageCode} not found!`);
    }
    if (!digitalObjectType) {
      throw new NotFoundException(
        `Digital Object Type with code ${digitalObjectTypeCode} not found!`,
      );
    }
    const glossary = this.glossaryRepository.create({
      ...rest,
      language,
      digitalObjectType,
      items,
    });
    this.logger.debug(
      `Creating glossary with title: ${glossary.title}, language: ${language.code}, and digital object type: ${digitalObjectType.code}`
    );
 
    this.logger.debug("Rest: " + JSON.stringify(rest, null, 2));
 
    this.logger.debug("Items: " +JSON.stringify(items, null, 2));

    this.logger.debug("Glossary created: " + JSON.stringify(glossary, null, 2));

    try { 
      await this.glossaryRepository.save(glossary);
    }
    catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to create Glossary!');
    }
    return glossary;
  }

  async findAll(): Promise<Glossary[]> {
    try {
      const glossaries = await this.glossaryRepository.find({
        select: {
          uuid: true,
          title: true,
          updatedAt: true,
          createdAt: true,
          deletedAt: true,
          digitalObjectType: {
            uuid: true,
            code: true,
            label: true,
          },
          language: {
            code: true,
            englishLabel: true,
          },
        },
        relations: {
          digitalObjectType: true,
          language: true,
        },
      });
      return glossaries;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to find Glossaries!');
    }
  }

  async findByLanguageAndDot(
    language: string,
    digitalObjectTypeCode: string,
  ): Promise<Glossary> {
    try {
      const glossary = await this.glossaryRepository.findOne({
        where: {
          language: {
            code: language,
          },
          digitalObjectType: {
            code: digitalObjectTypeCode,
          },
        },
        relations: {
          digitalObjectType: true,
          language: true,
          items: true,
        },
      });

      if (!glossary) {
        throw new NotFoundException(
          `Glossary with language ${language} and digital object type code ${digitalObjectTypeCode} not found!`,
        );
      }

      return glossary;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException('Failed to fetch glossary!');
    }
  }

  async findOne(uuid: string): Promise<Glossary> {
    try {
      const glossary = await this.glossaryRepository.findOne({
        where: { uuid },
        relations: {
          digitalObjectType: true,
          language: true,
          items: true,
        },
      });
      if (!glossary) {
        throw new NotFoundException(`Glossary with uuid ${uuid} not found!`);
      }
      return glossary;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to find Glossary!');
    }
  }
}
