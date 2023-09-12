import * as Redis from 'redis';

const client = Redis.createClient({
});

client.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

export default client;
