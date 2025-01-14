import * as Joi from 'joi';
import { commonValidationSchema } from './common.config';
import { databaseValidationSchema } from './database.config';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  ...commonValidationSchema,
  ...databaseValidationSchema,
});
