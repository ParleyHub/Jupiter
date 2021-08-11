/* eslint-disable @typescript-eslint/no-explicit-any */
import db from '../../../database/models';
import redisClient from '../../../redis';

import type { SignInDataType, RedisPayloadType } from './types';

const DB: any = db;
const { User } = DB;

const findUser = async (payload: SignInDataType): Promise<any> => {
  const { email } = payload;

  const isEmailExist = await User.findOne({
    where: { email },
  });

  return isEmailExist;
};

const saveTokenToRedis = (payload: RedisPayloadType): boolean => {
  const { id, token } = payload;
  const isTokenSet = redisClient.set(id, token);

  return isTokenSet;
};

export default {
  findUser,
  saveTokenToRedis,
};
