import { Injectable } from '@nestjs/common';
import { SchemasService } from './schemas.service';
import { FairAwareSchema } from '../entities/fair-aware-schema.entity';

@Injectable()
export class FAIRSchema implements SchemasService<FairAwareSchema> {
  getBaseSchema(): FairAwareSchema {
    throw new Error('Method not implemented.');
  }
  validateSchema(schema: FairAwareSchema): boolean {
    throw new Error('Method not implemented.');
  }
  compareSchemas(): boolean {
    throw new Error('Method not implemented.');
  }
  getContentSchema(schemaStructure: FairAwareSchema): object {
    throw new Error('Method not implemented.');
  }
  validateContentSchema(schema: object): boolean {
    throw new Error('Method not implemented.');
  }
}
