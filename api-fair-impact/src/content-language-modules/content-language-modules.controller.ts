import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContentLanguageModulesService } from './content-language-modules.service';
import { CreateContentLanguageModuleDto } from './dto/create-content-language-module.dto';
import { UpdateContentLanguageModuleDto } from './dto/update-content-language-module.dto';
import { ParseISO639Pipe } from 'src/pipes/iso-639.pipe';
import { Unprotected } from 'nest-keycloak-connect';

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
  @Unprotected()
  findAll() {
    return this.contentLanguageModulesService.findAll();
  }

  @Get(':id')
  @Unprotected()
  findOne(@Param('id') id: string) {
    return this.contentLanguageModulesService.findOne(id);
  }

  @Get('language/:language/dot/:dot')
  @Unprotected()
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
    @Param('uuid') uuid: string,
    @Body() updateContentLanguageModuleDto: UpdateContentLanguageModuleDto,
  ) {
    return this.contentLanguageModulesService.update(
      uuid,
      updateContentLanguageModuleDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentLanguageModulesService.remove(id);
  }
}
