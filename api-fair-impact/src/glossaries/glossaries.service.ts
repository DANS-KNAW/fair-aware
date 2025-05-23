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
    const { languageCode, digitalObjectTypeCode, items, ...rest } =
      createGlossaryDto;
    const language = await this.glossaryRepository.manager
      .getRepository('Language')
      .findOneBy({ code: languageCode });
    const digitalObjectType = await this.glossaryRepository.manager
      .getRepository('DigitalObjectType')
      .findOneBy({ code: digitalObjectTypeCode });
    if (!language) {
      throw new NotFoundException(
        `Language with code ${languageCode} not found!`,
      );
    }
    if (!digitalObjectType) {
      throw new NotFoundException(
        `Digital Object Type with code ${digitalObjectTypeCode} not found!`,
      );
    }
    this.logger.debug('Rest: ' + JSON.stringify(rest, null, 2));

    this.logger.debug('Items: ' + JSON.stringify(items, null, 2));

    const glossary = this.glossaryRepository.create({
      ...rest,
      language,
      digitalObjectType,
      items,
    });
    this.logger.debug(
      `Creating glossary with title: ${glossary.title}, language: ${language.code}, and digital object type: ${digitalObjectType.code}`,
    );

    this.logger.debug('Glossary created: ' + JSON.stringify(glossary, null, 2));

    try {
      // find the glossary by language and digital object type
      const existingGlossary = await this.glossaryRepository.findOne({
        where: {
          language: { code: language.code },
          digitalObjectType: { code: digitalObjectType.code },
        },
        relations: {
          digitalObjectType: true,
          language: true,
          //items: true,
        },
      });

      if (existingGlossary) {
        // if it exists save gives an error (language and digital object type are not unique)
        // but upsert does not work... it does not change the existing glossary items
        throw new InternalServerErrorException(
          `Glossary with language ${language.code} and digital object type code ${digitalObjectType.code} already exists!`,
        );
      }

      await this.glossaryRepository.save(glossary);
    } catch (error) {
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

  async removeByLanguageAndDot(
    language: string,
    digitalObjectTypeCode: string,
  ): Promise<void> {
    try {
      const glossary = await this.findByLanguageAndDot(
        language,
        digitalObjectTypeCode,
      );
      if (!glossary) {
        throw new NotFoundException(
          `Glossary with language ${language} and digital object type code ${digitalObjectTypeCode} not found!`,
        );
      }
      return await this.remove(glossary.uuid);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(error);
      throw new InternalServerErrorException(
        `Failed to remove glossary by language: ${language} and digital object type code: ${digitalObjectTypeCode}!`,
      );
    }
  }

  async remove(uuid: string): Promise<void> {
    try {
      const glossary = await this.glossaryRepository.findOne({
        where: { uuid },
      });
      if (!glossary) {
        throw new NotFoundException(`Glossary with uuid ${uuid} not found!`);
      }
      // remove all its items
      await this.glossaryRepository.manager
        .getRepository('GlossaryItem')
        .delete({ glossary: { uuid } });
      // remove the glossary;
      await this.glossaryRepository.remove(glossary);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to remove Glossary!');
    }
  }
}
