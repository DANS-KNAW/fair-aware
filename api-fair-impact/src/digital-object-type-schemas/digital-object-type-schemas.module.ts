import { Module } from '@nestjs/common';
import { DigitalObjectTypeSchemasService } from './digital-object-type-schemas.service';
import { DigitalObjectTypeSchemasController } from './digital-object-type-schemas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DigitalObjectTypeSchema } from './entities/digital-object-type-schema.entity';
import { LanguagesModule } from 'src/languages/languages.module';
import { DigitalObjectType } from 'src/digital-object-types/entities/digital-object-type.entity';
import { FAIRSchema } from './schemas/fair-schema.service';
import { SchemasServiceFactory } from './schemas/schemas.service.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([DigitalObjectTypeSchema, DigitalObjectType]),
    LanguagesModule,
  ],
  controllers: [DigitalObjectTypeSchemasController],
  providers: [
    DigitalObjectTypeSchemasService,
    SchemasServiceFactory,
    FAIRSchema,
  ],
})
export class DigitalObjectTypeSchemasModule {}
