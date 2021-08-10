import redis, { RedisError } from 'redis';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
});

redisClient.on('error', (error: RedisError) => {
  // eslint-disable-next-line no-console
  console.log(error);
});

export default redisClient;
