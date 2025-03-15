import { Controller, Get, Post, Patch } from '@nestjs/common';
import { DigitalObjectTypeSchemasService } from './digital-object-type-schemas.service';

@Controller('digital-object-type-schemas')
export class DigitalObjectTypeSchemasController {
  constructor(
    private readonly digitalObjectTypeSchemasService: DigitalObjectTypeSchemasService,
  ) {}

  @Post()
  create() {}

  @Get()
  findAll() {}

  @Get()
  findOne() {}

  @Patch()
  update() {}
}
