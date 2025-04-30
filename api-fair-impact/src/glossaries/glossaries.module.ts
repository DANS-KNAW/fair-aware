import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlossariesService } from './glossaries.service';
import { GlossariesController } from './glossaries.controller';
import { Glossary } from './entities/glossary.entity';
import { GlossaryItem } from './entities/glossary-item.entity';
import { LanguagesModule } from 'src/languages/languages.module';
import { DigitalObjectTypesModule } from 'src/digital-object-types/digital-object-types.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Glossary, GlossaryItem]),
    //LanguagesModule,
    forwardRef(() => DigitalObjectTypesModule),
  ],
  controllers: [GlossariesController],
  providers: [GlossariesService],
  exports: [GlossariesService],
})
export class GlossariesModule {}
