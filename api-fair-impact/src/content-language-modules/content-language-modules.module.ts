import { forwardRef, Module } from '@nestjs/common';
import { ContentLanguageModulesService } from './content-language-modules.service';
import { ContentLanguageModulesController } from './content-language-modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentLanguageModule } from './entities/content-language-module.entity';
import { DigitalObjectTypeSchemasModule } from 'src/digital-object-type-schemas/digital-object-type-schemas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContentLanguageModule]),
    forwardRef(() => DigitalObjectTypeSchemasModule),
  ],
  controllers: [ContentLanguageModulesController],
  providers: [ContentLanguageModulesService],
  exports: [ContentLanguageModulesService],
})
export class ContentLanguageModulesModule {}
