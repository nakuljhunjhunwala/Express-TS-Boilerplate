import {
  accessTokenExpiry,
  jwtAccessSecret,
  jwtRefreshSecret,
  refreshTokenExpiry,
} from '@constants/env.constants.js';
import jwt from 'jsonwebtoken';

// Function to create a token
export function generateAccessToken(payload: object): string {
  return jwt.sign(payload, jwtAccessSecret!, { expiresIn: accessTokenExpiry });
}

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, jwtRefreshSecret!, {
    expiresIn: refreshTokenExpiry,
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, jwtAccessSecret!);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, jwtRefreshSecret!);
};
