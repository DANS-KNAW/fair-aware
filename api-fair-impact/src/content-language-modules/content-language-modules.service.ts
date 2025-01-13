import { Injectable } from '@nestjs/common';
import { CreateContentLanguageModuleDto } from './dto/create-content-language-module.dto';
import { UpdateContentLanguageModuleDto } from './dto/update-content-language-module.dto';

@Injectable()
export class ContentLanguageModulesService {
  create(createContentLanguageModuleDto: CreateContentLanguageModuleDto) {
    return 'This action adds a new contentLanguageModule';
  }

  findAll() {
    return `This action returns all contentLanguageModules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contentLanguageModule`;
  }

  update(id: number, updateContentLanguageModuleDto: UpdateContentLanguageModuleDto) {
    return `This action updates a #${id} contentLanguageModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} contentLanguageModule`;
  }
}
