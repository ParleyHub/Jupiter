/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';

import logoutRepositories from './repositories';

const logoutService = (bearer: string): boolean => {
  if (!bearer) {
    throw new Error('No token provided.');
  }

  const token = bearer.replace('Bearer ', '');

  const decoded: any = jwt.decode(token);

  if (!decoded.id) {
    throw new Error('Error happened.');
  }

  return logoutRepositories.removeTokenInRedis(decoded.id);
};

export default logoutService;
