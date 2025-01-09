import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  apiPort: parseInt(process.env.API_PORT, 10) || 3000,
}));
