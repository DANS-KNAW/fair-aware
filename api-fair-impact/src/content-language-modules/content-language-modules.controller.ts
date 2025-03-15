import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { ContentLanguageModulesService } from './content-language-modules.service';

@Controller('content-language-modules')
export class ContentLanguageModulesController {
  constructor(
    private readonly contentLanguageModulesService: ContentLanguageModulesService,
  ) {}

  @Post()
  create() {}

  @Get()
  findAll() {}

  @Get()
  findOne() {}

  @Get()
  findByLanguageAndDot() {}

  @Patch()
  update() {}

  @Delete()
  remove() {}
}
