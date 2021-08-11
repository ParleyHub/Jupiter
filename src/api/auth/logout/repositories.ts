import redisClient from '../../../redis';

const removeTokenInRedis = (id: string): boolean => redisClient.del(id);

export default {
  removeTokenInRedis,
};
