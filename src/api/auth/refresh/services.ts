/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import auth from '../../../auth';
import refreshTokenRepositories from './repositories';

import type { RefreshTokenResponseType } from './types';

dotenv.config();

const refreshTokenService = (
  refreshToken: string
): Promise<RefreshTokenResponseType> => {
  return new Promise((resolve, reject) => {
    if (!refreshToken) {
      return reject(new Error('No token provided.'));
    }

    const token = refreshToken.replace('Bearer ', '');
    const secretKey: string = process.env.SECRET_KEY_REFRESH_TOKEN || '';

    return jwt.verify(token, secretKey, async (error): Promise<void> => {
      if (error) {
        return reject(new Error('Failed to authenticate.'));
      }

      const decoded: any = jwt.decode(token);
      const accessToken: string = auth.signToken({ id: decoded.id });

      if (process.env.NODE_ENV !== 'test') {
        const hasRefreshToken =
          await refreshTokenRepositories.getTokenFromRedis(decoded.id);

        if (!hasRefreshToken) {
          return reject(new Error('Failed to authenticate.'));
        }

        const hasToken = await refreshTokenRepositories.addTokenToRedis({
          id: decoded.id,
          token: accessToken,
        });

        if (hasToken !== 'OK') {
          return reject(new Error('Failed to authenticate.'));
        }
      }

      return resolve({
        'access-token': accessToken,
      });
    });
  });
};

export default refreshTokenService;
