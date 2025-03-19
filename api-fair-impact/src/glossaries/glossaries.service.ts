import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Glossary } from './entities/glossary.entity';

@Injectable()
export class GlossariesService {
    private readonly logger = new Logger(GlossariesService.name, {
        timestamp: true,
    });

    constructor(
      @InjectRepository(Glossary)
      private readonly glossaryRepository: Repository<Glossary>
    ) {}

    async create(
        createGlossaryDto: Glossary,
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
            const glossary = await this.glossaryRepository.findOne({ where: { uuid } });
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

    /*
    private glossaries = [
        { id: 1, term: 'API', definition: 'Application Programming Interface' },
        { id: 2, term: 'HTTP', definition: 'Hypertext Transfer Protocol' },
        // Add more glossary terms here
    ];

    getGlossary() {
        return this.glossaries;
    }

    getGlossaryById(id: number) {
        return this.glossaries.find(glossary => glossary.id === id);
    }
    */
}