import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { GlossariesService } from './glossaries.service';
import { CreateGlossaryDto } from './dto/create-glossery.dto';
import { ParseISO639Pipe } from 'src/pipes/iso-639.pipe';

@Controller('glossaries')
export class GlossariesController {
  constructor(private readonly glossariesService: GlossariesService) {}

  @Post()
  create(@Body() createGlossaryDto: CreateGlossaryDto) {
    return this.glossariesService.create(createGlossaryDto);
  }

  @Get()
  findAll() {
    return this.glossariesService.findAll();
  }

  @Get('language/:language/dot/:dot')
  findByLanguageAndDot(
    @Param('language', new ParseISO639Pipe()) language: string,
    @Param('dot') dot: string,
  ) {
    return this.glossariesService.findByLanguageAndDot(language, dot);
  }

  @Delete('language/:language/dot/:dot')
  removeByLanguageAndDot(
    @Param('language', new ParseISO639Pipe()) language: string,
    @Param('dot') dot: string,
  ) {
    return this.glossariesService.removeByLanguageAndDot(language, dot);
  }

  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.glossariesService.findOne(uuid);
  }

  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.glossariesService.remove(uuid);
  }
}
