import { Module } from '@nestjs/common';
import { DigitalObjectTypeSchemasService } from './digital-object-type-schemas.service';
import { DigitalObjectTypeSchemasController } from './digital-object-type-schemas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DigitalObjectTypeSchema } from './entities/digital-object-type-schema.entity';
import { ContentLanguageModulesModule } from 'src/content-language-modules/content-language-modules.module';
import { LanguagesModule } from 'src/languages/languages.module';
import { DigitalObjectTypesModule } from 'src/digital-object-types/digital-object-types.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DigitalObjectTypeSchema]),
    LanguagesModule,
    DigitalObjectTypesModule,
    ContentLanguageModulesModule,
  ],
  controllers: [DigitalObjectTypeSchemasController],
  providers: [DigitalObjectTypeSchemasService],
})
export class DigitalObjectTypeSchemasModule {}
