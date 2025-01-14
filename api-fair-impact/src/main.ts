import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import commonConfig, { COMMON_CONFIG_KEY } from './config/common.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const configService = app.get(ConfigService);
  const commonConfigValue =
    configService.get<ConfigType<typeof commonConfig>>(COMMON_CONFIG_KEY);

  await app.listen(commonConfigValue.apiPort ?? 3000);
}
bootstrap();
