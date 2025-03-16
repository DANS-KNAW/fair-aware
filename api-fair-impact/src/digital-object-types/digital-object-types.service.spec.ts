import { Test, TestingModule } from '@nestjs/testing';
import { DigitalObjectTypesService } from './digital-object-types.service';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  DigitalObjectType,
  SchemaType,
} from './entities/digital-object-type.entity';
import { CreateDigitalObjectTypeDto } from './dto/create-digital-object-type.dto';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
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

      const expectedResult: DigitalObjectType = {
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

    it('Should handle duplicate DOT code', async () => {
      const createDto: CreateDigitalObjectTypeDto = {
        label: 'Test Digital Object',
        code: 'TEST',
        schemaType: SchemaType.FAIR,
      };

      // Use type assertion to add code property to Error
      const mockError = new Error('Duplicate key value') as Error & {
        code: string;
      };
      mockError.code = '23505'; // PostgreSQL unique constraint violation code

      repository.create.mockReturnValue({ ...createDto });
      repository.save.mockRejectedValue(mockError);

      try {
        await service.create(createDto);
        expect(false).toBeTruthy(); // we should never hit this line
      } catch (error) {
        expect(repository.create).toHaveBeenCalledWith(createDto);
        expect(repository.save).toHaveBeenCalled();
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toBe('DOT code already exists!');
      }
    });

    it('Should handle database errors gracefully', async () => {
      const createDto: CreateDigitalObjectTypeDto = {
        label: 'Test Digital Object',
        code: 'TEST',
        schemaType: SchemaType.FAIR,
      };

      const mockError = new Error('Database error');

      repository.create.mockReturnValue({ ...createDto });
      repository.save.mockRejectedValue(mockError);

      try {
        await service.create(createDto);
        expect(false).toBeTruthy(); // we should never hit this line
      } catch (error) {
        expect(repository.create).toHaveBeenCalledWith(createDto);
        expect(repository.save).toHaveBeenCalled();
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toBe('Failed create DOT!');
      }
    });
  });

  describe('findAll', () => {
    it('Should return the first page of DOTs when no parameters are provided', async () => {
      const allItems: DigitalObjectType[] = Array.from(
        { length: 25 },
        (_, index) => ({
          uuid: `123e4567-e89b-12d3-a456-42661417400${index}`,
          label: `Test Digital Object ${index}`,
          code: `TEST${index}`,
          schemaType: SchemaType.FAIR,
          updatedAt: new Date(),
          createdAt: new Date(),
          deletedAt: null,
          contentLanguageModules: [],
          digitalObjectTypeSchemas: [],
        }),
      );

      // Mock pagination and limit.
      repository.find.mockImplementation(({ take, skip }) => {
        return Promise.resolve(allItems.slice(skip, skip + take));
      });

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        where: { deletedAt: null },
        take: 10,
        skip: 0,
        order: { createdAt: 'DESC' },
      });
      expect(result.length).toBe(10);
      expect(result[0].code).toBe('TEST0'); // First item
      expect(result[result.length - 1].code).toBe('TEST9'); // Last item on first page
    });

    it('Should return the next 10 DOTs when the page query param is set to 2', async () => {
      const allItems: DigitalObjectType[] = Array.from(
        { length: 25 },
        (_, index) => ({
          uuid: `123e4567-e89b-12d3-a456-42661417400${index}`,
          label: `Test Digital Object ${index}`,
          code: `TEST${index}`,
          schemaType: SchemaType.FAIR,
          updatedAt: new Date(),
          createdAt: new Date(),
          deletedAt: null,
          contentLanguageModules: [],
          digitalObjectTypeSchemas: [],
        }),
      );

      // Mock pagination and limit.
      repository.find.mockImplementation(({ take, skip }) => {
        return Promise.resolve(allItems.slice(skip, skip + take));
      });

      const result = await service.findAll(2);

      expect(repository.find).toHaveBeenCalledWith({
        where: { deletedAt: null },
        take: 10,
        skip: 10,
        order: { createdAt: 'DESC' },
      });
      expect(result.length).toBe(10);
      expect(result[0].code).toBe('TEST10'); // First item on second page
      expect(result[result.length - 1].code).toBe('TEST19'); // Last item on second page
    });

    it('Should return an empty array if no DOTs are available', async () => {
      repository.find.mockResolvedValue([]);
      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        where: { deletedAt: null },
        take: 10,
        skip: 0,
        order: { createdAt: 'DESC' },
      });
      expect(result).toEqual([]);
    });

    it('Should return the first page when an invalid page query param is provided', async () => {
      const allItems: DigitalObjectType[] = Array.from(
        { length: 25 },
        (_, index) => ({
          uuid: `123e4567-e89b-12d3-a456-42661417400${index}`,
          label: `Test Digital Object ${index}`,
          code: `TEST${index}`,
          schemaType: SchemaType.FAIR,
          updatedAt: new Date(),
          createdAt: new Date(),
          deletedAt: null,
          contentLanguageModules: [],
          digitalObjectTypeSchemas: [],
        }),
      );

      // Mock pagination and limit.
      repository.find.mockImplementation(({ take, skip }) => {
        return Promise.resolve(allItems.slice(skip, skip + take));
      });

      const result = await service.findAll(-1);

      expect(repository.find).toHaveBeenCalledWith({
        where: { deletedAt: null },
        take: 10,
        skip: 0,
        order: { createdAt: 'DESC' },
      });

      expect(result.length).toBe(10);
      expect(result[0].code).toBe('TEST0'); // First item
      expect(result[result.length - 1].code).toBe('TEST9'); // Last item on first page
    });

    it('Should handle database errors gracefully', async () => {
      const mockError = new Error('Database error');
      repository.find.mockRejectedValue(mockError);

      try {
        await service.findAll();
        expect(false).toBeTruthy(); // we should never hit this line
      } catch (error) {
        expect(repository.find).toHaveBeenCalledWith({
          where: { deletedAt: null },
          take: 10,
          skip: 0,
          order: { createdAt: 'DESC' },
        });
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toBe(
          "Something went wrong trying to fetch DOT's",
        );
      }
    });

    it('Should hide DOTs that are archived', async () => {
      const allItems: DigitalObjectType[] = Array.from(
        { length: 2 },
        (_, index) => ({
          uuid: `123e4567-e89b-12d3-a456-42661417400${index}`,
          label: `Test Digital Object ${index}`,
          code: `TEST${index}`,
          schemaType: SchemaType.FAIR,
          updatedAt: new Date(),
          createdAt: new Date(),
          deletedAt: index === 0 ? new Date() : null,
          contentLanguageModules: [],
          digitalObjectTypeSchemas: [],
        }),
      );

      // Mock pagination and limit.
      repository.find.mockImplementation(({ take, skip }) => {
        return Promise.resolve(
          allItems
            .filter((item) => item.deletedAt === null)
            .slice(skip, skip + take),
        );
      });

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        where: { deletedAt: null },
        take: 10,
        skip: 0,
        order: { createdAt: 'DESC' },
      });
      expect(result.length).toBe(1);
    });
  });

  describe('findOne', () => {
    it('Should return a DOT with the specified UUID if it exists', async () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      const expectedResult: DigitalObjectType = {
        uuid,
        label: 'Test Digital Object',
        code: 'TEST',
        schemaType: SchemaType.FAIR,
        updatedAt: new Date(),
        createdAt: new Date(),
        deletedAt: null,
        contentLanguageModules: [],
        digitalObjectTypeSchemas: [],
      };

      repository.findOne.mockResolvedValue(expectedResult);

      const result = await service.findOne(uuid);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { uuid } });
      expect(result).toEqual(expectedResult);
    });

    it('Should return a 404 error if the specified UUID does not exist', async () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      repository.findOne.mockResolvedValue(null);

      try {
        await service.findOne(uuid);
        expect(false).toBeTruthy(); // we should never hit this line
      } catch (error) {
        expect(repository.findOne).toHaveBeenCalledWith({ where: { uuid } });
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Digital Object Type not found');
      }
    });

    it('Should handle database errors gracefully', async () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      const mockError = new Error('Database error');

      repository.findOne.mockRejectedValue(mockError);

      try {
        await service.findOne(uuid);
        expect(false).toBeTruthy(); // we should never hit this line
      } catch (error) {
        expect(repository.findOne).toHaveBeenCalledWith({ where: { uuid } });
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toBe('Failed to fetch Digital Object Type');
      }
    });
  });

  describe('findOneByCode', () => {
    it('Should return a DOT with the specified code if it exists', async () => {
      const code = 'TEST';
      const expectedResult: DigitalObjectType = {
        uuid: '123e4567-e89b-12d3-a456-426614174000',
        label: 'Test Digital Object',
        code,
        schemaType: SchemaType.FAIR,
        updatedAt: new Date(),
        createdAt: new Date(),
        deletedAt: null,
        contentLanguageModules: [],
        digitalObjectTypeSchemas: [],
      };

      repository.findOne.mockResolvedValue(expectedResult);

      const result = await service.findOneByCode(code);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { code } });
      expect(result).toEqual(expectedResult);
    });

    it('Should return a 404 error if the specified code does not exist', async () => {
      const code = 'TEST';
      repository.findOne.mockResolvedValue(null);

      try {
        await service.findOneByCode(code);
        expect(false).toBeTruthy(); // we should never hit this line
      } catch (error) {
        expect(repository.findOne).toHaveBeenCalledWith({ where: { code } });
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Digital Object Type not found');
      }
    });

    it('Should handle database errors gracefully', async () => {
      const code = 'TEST';
      const mockError = new Error('Database error');

      repository.findOne.mockRejectedValue(mockError);

      try {
        await service.findOneByCode(code);
        expect(false).toBeTruthy(); // we should never hit this line
      } catch (error) {
        expect(repository.findOne).toHaveBeenCalledWith({ where: { code } });
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toBe('Failed to fetch Digital Object Type');
      }
    });
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
