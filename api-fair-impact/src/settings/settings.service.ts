import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import e from 'express';

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  async create(createSettingDto: CreateSettingDto): Promise<Setting> {
    let setting = this.settingRepository.create({
      ...createSettingDto,
    });

    try {
      setting = await this.settingRepository.save(setting);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to create Setting!');
    }
    return setting;
  }

  async findAll(): Promise<Setting[]> {
    try {
      const settings = await this.settingRepository.find({
        select: {
          id: true,
          value: true,
        },
      });
      return settings;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to fetch Settings!');
    }
  }

  async findOne(id: string): Promise<Setting> {
    try {
      const setting = await this.settingRepository.findOneOrFail({
        where: { id },
        select: {
          id: true,
          value: true,
        },
      });
      return setting;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`Setting: ${id} not found!`);
      }
      this.logger.error(error);
      throw new InternalServerErrorException(
        `Failed to fetch Setting: ${id} !`,
      );
    }
  }

  async update(
    id: string,
    updateSettingDto: UpdateSettingDto,
  ): Promise<Setting> {
    try {
      const setting = await this.settingRepository.preload({
        id,
        ...updateSettingDto,
      });

      if (!setting) {
        throw new NotFoundException(`Setting: ${id} not found!`);
      }

      return this.settingRepository.save(setting);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(error);
      throw new InternalServerErrorException(
        `Failed to update setting: ${id}!`,
      );
    }
  }

  async remove(id: string): Promise<Setting> {
    try {
      const setting = await this.findOne(id);

      return this.settingRepository.remove(setting);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException(
        `Failed to remove setting: ${id} !`,
      );
    }
  }
}
