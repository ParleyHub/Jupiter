/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';

import refreshTokenRepositories from './repositories';

const refreshTokenService = (refreshToken: string): boolean => {
  if (!refreshToken) {
    throw new Error('No token provided.');
  }

  const token = refreshToken.replace('Bearer ', '');

  return refreshTokenRepositories.addTokenToRedis({});
};

export default refreshTokenService;
