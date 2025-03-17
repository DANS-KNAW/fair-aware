import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Post()
  create(@Body() createAssessmentDto: CreateAssessmentDto) {
    return this.assessmentsService.create(createAssessmentDto);
  }

  @Get()
  findAll(@Query('page', ParseIntPipe) page?: number) {
    return this.assessmentsService.findAll(page);
  }

  @Get(':uuid')
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
