/* eslint-disable @typescript-eslint/no-explicit-any */
import db from '../../../database/models';
import redisClient from '../../../redis';

import type { SignUpDataType, RedisPayloadType } from './types';

const DB: any = db;
const { User } = DB;

const findUser = async (payload: SignUpDataType): Promise<any> => {
  const { email } = payload;

  const isEmailExist = await User.findOne({
    where: { email },
  });

  return isEmailExist;
};

const createUser = async (
  payload: Omit<SignUpDataType, 'confirmPassword'>
): Promise<any> => {
  const { email, name, password } = payload;

  const user = await User.create({
    email,
    name,
    password,
  });

  return user;
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
  createUser,
  saveTokenToRedis,
};
