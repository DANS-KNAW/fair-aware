import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const COMMON_CONFIG_KEY = 'common';

export default registerAs(COMMON_CONFIG_KEY, () => ({
  apiPort: parseInt(process.env.API_PORT, 10) || 3000,
}));

export const commonValidationSchema = {
  API_PORT: Joi.number().port().default(3000),
};
