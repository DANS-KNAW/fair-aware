import { Controller, Get, Param } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { ParseISO639Pipe } from 'src/pipes/iso-639.pipe';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}
  @Get()
  @Unprotected()
  findAll() {
    return this.languagesService.findAll();
  }

  @Get('enabled')
  @Unprotected()
  findEnabled() {
    return this.languagesService.findEnabled();
  }

  @Get(':code')
  @Unprotected()
  findOne(@Param('code', new ParseISO639Pipe()) code: string) {
    return this.languagesService.findOne(code);
  }
}
