import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';

@Controller('digital-object-types')
export class DigitalObjectTypesController {
  constructor() {}

  @Post()
  create() {}

  @Get()
  findAll() {}

  @Get()
  findOne() {}

  @Get()
  findOneByCode() {}

  @Patch()
  update() {}

  @Delete()
  archive() {}

  @Delete()
  unarchive() {}
}
