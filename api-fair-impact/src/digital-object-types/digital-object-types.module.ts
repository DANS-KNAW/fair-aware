import { Module } from '@nestjs/common';
import { DigitalObjectTypesService } from './digital-object-types.service';
import { DigitalObjectTypesController } from './digital-object-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DigitalObjectType } from './entities/digital-object-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DigitalObjectType])],
  controllers: [DigitalObjectTypesController],
  providers: [DigitalObjectTypesService],
  exports: [DigitalObjectTypesService],
})
export class DigitalObjectTypesModule {}
