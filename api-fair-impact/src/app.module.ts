import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import commonConfig from './config/common.config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DigitalObjectTypesModule } from './digital-object-types/digital-object-types.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['../.env'],
      load: [commonConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync(databaseConfig.asProvider()),
    DigitalObjectTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
