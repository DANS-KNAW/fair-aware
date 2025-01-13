import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { SeedingService } from './seeding.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
import { Language } from 'src/languages/entities/language.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(databaseConfig.asProvider()),
    TypeOrmModule.forFeature([Language]),
  ],
  providers: [SeedingService],
})
export class SeedingModule implements OnApplicationBootstrap {
  constructor(private readonly seedingService: SeedingService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedingService.seed();
  }
}
