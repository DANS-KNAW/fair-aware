import { Module } from '@nestjs/common';
import { DigitalObjectTypeSchemasService } from './digital-object-type-schemas.service';
import { DigitalObjectTypeSchemasController } from './digital-object-type-schemas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DigitalObjectTypeSchema } from './entities/digital-object-type-schema.entity';
import { LanguagesModule } from 'src/languages/languages.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DigitalObjectTypeSchema]),
    LanguagesModule,
  ],
  controllers: [DigitalObjectTypeSchemasController],
  providers: [DigitalObjectTypeSchemasService],
})
export class DigitalObjectTypeSchemasModule {}
