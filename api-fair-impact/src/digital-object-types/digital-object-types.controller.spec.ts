import { Test, TestingModule } from '@nestjs/testing';
import { DigitalObjectTypesController } from './digital-object-types.controller';
import { DigitalObjectTypesService } from './digital-object-types.service';

describe('DigitalObjectTypesController', () => {
  let controller: DigitalObjectTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DigitalObjectTypesController],
      providers: [DigitalObjectTypesService],
    }).compile();

    controller = module.get<DigitalObjectTypesController>(
      DigitalObjectTypesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
