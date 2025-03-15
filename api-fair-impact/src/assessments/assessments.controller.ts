import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';

@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Post()
  create() {}

  @Get()
  findAll() {}

  @Get()
  findOne() {}

  @Patch()
  update() {}

  @Delete()
  archive() {}

  @Delete()
  unarchive() {}
}
