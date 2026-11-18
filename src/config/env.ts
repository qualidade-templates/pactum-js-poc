import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export interface AppConfig {
  readonly baseUrl: string;
}

export const env: AppConfig = {
  baseUrl: process.env.BASE_URL ?? 'https://serverest.dev',
};
