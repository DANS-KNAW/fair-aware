import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateDigitalObjectTypeSchemaDto } from './dto/create-digital-object-type-schema.dto';
import { UpdateDigitalObjectTypeSchemaDto } from './dto/update-digital-object-type-schema.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DigitalObjectTypeSchema } from './entities/digital-object-type-schema.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DigitalObjectTypeSchemasService {
  private readonly logger = new Logger(DigitalObjectTypeSchemasService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(DigitalObjectTypeSchema)
    private readonly digitalObjectTypesSchemaRepository: Repository<DigitalObjectTypeSchema>,
  ) {}
  /**
   * @TODO Creating an DOT Schema should also create a Content language module for each language.
   */
  async create(
    createDigitalObjectTypeSchemaDto: CreateDigitalObjectTypeSchemaDto,
  ): Promise<DigitalObjectTypeSchema> {
    let digitalObjectTypeSchema =
      this.digitalObjectTypesSchemaRepository.create(
        createDigitalObjectTypeSchemaDto,
      );

    try {
      digitalObjectTypeSchema =
        await this.digitalObjectTypesSchemaRepository.save(
          digitalObjectTypeSchema,
        );
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to create DOT Schema!');
    }

    return digitalObjectTypeSchema;
  }

  async findAll(
    page: number = 1,
    amount: number = 20,
  ): Promise<DigitalObjectTypeSchema[]> {
    try {
      const skip = (page - 1) * amount;
      const digitalObjectTypeSchemas =
        await this.digitalObjectTypesSchemaRepository.find({
          skip,
          take: amount,
        });
      return digitalObjectTypeSchemas;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to find DOT Schemas!');
    }
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
