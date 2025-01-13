import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DigitalObjectTypeSchemasService } from './digital-object-type-schemas.service';
import { CreateDigitalObjectTypeSchemaDto } from './dto/create-digital-object-type-schema.dto';
import { UpdateDigitalObjectTypeSchemaDto } from './dto/update-digital-object-type-schema.dto';

@Controller('digital-object-type-schemas')
export class DigitalObjectTypeSchemasController {
  constructor(
    private readonly digitalObjectTypeSchemasService: DigitalObjectTypeSchemasService,
  ) {}

  @Post()
  create(
    @Body() createDigitalObjectTypeSchemaDto: CreateDigitalObjectTypeSchemaDto,
  ) {
    return this.digitalObjectTypeSchemasService.create(
      createDigitalObjectTypeSchemaDto,
    );
  }

  @Get()
  findAll() {
    return this.digitalObjectTypeSchemasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.digitalObjectTypeSchemasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDigitalObjectTypeSchemaDto: UpdateDigitalObjectTypeSchemaDto,
  ) {
    return this.digitalObjectTypeSchemasService.update(
      +id,
      updateDigitalObjectTypeSchemaDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.digitalObjectTypeSchemasService.remove(+id);
  }
}
