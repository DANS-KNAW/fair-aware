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
    schema.supportEmail = null;

    return schema;
  }

  validateSchema(schema: FairAwareSchema): boolean {
    if (
      typeof schema.dot !== 'string' ||
      typeof schema.version !== 'string' ||
      !Array.isArray(schema.assessment) ||
      (typeof schema.supportEmail !== 'string' && schema.supportEmail !== null)
    ) {
      return false;
    }

    for (const principle of schema.assessment) {
      if (!principle.criteria || !Array.isArray(principle.criteria)) {
        return false;
      }

      for (const criteria of principle.criteria) {
        if (
          typeof criteria.required !== 'boolean' ||
          typeof criteria.displayLikelihood !== 'boolean'
        ) {
          return false;
        }
      }
    }

    return true;
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
            support: {
              how: {
                title: null,
                text: null,
                links: [],
              },
              what: {
                title: null,
                text: null,
                links: [],
              },
              why: {
                title: null,
                text: null,
                links: [],
              },
              more: {
                title: null,
                text: null,
                links: [],
              },
            },
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
