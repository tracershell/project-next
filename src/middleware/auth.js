import redisClient from '@/lib/redis';

export async function isAuthenticated(req) {
  const sessionKey = req.cookies.sessionKey || req.headers.authorization;
  if (!sessionKey) return false;

  const sessionData = await redisClient.get(sessionKey);
  if (!sessionData) return false;

  return JSON.parse(sessionData);
}
