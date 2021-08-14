import redisClient from '../../../redis';

const removeTokenInRedis = (id: string): Promise<number> =>
  new Promise((resolve, reject) => {
    const tokens: string[] = [`access-token:${id}`, `refresh-token:${id}`];

    redisClient.del(tokens, (error, reply) => {
      if (error) {
        return reject(error);
      }

      return resolve(reply);
    });
  });

export default {
  removeTokenInRedis,
};
