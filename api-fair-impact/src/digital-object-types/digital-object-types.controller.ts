import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
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
    return this.digitalObjectTypesService.findOne(uuid);
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
}
