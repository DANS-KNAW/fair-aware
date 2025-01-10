import { Module } from '@nestjs/common';
import { DigitalObjectTypesService } from './digital-object-types.service';
import { DigitalObjectTypesController } from './digital-object-types.controller';

@Module({
  controllers: [DigitalObjectTypesController],
  providers: [DigitalObjectTypesService],
})
export class DigitalObjectTypesModule {}
