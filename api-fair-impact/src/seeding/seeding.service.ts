import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Language } from 'src/languages/entities/language.entity';
import { languageSeeds } from './seeds/language.seeds';
import { DigitalObjectType } from 'src/digital-object-types/entities/digital-object-type.entity';
import {
  DigitalObjectTypeSchema,
  SchemaTypeEnum,
} from 'src/digital-object-type-schemas/entities/digital-object-type-schema.entity';
import { digitalObjectTypeSchemaDATA } from './seeds/digital-object-type-schema-data.seeds';
import { ContentLanguageModule } from 'src/content-language-modules/entities/content-language-module.entity';

@Injectable()
export class SeedingService {
  private readonly logger = new Logger(SeedingService.name, {
    timestamp: true,
  });

  constructor(private readonly entityManager: EntityManager) {}

  async seed(): Promise<void> {
    try {
      this.logger.log('Starting seeding');

      this.logger.verbose('Seeding languages');
      await this.entityManager.upsert(Language, languageSeeds, {
        conflictPaths: ['code'],
        skipUpdateIfNoValuesChanged: true,
      });

      this.logger.verbose('Seeding Digital Object Types');
      await this.entityManager.upsert(
        DigitalObjectType,
        { code: 'DATA', label: 'Datasets' },
        {
          conflictPaths: ['code'],
          skipUpdateIfNoValuesChanged: true,
        },
      );

      const digitalObjectTypes =
        await this.entityManager.find(DigitalObjectType);

      const existingSchema = await this.entityManager.findOne(
        DigitalObjectTypeSchema,
        {
          where: {
            digitalObjectType: {
              uuid: digitalObjectTypes[0].uuid,
            },
          },
        },
      );

      if (!existingSchema) {
        await this.entityManager.insert(DigitalObjectTypeSchema, {
          version: '1.0',
          schemaType: SchemaTypeEnum.FAIR,
          schema: {
            assessment: [
              {
                criteria: [
                  {
                    required: true,
                    displayLikelihood: true,
                  },
                  {
                    required: true,
                    displayLikelihood: true,
                  },
                  {
                    required: true,
                    displayLikelihood: true,
                  },
                ],
              },
              {
                criteria: [
                  {
                    required: true,
                    displayLikelihood: true,
                  },
                  {
                    required: true,
                    displayLikelihood: true,
                  },
                ],
              },
              {
                criteria: [
                  {
                    required: true,
                    displayLikelihood: true,
                  },
                ],
              },
              {
                criteria: [
                  {
                    required: true,
                    displayLikelihood: true,
                  },
                  {
                    required: true,
                    displayLikelihood: true,
                  },
                  {
                    required: true,
                    displayLikelihood: true,
                  },
                  {
                    required: true,
                    displayLikelihood: true,
                  },
                ],
              },
            ],
          },
          digitalObjectType: digitalObjectTypes[0],
          active: true,
        });
      }

      const digitalObjectTypeSchemas = await this.entityManager.find(
        DigitalObjectTypeSchema,
      );

      const english = await this.entityManager.findOne(Language, {
        where: {
          code: 'en',
        },
      });

      // Get DOT schema
      const contentLanguageModule = await this.entityManager.findOne(
        ContentLanguageModule,
        {
          where: {
            digitalObjectTypeSchema: {
              uuid: digitalObjectTypeSchemas[0].uuid,
            },
          },
        },
      );

      if (!contentLanguageModule) {
        await this.entityManager.insert(ContentLanguageModule, {
          digitalObjectType: { ...digitalObjectTypes[0] },
          digitalObjectTypeSchema: { ...digitalObjectTypeSchemas[0] },
          language: { ...english },
          schema: digitalObjectTypeSchemaDATA,
        });
      }

      this.logger.log('Seeding complete.');
    } catch (error) {
      this.logger.error(error);
    }
  }
}
