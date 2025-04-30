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
import { DigitalObjectTypesService } from './digital-object-types.service';
import { CreateDigitalObjectTypeDto } from './dto/create-digital-object-type.dto';
import { UpdateDigitalObjectTypeDto } from './dto/update-digital-object-type.dto';

@Controller('digital-object-types')
export class DigitalObjectTypesController {
  constructor(
    private readonly digitalObjectTypesService: DigitalObjectTypesService,
  ) {}

  @Post()
  create(@Body() createDigitalObjectTypeDto: CreateDigitalObjectTypeDto) {
    return this.digitalObjectTypesService.create(createDigitalObjectTypeDto);
  }

  @Get()
  findAll() {
    return this.digitalObjectTypesService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.digitalObjectTypesService.findOne(uuid, true);
  }

  // @TODO ensure that code is valid?
  @Get('/code/:code')
  findOneByCode(@Param('code') code: string) {
    return this.digitalObjectTypesService.findOneByCode(code);
  }

  @Patch(':uuid')
  update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateDigitalObjectTypeDto: UpdateDigitalObjectTypeDto,
  ) {
    return this.digitalObjectTypesService.update(
      uuid,
      updateDigitalObjectTypeDto,
    );
  }

  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.digitalObjectTypesService.remove(uuid);
  }

  @Delete(':uuid/archive')
  archive(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.digitalObjectTypesService.archive(uuid);
  }

  @Delete(':uuid/restore')
  unarchive(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.digitalObjectTypesService.unarchive(uuid);
  }
}
