import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { SeedingService } from './seeding.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
import { Language } from 'src/languages/entities/language.entity';
import { DigitalObjectType } from 'src/digital-object-types/entities/digital-object-type.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'Seeding Connection',
      ...databaseConfig.asProvider(),
    }),
    TypeOrmModule.forFeature([Language, DigitalObjectType]),
  ],
  providers: [SeedingService],
})
export class SeedingModule implements OnApplicationBootstrap {
  constructor(private readonly seedingService: SeedingService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedingService.seed();
  }
}
