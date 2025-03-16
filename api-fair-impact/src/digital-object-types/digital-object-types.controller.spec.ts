import { Test, TestingModule } from '@nestjs/testing';
import { DigitalObjectTypesController } from './digital-object-types.controller';
import { DigitalObjectTypesService } from './digital-object-types.service';
import { CreateDigitalObjectTypeDto } from './dto/create-digital-object-type.dto';
import {
  DigitalObjectType,
  SchemaType,
} from './entities/digital-object-type.entity';

type MockService = Partial<Record<keyof DigitalObjectTypesService, jest.Mock>>;
const createMockService = (): MockService => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  findOneByCode: jest.fn(),
  update: jest.fn(),
  archive: jest.fn(),
  unarchive: jest.fn(),
});

describe('DigitalObjectTypesController', () => {
  let controller: DigitalObjectTypesController;
  let service: MockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DigitalObjectTypesController],
      providers: [
        { provide: DigitalObjectTypesService, useValue: createMockService() },
      ],
    }).compile();

    controller = module.get<DigitalObjectTypesController>(
      DigitalObjectTypesController,
    );
    service = module.get(DigitalObjectTypesService) as MockService;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('Should create an new DOT', async () => {
      const createDto: CreateDigitalObjectTypeDto = {
        code: 'test',
        label: 'Test',
        schemaType: SchemaType.FAIR,
      };

      const digitalObjectType: DigitalObjectType = {
        uuid: '1',
        ...createDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        contentLanguageModules: [],
        digitalObjectTypeSchemas: [],
      };

      service.create.mockResolvedValue(digitalObjectType);

      const result = await controller.create(createDto);
      expect(result).toEqual(digitalObjectType);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('Should return DOTs', async () => {
      const digitalObjectTypes: DigitalObjectType[] = [
        {
          uuid: '1',
          code: 'test',
          label: 'Test',
          schemaType: SchemaType.FAIR,
          createdAt: new Date(),
          updatedAt: new Date(),
          contentLanguageModules: [],
          digitalObjectTypeSchemas: [],
        },
        {
          uuid: '2',
          code: 'test2',
          label: 'Test 2',
          schemaType: SchemaType.FAIR,
          createdAt: new Date(),
          updatedAt: new Date(),
          contentLanguageModules: [],
          digitalObjectTypeSchemas: [],
        },
      ];

      service.findAll.mockResolvedValue(digitalObjectTypes);

      const result = await controller.findAll();
      expect(result).toEqual(digitalObjectTypes);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('Should return a DOT with the specified UUID', async () => {
      const digitalObjectType: DigitalObjectType = {
        uuid: '1',
        code: 'test',
        label: 'Test',
        schemaType: SchemaType.FAIR,
        createdAt: new Date(),
        updatedAt: new Date(),
        contentLanguageModules: [],
        digitalObjectTypeSchemas: [],
      };

      service.findOne.mockResolvedValue(digitalObjectType);

      const result = await controller.findOne('1');
      expect(result).toEqual(digitalObjectType);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('findOneByCode', () => {
    it('Should return a DOT with the specified code', async () => {
      const digitalObjectType: DigitalObjectType = {
        uuid: '1',
        code: 'test',
        label: 'Test',
        schemaType: SchemaType.FAIR,
        createdAt: new Date(),
        updatedAt: new Date(),
        contentLanguageModules: [],
        digitalObjectTypeSchemas: [],
      };

      service.findOneByCode.mockResolvedValue(digitalObjectType);

      const result = await controller.findOneByCode('test');
      expect(result).toEqual(digitalObjectType);
      expect(service.findOneByCode).toHaveBeenCalledWith('test');
    });
  });

  describe('update', () => {
    it('Should update the specified DOT', async () => {
      const updateDto: CreateDigitalObjectTypeDto = {
        code: 'test',
        label: 'Test',
        schemaType: SchemaType.FAIR,
      };

      const digitalObjectType: DigitalObjectType = {
        uuid: '1',
        ...updateDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        contentLanguageModules: [],
        digitalObjectTypeSchemas: [],
      };

      service.update.mockResolvedValue(digitalObjectType);

      const result = await controller.update('1', updateDto);
      expect(result).toEqual(digitalObjectType);
      expect(service.update).toHaveBeenCalledWith('1', updateDto);
    });
  });

  describe('archive', () => {
    it('Should archive the specified DOT', async () => {
      const digitalObjectType: DigitalObjectType = {
        uuid: '1',
        code: 'test',
        label: 'Test',
        schemaType: SchemaType.FAIR,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
        contentLanguageModules: [],
        digitalObjectTypeSchemas: [],
      };

      service.archive.mockResolvedValue(digitalObjectType);

      const result = await controller.archive('1');
      expect(result).toEqual(digitalObjectType);
      expect(service.archive).toHaveBeenCalledWith('1');
    });
  });

  describe('unarchive', () => {
    it('Should unarchive the specified DOT', async () => {
      const digitalObjectType: DigitalObjectType = {
        uuid: '1',
        code: 'test',
        label: 'Test',
        schemaType: SchemaType.FAIR,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: undefined,
        contentLanguageModules: [],
        digitalObjectTypeSchemas: [],
      };

      service.unarchive.mockResolvedValue(digitalObjectType);

      const result = await controller.unarchive('1');
      expect(result).toEqual(digitalObjectType);
      expect(service.unarchive).toHaveBeenCalledWith('1');
    });
  });
});
