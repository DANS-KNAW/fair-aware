import { Test, TestingModule } from '@nestjs/testing';
import { DigitalObjectTypesService } from './digital-object-types.service';

describe('DigitalObjectTypesService', () => {
  let service: DigitalObjectTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DigitalObjectTypesService],
    }).compile();

    service = module.get<DigitalObjectTypesService>(DigitalObjectTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
