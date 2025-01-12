import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateDigitalObjectTypeDto } from './dto/create-digital-object-type.dto';
import { UpdateDigitalObjectTypeDto } from './dto/update-digital-object-type.dto';
import { Repository } from 'typeorm';
import { DigitalObjectType } from './entities/digital-object-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DigitalObjectTypesService {
  private readonly logger = new Logger(DigitalObjectTypesService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(DigitalObjectType)
    private readonly digitalObjectTypesRepository: Repository<DigitalObjectType>,
  ) {}

  async create(
    createDigitalObjectTypeDto: CreateDigitalObjectTypeDto,
  ): Promise<DigitalObjectType> {
    let digitalObjectType = this.digitalObjectTypesRepository.create(
      createDigitalObjectTypeDto,
    );

    try {
      digitalObjectType =
        await this.digitalObjectTypesRepository.save(digitalObjectType);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Failed create DOT!');
    }

    return digitalObjectType;
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
