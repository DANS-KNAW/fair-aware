import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Glossary } from './entities/glossary.entity';
import { CreateGlossaryDto } from './dto/create-glossery.dto';

@Injectable()
export class GlossariesService {
    private readonly logger = new Logger(GlossariesService.name, {
        timestamp: true,
    });

    constructor(
        @InjectRepository(Glossary)
        private readonly glossaryRepository: Repository<Glossary>
    ) { }

    async create(
        createGlossaryDto: CreateGlossaryDto,
    ): Promise<Glossary> {
        let glossary = this.glossaryRepository.create({
            ...createGlossaryDto,
        });

        try {
            glossary = await this.glossaryRepository.save(glossary);
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('Failed to create Glossary!');
        }
        return glossary;
    }

    async findAll(): Promise<Glossary[]> {
        try {
            const glossaries = await this.glossaryRepository.find();
            return glossaries;
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('Failed to find Glossaries!');
        }
    }

    async findOne(uuid: string): Promise<Glossary> {
        try {
            const glossary = await this.glossaryRepository.findOne({ where: { uuid }, relations: { items: true } });
            if (!glossary) {
                throw new NotFoundException(
                    `Glossary with uuid ${uuid} not found!`,
                );
            }
            return glossary;
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('Failed to find Glossary!');
        }
    }
}