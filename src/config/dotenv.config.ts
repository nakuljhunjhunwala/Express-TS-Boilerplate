import * as dotenv from 'dotenv';
import * as path from 'path';

const getEnvFileName = (): string => {
  const env = process.env.NODE_ENV || 'dev'; // Default to 'development'
  switch (env) {
    case 'prod':
      return '.env.prod';
    case 'stage':
      return '.env.stage';
    case 'dev':
    default:
      return '.env';
  }
};

export const getEnv = (key: string) => {
  const fileName = getEnvFileName();

  const envConfig = dotenv.config({
    path: path.join(process.cwd(), '/', fileName),
  });

  if (envConfig.parsed) {
    return envConfig.parsed[key] || process.env[key];
  } else {
    console.error(`Failed to load .env file: ${envConfig.error}`);
    return process.env[key];
  }
};
