import { Injectable } from '@nestjs/common';
import { CreateDigitalObjectTypeSchemaDto } from './dto/create-digital-object-type-schema.dto';
import { UpdateDigitalObjectTypeSchemaDto } from './dto/update-digital-object-type-schema.dto';

@Injectable()
export class DigitalObjectTypeSchemasService {
  /**
   * @TODO Creating an DOT Schema should also create a Content language module for each language.
   */
  create(createDigitalObjectTypeSchemaDto: CreateDigitalObjectTypeSchemaDto) {
    return 'This action adds a new digitalObjectTypeSchema';
  }

  findAll() {
    return `This action returns all digitalObjectTypeSchemas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} digitalObjectTypeSchema`;
  }

  update(
    id: number,
    updateDigitalObjectTypeSchemaDto: UpdateDigitalObjectTypeSchemaDto,
  ) {
    return `This action updates a #${id} digitalObjectTypeSchema`;
  }

  remove(id: number) {
    return `This action removes a #${id} digitalObjectTypeSchema`;
  }
}
