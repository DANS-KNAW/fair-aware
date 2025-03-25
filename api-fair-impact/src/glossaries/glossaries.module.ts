import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlossariesService } from './glossaries.service';
import { GlossariesController } from './glossaries.controller';
import { Glossary } from './entities/glossary.entity';
import { GlossaryItem } from './entities/glossary-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Glossary, GlossaryItem])],
  controllers: [GlossariesController],
  providers: [GlossariesService],
  exports: [GlossariesService],
})
export class GlossariesModule {}
