/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';

import logoutRepositories from './repositories';

import type { ILogoutResponseType } from './types';

const logoutService = async (bearer: string): Promise<ILogoutResponseType> => {
  if (!bearer) {
    throw new Error('No token provided.');
  }

  const token = bearer.replace('Bearer ', '');

  const decoded: any = jwt.decode(token);

  if (!decoded.id) {
    throw new Error('Error happened.');
  }

  const isDelete = await logoutRepositories.removeTokenInRedis(decoded.id);

  if (!isDelete) {
    throw new Error('Error happened.');
  }

  return {
    message: 'Signed Out',
  };
};

export default logoutService;
