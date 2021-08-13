import redisClient from '../../../redis';

import type { RedisPayloadType } from './types';

const addTokenToRedis = (payload: RedisPayloadType): boolean => {
  const { id, token } = payload;
  return redisClient.set(id, token);
};

export default {
  addTokenToRedis,
};
