import * as Redis from 'redis';

const redisClient = Redis.createClient({
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

export default redisClient;
