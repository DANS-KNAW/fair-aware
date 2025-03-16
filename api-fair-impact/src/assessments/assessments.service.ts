import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AssessmentsService {
  private readonly logger = new Logger(AssessmentsService.name, {
    timestamp: true,
  });

  constructor() {}

  async create() {}

  async findAll() {}

  async findOne() {}

  async update() {}

  async archive() {}

  async unarchive() {}
}
