import redisClient from '../../../redis';

import type { RedisPayloadType } from './types';

const addTokenToRedis = (payload: RedisPayloadType): boolean => {
  const { id, token } = payload;
  return redisClient.set(`access-token:${id}`, token);
};

const getTokenFromRedis = (payload: RedisPayloadType) => {};

export default {
  addTokenToRedis,
  getTokenFromRedis,
};
