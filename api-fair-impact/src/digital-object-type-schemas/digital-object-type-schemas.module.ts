import { Module } from '@nestjs/common';
import { DigitalObjectTypeSchemasService } from './digital-object-type-schemas.service';
import { DigitalObjectTypeSchemasController } from './digital-object-type-schemas.controller';

@Module({
  controllers: [DigitalObjectTypeSchemasController],
  providers: [DigitalObjectTypeSchemasService],
})
export class DigitalObjectTypeSchemasModule {}
