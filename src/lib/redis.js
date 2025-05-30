// src/lib/redis.js
import Redis from 'ioredis';

export const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});