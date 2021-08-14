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

const saveTokenToRedis = (payload: RedisPayloadType): Promise<string> =>
  new Promise((resolve, reject) => {
    const { id, token } = payload;

    redisClient.set(id, token, (error, reply) => {
      if (error) {
        return reject(error);
      }

      return resolve(reply);
    });
  });

export default {
  findUser,
  saveTokenToRedis,
};
