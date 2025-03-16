import { Test, TestingModule } from '@nestjs/testing';
import { DigitalObjectTypesService } from './digital-object-types.service';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  DigitalObjectType,
  SchemaType,
} from './entities/digital-object-type.entity';
import { CreateDigitalObjectTypeDto } from './dto/create-digital-object-type.dto';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  create: jest.fn(),
  save: jest.fn(),
});

describe('DigitalObjectTypesService', () => {
  let service: DigitalObjectTypesService;
  let repository: MockRepository;
  let loggerSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DigitalObjectTypesService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(DigitalObjectType),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<DigitalObjectTypesService>(DigitalObjectTypesService);
    repository = module.get(getRepositoryToken(DigitalObjectType));
    loggerSpy = jest
      .spyOn(service['logger'], 'error')
      .mockImplementation(() => {});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Should create a new DOT successfully', async () => {
      const createDto: CreateDigitalObjectTypeDto = {
        label: 'Test Digital Object',
        code: 'TEST',
        schemaType: SchemaType.FAIR,
      };

      const expectedResult = {
        uuid: '123e4567-e89b-12d3-a456-426614174000',
        ...createDto,
        updatedAt: new Date(),
        createdAt: new Date(),
        deletedAt: null,
        contentLanguageModules: [],
        digitalObjectTypeSchemas: [],
      };

      repository.create.mockReturnValue(expectedResult);
      repository.save.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
    test.todo('Should handle duplicate DOT code');
    test.todo('Should handle database errors gracefully');
  });

  describe('findAll', () => {
    test.todo(
      'Should return the first 10 DOTs when no query params are provided',
    );
    test.todo(
      'Should return the next 10 DOTs when the page query param is set to 2',
    );
    test.todo(
      'Should return the first 10 DOTs when an invalid page query param is provided',
    );
    test.todo('Should return an empty array if no DOTs are available');
    test.todo(
      'Should properly handle cases when the database returns an error',
    );
  });

  describe('findOne', () => {
    test.todo('Should return a DOT with the specified UUID if it exists');
    test.todo('Should return a 404 error if the specified UUID does not exist');
    test.todo('Should handle database errors gracefully');
  });

  describe('findOneByCode', () => {
    test.todo('Should return a DOT with the specified code');
    test.todo('Should return a 404 error if the specified code does not exist');
    test.todo('Should handle database errors gracefully');
  });

  describe('update', () => {
    test.todo('Should update a DOT successfully');
    test.todo('Should handle database errors gracefully');
    test.todo('Should return a 404 error if the specified UUID does not exist');
    test.todo('Should handle database errors gracefully');
  });

  describe('archive', () => {
    test.todo('Should archive a DOT successfully');
    test.todo('Should handle database errors gracefully');
    test.todo('Should return a 404 error if the specified UUID does not exist');
    test.todo('Throw ConflictException if the DOT is already archived');
  });

  describe('unarchive', () => {
    test.todo('Should unarchive a DOT successfully');
    test.todo('Should handle database errors gracefully');
    test.todo('Should return a 404 error if the specified UUID does not exist');
    test.todo('Throw ConflictException if the DOT is not archived');
  });
});
