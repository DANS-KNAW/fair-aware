import { Injectable } from '@nestjs/common';
import { CreateDigitalObjectTypeDto } from './dto/create-digital-object-type.dto';
import { UpdateDigitalObjectTypeDto } from './dto/update-digital-object-type.dto';

@Injectable()
export class DigitalObjectTypesService {
  create(createDigitalObjectTypeDto: CreateDigitalObjectTypeDto) {
    return 'This action adds a new digitalObjectType';
  }

  findAll() {
    return `This action returns all digitalObjectTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} digitalObjectType`;
  }

  update(id: number, updateDigitalObjectTypeDto: UpdateDigitalObjectTypeDto) {
    return `This action updates a #${id} digitalObjectType`;
  }

  remove(id: number) {
    return `This action removes a #${id} digitalObjectType`;
  }
}
