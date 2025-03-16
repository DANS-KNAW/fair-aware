import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateDigitalObjectTypeDto } from './dto/create-digital-object-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DigitalObjectType } from './entities/digital-object-type.entity';
import { Repository } from 'typeorm';
import { UpdateDigitalObjectTypeDto } from './dto/update-digital-object-type.dto';

@Injectable()
export class DigitalObjectTypesService {
  private readonly logger = new Logger(DigitalObjectTypesService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(DigitalObjectType)
    private readonly digitalObjectTypeRepository: Repository<DigitalObjectType>,
  ) {}

  /**
   * Creates a new Digital Object Type (DOT).
   *
   * @param createDigtialObjectTypeDto - The data to create the new DOT.
   * @returns The created Digital Object Type.
   */
  async create(
    createDigtialObjectTypeDto: CreateDigitalObjectTypeDto,
  ): Promise<DigitalObjectType> {
    try {
      let digitalObjectType = this.digitalObjectTypeRepository.create(
        createDigtialObjectTypeDto,
      );

      digitalObjectType =
        await this.digitalObjectTypeRepository.save(digitalObjectType);

      return digitalObjectType;
    } catch (error) {
      this.logger.error(error);
      // Check if the error is a unique constraint violation.
      if (error.code === '23505') {
        throw new ConflictException('DOT code already exists!');
      }
      throw new InternalServerErrorException('Failed create DOT!');
    }
  }

  /**
   * Retrieves all Digital Object Types (DOTs) with pagination support.
   * @param page - The page number for pagination.
   * @returns A list of Digital Object Types.
   */
  async findAll(page: number = 1): Promise<DigitalObjectType[]> {
    try {
      const skip = (Math.max(page, 1) - 1) * 10;
      const digitalObjectTypes = await this.digitalObjectTypeRepository.find({
        where: { deletedAt: null },
        skip,
        take: 10,
        order: { createdAt: 'DESC' },
      });
      return digitalObjectTypes;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        "Something went wrong trying to fetch DOT's",
      );
    }
  }

  /**
   * Finds a Digital Object Type (DOT) by its UUID.
   *
   * @param uuid - The UUID of the DOT to find.
   * @returns The found Digital Object Type.
   */
  async findOne(uuid: string): Promise<DigitalObjectType> {
    try {
      const digitalObjectType = await this.digitalObjectTypeRepository.findOne({
        where: { uuid },
      });

      if (!digitalObjectType) {
        throw new NotFoundException('Digital Object Type not found');
      }

      return digitalObjectType;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to fetch Digital Object Type',
      );
    }
  }

  /**
   * Finds a Digital Object Type (DOT) by its code.
   *
   * @param code - The code of the DOT to find.
   * @returns The found Digital Object Type.
   */
  async findOneByCode(code: string): Promise<DigitalObjectType> {
    try {
      const digitalObjectType = await this.digitalObjectTypeRepository.findOne({
        where: { code },
      });

      if (!digitalObjectType) {
        throw new NotFoundException('Digital Object Type not found');
      }

      return digitalObjectType;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to fetch Digital Object Type',
      );
    }
  }

  /**
   * Updates a Digital Object Type (DOT) in the repository.
   *
   * @param uuid - The UUID of the DOT to update.
   * @param updateDigitalObjectTypeDto - The data to update the DOT with.
   * @returns The updated Digital Object Type.
   */
  async update(
    uuid: string,
    updateDigitalObjectTypeDto: UpdateDigitalObjectTypeDto,
  ): Promise<DigitalObjectType> {
    try {
      // Preload checks if the entity already exists if not returns undefined.
      const digitalObjectType = await this.digitalObjectTypeRepository.preload({
        uuid,
        ...updateDigitalObjectTypeDto,
      });

      if (!digitalObjectType) {
        throw new NotFoundException('Digital Object Type not found');
      }

      await this.digitalObjectTypeRepository.save(digitalObjectType);
      return digitalObjectType;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to fetch Digital Object Type',
      );
    }
  }

  /**
   * Archives a Digital Object Type (DOT) by marking it as deleted.
   *
   * @param uuid - The UUID of the DOT to archive.
   * @returns The archived Digital Object Type.
   */
  async archive(uuid: string): Promise<DigitalObjectType> {
    try {
      let digitalObjectType = await this.findOne(uuid);

      if (digitalObjectType.deletedAt) {
        throw new ConflictException('Digital Object Type already archived');
      }

      // Sets the deletedAt column to the current date.
      digitalObjectType =
        await this.digitalObjectTypeRepository.softRemove(digitalObjectType);

      return digitalObjectType;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to archive Digital Object Type',
      );
    }
  }

  async unarchive() {}

  async remove() {}
}
