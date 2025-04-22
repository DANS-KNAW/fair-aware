import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { SeedingService } from './seeding.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
import { Language } from 'src/languages/entities/language.entity';
import { DigitalObjectType } from 'src/digital-object-types/entities/digital-object-type.entity';
import { Glossary } from 'src/glossaries/entities/glossary.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'Seeding Connection',
      ...databaseConfig.asProvider(),
    }),
    TypeOrmModule.forFeature([Language, DigitalObjectType, Glossary]),
  ],
  providers: [SeedingService],
})
export class SeedingModule implements OnApplicationBootstrap {
  constructor(private readonly seedingService: SeedingService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedingService.seed();
  }
}
