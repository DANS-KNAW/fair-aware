import { Test, TestingModule } from '@nestjs/testing';
import { DigitalObjectTypeSchemasController } from './digital-object-type-schemas.controller';
import { DigitalObjectTypeSchemasService } from './digital-object-type-schemas.service';

describe('DigitalObjectTypeSchemasController', () => {
  let controller: DigitalObjectTypeSchemasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DigitalObjectTypeSchemasController],
      providers: [DigitalObjectTypeSchemasService],
    }).compile();

    controller = module.get<DigitalObjectTypeSchemasController>(
      DigitalObjectTypeSchemasController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
