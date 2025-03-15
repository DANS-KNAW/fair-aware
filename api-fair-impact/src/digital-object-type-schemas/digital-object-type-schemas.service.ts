import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DigitalObjectTypeSchemasService {
  private readonly logger = new Logger(DigitalObjectTypeSchemasService.name, {
    timestamp: true,
  });

  constructor() {}

  async create() {}

  async findAll() {}

  async findOne() {}

  async update() {}

  async remove() {}
}
