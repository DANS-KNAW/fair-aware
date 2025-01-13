import { Test, TestingModule } from '@nestjs/testing';
import { ContentLanguageModulesController } from './content-language-modules.controller';
import { ContentLanguageModulesService } from './content-language-modules.service';

describe('ContentLanguageModulesController', () => {
  let controller: ContentLanguageModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentLanguageModulesController],
      providers: [ContentLanguageModulesService],
    }).compile();

    controller = module.get<ContentLanguageModulesController>(
      ContentLanguageModulesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
