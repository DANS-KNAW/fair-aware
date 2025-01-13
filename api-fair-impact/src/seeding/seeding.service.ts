import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Language } from 'src/languages/entities/language.entity';
import { languageSeeds } from './seeds/language.seeds';

@Injectable()
export class SeedingService {
  private readonly logger = new Logger(SeedingService.name, {
    timestamp: true,
  });

  constructor(private readonly entityManager: EntityManager) {}

  async seed(): Promise<void> {
    try {
      this.logger.warn('Starting seeding...');
      this.logger.log('Seeding languages...');
      await this.entityManager.upsert(Language, languageSeeds, {
        conflictPaths: ['code'],
        skipUpdateIfNoValuesChanged: true,
      });
      this.logger.log('Seeding complete.');
    } catch (error) {
      this.logger.error(error);
    }
  }
}
