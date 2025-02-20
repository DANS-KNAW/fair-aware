import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class SchemasService<
  TBaseSchema = object,
  TContentSchema = object,
> {
  /**
   * Get the base schema for the specific schema type
   */
  abstract getBaseSchema(dotCode: string): TBaseSchema;

  /**
   * Validate if the given schema matched the expected structure.
   */
  abstract validateSchema(schema: TBaseSchema): boolean;

  /**
   * Compare two schemas and return if they are equal.
   */
  abstract compareSchemas(): boolean;

  /**
   * Get the content schema based on the sturcture of the schema.
   */
  abstract getContentSchema(schemaStructure: TBaseSchema): TContentSchema;

  /**
   * Validate the content schema based on the structure of the schema.
   */
  abstract validateContentSchema(
    schema: TContentSchema,
    schemaStructure: TBaseSchema,
  ): boolean;
}
