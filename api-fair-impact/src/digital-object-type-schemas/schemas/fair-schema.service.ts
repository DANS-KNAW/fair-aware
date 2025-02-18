import { Injectable } from '@nestjs/common';
import { SchemasService } from './schemas.service';
import { FairAwareSchema } from '../entities/fair-aware-schema.entity';

@Injectable()
export class FAIRSchema implements SchemasService<FairAwareSchema> {
  getBaseSchema(dotCode: string): FairAwareSchema {
    const schema = new FairAwareSchema();
    schema.dot = dotCode;
    schema.version = '1.0';
    schema.assessment = [];

    return schema;
  }
  validateSchema(schema: FairAwareSchema): boolean {
    throw new Error('Method not implemented.');
  }
  compareSchemas(): boolean {
    throw new Error('Method not implemented.');
  }

  getContentSchema(schemaStructure: FairAwareSchema): object {
    const assessment = schemaStructure.assessment.map((principle) => {
      return {
        principle: null,
        criteria: principle.criteria.map((criteria) => {
          return {
            criteria: null,
            question: null,
          };
        }),
      };
    });

    return {
      dot: schemaStructure.dot,
      language: null,
      languageCode: null,
      version: schemaStructure.version,
      schemaType: 'FAIR',
      supportEmail: schemaStructure.supportEmail,
      assessment,
    };
  }

  validateContentSchema(schema: object): boolean {
    throw new Error('Method not implemented.');
  }
}
