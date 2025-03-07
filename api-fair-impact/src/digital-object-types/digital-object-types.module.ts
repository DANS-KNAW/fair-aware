import { forwardRef, Module } from '@nestjs/common';
import { DigitalObjectTypesService } from './digital-object-types.service';
import { DigitalObjectTypesController } from './digital-object-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DigitalObjectType } from './entities/digital-object-type.entity';
import { DigitalObjectTypeSchemasModule } from 'src/digital-object-type-schemas/digital-object-type-schemas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DigitalObjectType]),
    forwardRef(() => DigitalObjectTypeSchemasModule),
  ],
  controllers: [DigitalObjectTypesController],
  providers: [DigitalObjectTypesService],
  exports: [DigitalObjectTypesService],
})
export class DigitalObjectTypesModule {}
