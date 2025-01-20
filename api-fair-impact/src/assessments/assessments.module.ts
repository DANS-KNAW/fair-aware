import { Module } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { AssessmentsController } from './assessments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assessment } from './entities/assessment.entity';
import { LanguagesModule } from 'src/languages/languages.module';
import { DigitalObjectTypesModule } from 'src/digital-object-types/digital-object-types.module';
import { DigitalObjectTypeSchemasModule } from 'src/digital-object-type-schemas/digital-object-type-schemas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assessment]),
    LanguagesModule,
    DigitalObjectTypesModule,
    DigitalObjectTypeSchemasModule,
  ],
  controllers: [AssessmentsController],
  providers: [AssessmentsService],
})
export class AssessmentsModule {}
