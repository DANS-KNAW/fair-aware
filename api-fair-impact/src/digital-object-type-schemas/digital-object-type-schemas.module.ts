import { forwardRef, Module } from '@nestjs/common';
import { DigitalObjectTypeSchemasService } from './digital-object-type-schemas.service';
import { DigitalObjectTypeSchemasController } from './digital-object-type-schemas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DigitalObjectTypeSchema } from './entities/digital-object-type-schema.entity';
import { ContentLanguageModulesModule } from 'src/content-language-modules/content-language-modules.module';
import { LanguagesModule } from 'src/languages/languages.module';
import { DigitalObjectTypesModule } from 'src/digital-object-types/digital-object-types.module';
import { SchemasServiceFactory } from './schemas/schemas.service.factory';
import { FAIRSchema } from './schemas/fair-schema.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DigitalObjectTypeSchema]),
    LanguagesModule,
    forwardRef(() => DigitalObjectTypesModule),
    ContentLanguageModulesModule,
  ],
  controllers: [DigitalObjectTypeSchemasController],
  providers: [
    DigitalObjectTypeSchemasService,
    SchemasServiceFactory,
    FAIRSchema,
  ],
  exports: [DigitalObjectTypeSchemasService],
})
export class DigitalObjectTypeSchemasModule {}
