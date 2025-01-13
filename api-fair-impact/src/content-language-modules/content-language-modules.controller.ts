import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContentLanguageModulesService } from './content-language-modules.service';
import { CreateContentLanguageModuleDto } from './dto/create-content-language-module.dto';
import { UpdateContentLanguageModuleDto } from './dto/update-content-language-module.dto';

@Controller('content-language-modules')
export class ContentLanguageModulesController {
  constructor(private readonly contentLanguageModulesService: ContentLanguageModulesService) {}

  @Post()
  create(@Body() createContentLanguageModuleDto: CreateContentLanguageModuleDto) {
    return this.contentLanguageModulesService.create(createContentLanguageModuleDto);
  }

  @Get()
  findAll() {
    return this.contentLanguageModulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentLanguageModulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentLanguageModuleDto: UpdateContentLanguageModuleDto) {
    return this.contentLanguageModulesService.update(+id, updateContentLanguageModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentLanguageModulesService.remove(+id);
  }
}
