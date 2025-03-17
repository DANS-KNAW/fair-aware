import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  ParseIntPipe,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ContentLanguageModulesService } from './content-language-modules.service';
import { CreateContentLanguageModuleDto } from './dto/create-content-language-module.dto';
import { ParseISO639Pipe } from 'src/pipes/iso-639.pipe';
import { UpdateContentLanguageModuleDto } from './dto/update-content-language-module.dto';

@Controller('content-language-modules')
export class ContentLanguageModulesController {
  constructor(
    private readonly contentLanguageModulesService: ContentLanguageModulesService,
  ) {}

  @Post()
  create(
    @Body() createContentLanguageModuleDto: CreateContentLanguageModuleDto,
  ) {
    return this.contentLanguageModulesService.create(
      createContentLanguageModuleDto,
    );
  }

  @Get()
  findAll(@Query('page', ParseIntPipe) page: number) {
    return this.contentLanguageModulesService.findAll(page);
  }

  @Get('uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.contentLanguageModulesService.findOne(uuid);
  }

  @Get('language/:language/dot/:dot')
  findByLanguageAndDot(
    @Param('language', new ParseISO639Pipe()) language: string,
    @Param('dot') dot: string,
  ) {
    return this.contentLanguageModulesService.findByLanguageAndDot(
      language,
      dot,
    );
  }

  @Patch(':uuid')
  update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateContentLanguageModuleDto: UpdateContentLanguageModuleDto,
  ) {
    return this.contentLanguageModulesService.update(
      uuid,
      updateContentLanguageModuleDto,
    );
  }

  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) id: string) {
    return this.contentLanguageModulesService.remove(id);
  }
}
