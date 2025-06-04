import {
  Resource,
  Roles,
  Scopes,
  Public,
  RoleMatchingMode,
  Unprotected,
} from 'nest-keycloak-connect';
import {
  Controller,
  Get,
  Delete,
  Put,
  Post,
  Param,
  UseGuards,
} from '@nestjs/common';
import { GlobalKeyCloakGuard } from './guards';

@Controller('auth')
export class UserController {
  //constructor(private readonly userService: UserService) { }

  @Get()
  @Unprotected()
  getpublic(): string {
    //return `${this.userService.getHello()} from public`;
    return 'Hello from public endpoint';
  }

  @Get('/user')
  @Roles({ roles: ['admin', 'other'] })
  getUser(): string {
    //return `${this.userService.getHello()} from user`;
    return 'Hello from user endpoint';
  }

  @Get('/admin')
  @Roles({ roles: ['admin', 'realm:sysadmin'], mode: RoleMatchingMode.ALL })
  getAdmin(): string {
    //return `${this.userService.getHello()} from admin`;
    return 'Hello from admin endpoint';
  }

  @Get('/all')
  @Roles({ roles: [], mode: RoleMatchingMode.ALL })
  getAll(): string {
    //return `${this.userService.getHello()} from all`;
    return 'Hello from all endpoint';
  }
}
