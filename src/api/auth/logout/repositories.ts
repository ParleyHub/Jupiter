/* eslint-disable arrow-body-style */
/* eslint-disable implicit-arrow-linebreak */

import redisClient from '../../../redis';

const removeTokenInRedis = (id: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const tokens: string[] = [`access-token:${id}`, `refresh-token:${id}`];

    redisClient.del(tokens, (error, reply) => {
      if (error) {
        return reject(error);
      }

      return resolve(reply);
    });
  });
};

export default {
  removeTokenInRedis,
};
