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

  describe('create', () => {
    test.todo('Should create a new DOT successfully (http 201)');
    test.todo('Duplicate DOT code should not be allowed (http 409)');
    test.todo('Invalid DOT body should not be allowed (http 400)');
  });

  describe('findAll', () => {
    test.todo('Should return the first 10 DOTs (http 200)');
    test.todo(
      "Should return the next 10 DOTs when 'page' query param is set to 2 (http 200)",
    );
    test.todo(
      "Return the first page when an invalid 'page' query param is set (http 200)",
    );
    test.todo(
      'Should return an empty array if no DOTs are available (http 200)',
    );
  });

  describe('findOne', () => {
    test.todo(
      'Should return a DOT with the specified UUID if it exists (http 200)',
    );
    test.todo(
      'Should return a 404 error if the specified UUID does not exist (http 404)',
    );
    test.todo('Should throw an error if the UUID format is invalid (http 400)');
  });

  describe('findOneByCode', () => {
    test.todo('Should return a DOT with the specified code (http 200).');
    test.todo(
      'Should return a 404 error if the specified code does not exist (http 404)',
    );
    test.todo('Should throw an error if the code format is invalid (http 400)');
  });

  describe('update', () => {
    test.todo(
      'Should update the specified DOT with the new values provided (http 200)',
    );
    test.todo(
      'Should return a 404 error if the specified UUID does not exist (http 404)',
    );
    test.todo('Should throw an error if the UUID format is invalid (http 400)');
    test.todo(
      'Should return a 400 error if the new values are invalid (http 400)',
    );
    test.todo(
      'Should reject requests containing properties not listed in the update DTO (http 400)',
    );
  });

  describe('archive', () => {
    test.todo('Should archive the specified DOT (http 200)');
    test.todo(
      'Should return a 404 error if the specified UUID does not exist (http 404)',
    );
    test.todo('Should throw an error if the UUID format is invalid (http 400)');
    test.todo(
      'Should return an error if attempting to archive an already archived DOT (http 409)',
    );
  });

  describe('unarchive', () => {
    test.todo('Should unarchive the specified DOT (http 200)');
    test.todo(
      'Should return a 404 error if the specified UUID does not exist (http 404)',
    );
    test.todo('Should throw an error if the UUID format is invalid (http 400)');
    test.todo(
      'Should return an error if attempting to unarchive an already unarchived DOT (http 409)',
    );
  });
});
