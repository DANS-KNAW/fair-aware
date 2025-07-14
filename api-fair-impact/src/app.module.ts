import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import commonConfig from './config/common.config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DigitalObjectTypesModule } from './digital-object-types/digital-object-types.module';
import { ContentLanguageModulesModule } from './content-language-modules/content-language-modules.module';
import { DigitalObjectTypeSchemasModule } from './digital-object-type-schemas/digital-object-type-schemas.module';
import { LanguagesModule } from './languages/languages.module';
import { SeedingModule } from './seeding/seeding.module';
import { validationSchema } from './config/validation-schema';
import { AssessmentsModule } from './assessments/assessments.module';
import { SettingsModule } from './settings/settings.module';
import { GlossariesModule } from './glossaries/glossaries.module';
import { KeyCloakConfigModule } from './auth/keycloak.module';
import { UserController } from './auth/user.controller';
import { GlobalKeyCloakGuard } from './auth/guards';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['../.env'],
      load: [commonConfig, databaseConfig],
      validationSchema,
    }),
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8090', // your Keycloak URL
      realm: 'FairAware',
      clientId: 'nest-app',
      secret: 'your-client-secret', // Only for confidential clients
      logLevels: ['warn'],
    }),
    TypeOrmModule.forRootAsync(databaseConfig.asProvider()),
    DigitalObjectTypesModule,
    ContentLanguageModulesModule,
    DigitalObjectTypeSchemasModule,
    LanguagesModule,
    SeedingModule,
    AssessmentsModule,
    SettingsModule,
    GlossariesModule,
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    UserController,
    // Optionally add global guards
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
