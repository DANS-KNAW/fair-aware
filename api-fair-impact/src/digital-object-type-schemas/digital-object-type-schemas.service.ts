import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateDigitalObjectTypeSchemaDto } from './dto/create-digital-object-type-schema.dto';
import { UpdateDigitalObjectTypeSchemaDto } from './dto/update-digital-object-type-schema.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DigitalObjectTypeSchema } from './entities/digital-object-type-schema.entity';
import { Repository } from 'typeorm';
import { ContentLanguageModulesService } from 'src/content-language-modules/content-language-modules.service';
import { LanguagesService } from 'src/languages/languages.service';
import { DigitalObjectTypesService } from 'src/digital-object-types/digital-object-types.service';

@Injectable()
export class DigitalObjectTypeSchemasService {
  private readonly logger = new Logger(DigitalObjectTypeSchemasService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(DigitalObjectTypeSchema)
    private readonly digitalObjectTypesSchemaRepository: Repository<DigitalObjectTypeSchema>,
    private readonly languagesService: LanguagesService,
    private readonly digitalObjectTypesService: DigitalObjectTypesService,
    private readonly contentLanguageModulesService: ContentLanguageModulesService,
  ) {}
  /**
   * @TODO Creating an DOT Schema should also create a Content language module for each language.
   */
  async create(
    createDigitalObjectTypeSchemaDto: CreateDigitalObjectTypeSchemaDto,
  ): Promise<DigitalObjectTypeSchema> {
    let digitalObjectTypeSchema =
      this.digitalObjectTypesSchemaRepository.create(
        createDigitalObjectTypeSchemaDto,
      );

    try {
      digitalObjectTypeSchema =
        await this.digitalObjectTypesSchemaRepository.save(
          digitalObjectTypeSchema,
        );

      const digitalObjectType = await this.digitalObjectTypesService.findOne(
        createDigitalObjectTypeSchemaDto.digitalObjectTypeUUID,
      );

      const languages = await this.languagesService.findEnabled();

      languages.forEach(async (language) => {
        await this.contentLanguageModulesService.create({
          language,
          digitalObjectTypeSchema,
          digitalObjectType,
        });
        this.logger.log(
          `Created Content Language Module for ${language.code}!`,
        );
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to create DOT Schema!');
    }

    return digitalObjectTypeSchema;
  }

  async findAll(
    page: number = 1,
    amount: number = 20,
  ): Promise<DigitalObjectTypeSchema[]> {
    try {
      const skip = (page - 1) * amount;
      const digitalObjectTypeSchemas =
        await this.digitalObjectTypesSchemaRepository.find({
          skip,
          take: amount,
        });
      return digitalObjectTypeSchemas;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to find DOT Schemas!');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} digitalObjectTypeSchema`;
  }

  update(
    id: number,
    updateDigitalObjectTypeSchemaDto: UpdateDigitalObjectTypeSchemaDto,
  ) {
    return `This action updates a #${id} digitalObjectTypeSchema`;
  }

  remove(id: number) {
    return `This action removes a #${id} digitalObjectTypeSchema`;
  }
}
