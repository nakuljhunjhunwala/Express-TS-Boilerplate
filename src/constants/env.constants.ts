import { getEnv } from '@config/dotenv.config.js';

export const port = getEnv('PORT');
export const dbHost = getEnv('DB_HOST');
export const dbName = getEnv('DB_NAME');
export const dbUser = getEnv('DB_USER');
export const dbPassword = getEnv('DB_PASSWORD');
export const jwtAccessSecret = getEnv('JWT_ACCESS_SECRET');
export const jwtRefreshSecret = getEnv('JWT_REFRESH_SECRET');
export const accessTokenExpiry = getEnv('ACCESS_TOKEN_EXPIRY');
export const refreshTokenExpiry = getEnv('REFRESH_TOKEN_EXPIRY');
export const debugInConsole = getEnv('DEBUG_CONSOLE');
