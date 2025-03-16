import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DigitalObjectTypesService } from './digital-object-types.service';
import { CreateDigitalObjectTypeDto } from './dto/create-digital-object-type.dto';

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
  findAll(@Query('page', ParseIntPipe) page?: number) {
    return this.digitalObjectTypesService.findAll(page);
  }

  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.digitalObjectTypesService.findOne(uuid);
  }

  @Get(':code')
  findOneByCode(@Param('code') code: string) {
    return this.digitalObjectTypesService.findOneByCode(code);
  }

  @Patch(':uuid')
  update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateDigitalObjectTypeDto: CreateDigitalObjectTypeDto,
  ) {
    return this.digitalObjectTypesService.update(
      uuid,
      updateDigitalObjectTypeDto,
    );
  }

  @Delete('archive/:uuid')
  archive(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.digitalObjectTypesService.archive(uuid);
  }

  @Delete('unarchive/:uuid')
  unarchive(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.digitalObjectTypesService.unarchive(uuid);
  }
}
