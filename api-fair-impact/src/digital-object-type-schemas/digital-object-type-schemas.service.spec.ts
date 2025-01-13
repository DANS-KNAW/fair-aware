import { Test, TestingModule } from '@nestjs/testing';
import { DigitalObjectTypeSchemasService } from './digital-object-type-schemas.service';

describe('DigitalObjectTypeSchemasService', () => {
  let service: DigitalObjectTypeSchemasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DigitalObjectTypeSchemasService],
    }).compile();

    service = module.get<DigitalObjectTypeSchemasService>(
      DigitalObjectTypeSchemasService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
