import { registerAs } from '@nestjs/config';

export const COMMON_CONFIG_KEY = 'common';

export default registerAs(COMMON_CONFIG_KEY, () => ({
  apiPort: parseInt(process.env.API_PORT, 10) || 3000,
}));
