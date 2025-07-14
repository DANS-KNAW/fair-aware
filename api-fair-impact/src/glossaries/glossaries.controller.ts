import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { GlossariesService } from './glossaries.service';
import { CreateGlossaryDto } from './dto/create-glossery.dto';
import { ParseISO639Pipe } from 'src/pipes/iso-639.pipe';
import { UpdateGlossaryDto } from './dto/update-glossary.dto';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('glossaries')
export class GlossariesController {
  constructor(private readonly glossariesService: GlossariesService) {}

  @Post()
  create(@Body() createGlossaryDto: CreateGlossaryDto) {
    return this.glossariesService.create(createGlossaryDto);
  }

  @Get()
  @Unprotected()
  findAll() {
    return this.glossariesService.findAll();
  }

  @Get('language/:language/dot/:dot')
  @Unprotected()
  findByLanguageAndDot(
    @Param('language', new ParseISO639Pipe()) language: string,
    @Param('dot') dot: string,
  ) {
    return this.glossariesService.findByLanguageAndDot(language, dot);
  }

  @Patch(':uuid')
  update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateGlossaryDto: UpdateGlossaryDto,
  ) {
    return this.glossariesService.update(uuid, updateGlossaryDto);
  }

  @Delete('language/:language/dot/:dot')
  removeByLanguageAndDot(
    @Param('language', new ParseISO639Pipe()) language: string,
    @Param('dot') dot: string,
  ) {
    return this.glossariesService.removeByLanguageAndDot(language, dot);
  }

  @Get(':uuid')
  @Unprotected()
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.glossariesService.findOne(uuid);
  }

  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.glossariesService.remove(uuid);
  }
}
