import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ContentLanguageModulesService {
  private readonly logger = new Logger(ContentLanguageModulesService.name, {
    timestamp: true,
  });

  constructor() {}

  async create() {}

  async findAll() {}

  async findByLanguageAndDot() {}

  async findOne() {}

  async update() {}

  async remove() {}
}
