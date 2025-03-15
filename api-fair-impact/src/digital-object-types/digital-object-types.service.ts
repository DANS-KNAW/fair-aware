import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DigitalObjectTypesService {
  private readonly logger = new Logger(DigitalObjectTypesService.name, {
    timestamp: true,
  });

  constructor() {}

  async create() {}

  async findAll() {}

  async findOneByCode() {}

  async findOne() {}

  async update() {}

  async archive() {}

  async unarchive() {}

  async remove() {}
}
