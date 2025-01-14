import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DATABASE_CONFIG_KEY = 'database';

export default registerAs(
  DATABASE_CONFIG_KEY,
  () =>
    ({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize:
        process.env.DATABASE_SYNCHRONIZE === 'true' &&
        process.env.NODE_ENV !== 'production',
    }) as TypeOrmModuleOptions,
);
