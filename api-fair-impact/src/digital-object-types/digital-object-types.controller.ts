import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.digitalObjectTypesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') uuid: string,
    @Body() updateDigitalObjectTypeDto: UpdateDigitalObjectTypeDto,
  ) {
    return this.digitalObjectTypesService.update(
      uuid,
      updateDigitalObjectTypeDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.digitalObjectTypesService.remove(+id);
  }
}
