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

  validateContentSchema(
    contentSchema: any,
    schemaStructure: FairAwareSchema,
  ): boolean {
    if (typeof contentSchema !== 'object' || contentSchema === null) {
      return false;
    }

    // The schema structure also contains these properties so they should be equal.
    if (contentSchema.dot !== schemaStructure.dot) return false;
    if (contentSchema.version !== schemaStructure.version) return false;
    if (contentSchema.schemaType !== 'FAIR') return false;
    if (contentSchema.supportEmail !== schemaStructure.supportEmail)
      return false;

    // We want to validate that language and languageCode are valid ISO 639-1 codes.
    // @TODO: Implement language validation.
    // if (contentSchema.language !== schemaStructure.language) return false;
    // if (contentSchema.languageCode !== schemaStructure.languageCode) return false;

    // Check if the assessment array is the same length as the schemaStructure.
    if (
      !Array.isArray(contentSchema.assessment) ||
      contentSchema.assessment.length !== schemaStructure.assessment.length
    ) {
      return false;
    }

    for (let i = 0; i < contentSchema.assessment.length; i++) {
      const contentPrinciple = contentSchema.assessment[i];
      const basePrinciple = schemaStructure.assessment[i];

      if (typeof contentPrinciple.principle !== 'string') return false;

      // Check if the criteria array is the same length as the schemaStructure.
      if (
        !Array.isArray(contentPrinciple.criteria) ||
        contentPrinciple.criteria.length !== basePrinciple.criteria.length
      ) {
        return false;
      }

      for (let j = 0; j < contentPrinciple.criteria.length; j++) {
        const contentCriteria = contentPrinciple.criteria[j];

        // Check if the criteria object has the correct structure.
        if (
          !contentCriteria ||
          typeof contentCriteria !== 'object' ||
          typeof contentCriteria.criteria !== 'string' ||
          typeof contentCriteria.question !== 'string' ||
          typeof contentCriteria.support !== 'object'
        ) {
          return false;
        }

        const support = contentCriteria.support;
        const supportSections = ['how', 'what', 'why', 'more'];

        // Check if the support object has the correct structure.
        for (const section of supportSections) {
          if (!(section in support)) return false;
          const sectionContent = support[section];

          if (
            !sectionContent ||
            typeof sectionContent !== 'object' ||
            typeof sectionContent.title !== 'string' ||
            typeof sectionContent.text !== 'string' ||
            !Array.isArray(sectionContent.links)
          ) {
            return false;
          }
        }
      }
    }
    
    return true;
  }
}
