import { Module } from '@nestjs/common';
import { ContentLanguageModulesService } from './content-language-modules.service';
import { ContentLanguageModulesController } from './content-language-modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentLanguageModule } from './entities/content-language-module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentLanguageModule])],
  controllers: [ContentLanguageModulesController],
  providers: [ContentLanguageModulesService],
  exports: [ContentLanguageModulesService],
})
export class ContentLanguageModulesModule {}
