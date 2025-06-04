import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Post()
  create(@Body() createAssessmentDto: CreateAssessmentDto) {
    return this.assessmentsService.create(createAssessmentDto);
  }

  @Get()
  @Unprotected()
  findAll() {
    return this.assessmentsService.findAll();
  }

  @Get(':uuid')
  @Unprotected()
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.assessmentsService.findOne(uuid);
  }

  @Patch(':uuid')
  update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateAssessmentDto: UpdateAssessmentDto,
  ) {
    return this.assessmentsService.update(uuid, updateAssessmentDto);
  }

  @Delete(':uuid')
  archive(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.assessmentsService.archive(uuid);
  }

  @Delete(':uuid/restore')
  unarchive(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.assessmentsService.unarchive(uuid);
  }
}
