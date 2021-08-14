/* eslint-disable implicit-arrow-linebreak */
import redisClient from '../../../redis';

import type { RedisPayloadType } from './types';

const addTokenToRedis = (payload: RedisPayloadType): Promise<null | string> =>
  new Promise((resolve, reject) => {
    const { id, token } = payload;
    redisClient.set(`access-token:${id}`, token, (error, reply) => {
      if (error) {
        return reject(error);
      }

      return resolve(reply);
    });
  });

const getTokenFromRedis = (id: string): Promise<null | string> =>
  new Promise((resolve, reject) => {
    redisClient.get(`refresh-token:${id}`, (error, reply) => {
      if (error) {
        return reject(error);
      }

      return resolve(reply);
    });
  });

export default {
  addTokenToRedis,
  getTokenFromRedis,
};
