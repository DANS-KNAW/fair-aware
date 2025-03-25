import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { GlossariesService } from "./glossaries.service";
import { CreateGlossaryDto } from "./dto/create-glossery.dto";

@Controller('glossaries')
export class GlossariesController {
    constructor(
    private readonly glossariesService: GlossariesService,
    ) {}

    @Post()
    create(
    @Body() createGlossaryDto: CreateGlossaryDto,   
    ) {
        return this.glossariesService.create(createGlossaryDto);
    }

    @Get()
    findAll() {
        return this.glossariesService.findAll();
    }

    @Get(':uuid')
    findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
        return this.glossariesService.findOne(uuid);
    }
}
