import redisClient from '../../../redis';

const removeTokenInRedis = (id: string): boolean => {
  const tokens: string[] = [`access-token:${id}`, `refresh-token:${id}`];

  return redisClient.del(tokens);
};

export default {
  removeTokenInRedis,
};
