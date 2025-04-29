import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
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

  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.digitalObjectTypeSchemasService.findOne(uuid);
  }

  @Patch(':uuid')
  update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateDigitalObjectTypeSchemaDto: UpdateDigitalObjectTypeSchemaDto,
  ) {
    return this.digitalObjectTypeSchemasService.update(
      uuid,
      updateDigitalObjectTypeSchemaDto,
    );
  }

  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.digitalObjectTypeSchemasService.remove(uuid);
  }
}
