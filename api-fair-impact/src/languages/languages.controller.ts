import { Controller, Get, Param } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { ParseISO639Pipe } from 'src/pipes/iso-639.pipe';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}
  @Get()
  findAll() {
    return this.languagesService.findAll();
  }

  @Get(':code')
  findOne(@Param('code', new ParseISO639Pipe()) code: string) {
    return this.languagesService.findOne(code);
  }
}
