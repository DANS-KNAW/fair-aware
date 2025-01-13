import { Module } from '@nestjs/common';
import { ContentLanguageModulesService } from './content-language-modules.service';
import { ContentLanguageModulesController } from './content-language-modules.controller';

@Module({
  controllers: [ContentLanguageModulesController],
  providers: [ContentLanguageModulesService],
})
export class ContentLanguageModulesModule {}
