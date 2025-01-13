import { Test, TestingModule } from '@nestjs/testing';
import { ContentLanguageModulesService } from './content-language-modules.service';

describe('ContentLanguageModulesService', () => {
  let service: ContentLanguageModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentLanguageModulesService],
    }).compile();

    service = module.get<ContentLanguageModulesService>(ContentLanguageModulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
