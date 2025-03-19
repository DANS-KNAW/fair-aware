import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlossariesService } from './glossaries.service';
import { GlossariesController } from './glossaries.controller';
import { Glossary } from './entities/glossary.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Glossary]),
  ],
  controllers: [GlossariesController],
  providers: [GlossariesService],
  exports: [GlossariesService],
})
export class GlossariesModule {}