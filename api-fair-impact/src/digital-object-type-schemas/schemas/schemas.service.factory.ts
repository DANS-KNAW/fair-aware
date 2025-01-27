import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { FAIRSchema } from './fair-schema.service';

@Injectable()
export class SchemasServiceFactory {
  constructor(private readonly moduleRef: ModuleRef) {}

  get(type: 'FAIR') {
    switch (type) {
      case 'FAIR':
        return this.moduleRef.get(FAIRSchema);
      default:
        throw new InternalServerErrorException(
          `Schema type ${type} not supported`,
        );
    }
  }
}
