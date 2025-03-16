import { Test, TestingModule } from '@nestjs/testing';
import { SeedingService } from './seeding.service';
import { EntityManager } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Language } from '../languages/entities/language.entity';
import { DigitalObjectType } from '../digital-object-types/entities/digital-object-type.entity';

describe('SeedingService', () => {
  let service: SeedingService;

  // Mock of EntityManager
  const mockEntityManager = {
    // Add any methods that your service calls on EntityManager
  };

  // Mock repositories if needed
  const mockLanguageRepo = {};
  const mockDigitalObjectTypeRepo = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedingService,
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        },
        // If your service uses repositories directly:
        {
          provide: getRepositoryToken(Language),
          useValue: mockLanguageRepo,
        },
        {
          provide: getRepositoryToken(DigitalObjectType),
          useValue: mockDigitalObjectTypeRepo,
        },
      ],
    }).compile();

    service = module.get<SeedingService>(SeedingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
