// src/lib/session.js

import session from 'express-session';
import { redisClient } from './redis';
import { RedisStore } from 'connect-redis';  // ✅ {} import 필요

// ✅ RedisStore는 생성자 사용 방식
const store = new RedisStore({
  client: redisClient,
  prefix: 'sess:', // optional prefix
});

export const sessionMiddleware = session({
  store,
  name: 'sid',
  secret: process.env.SESSION_SECRET || 'super_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});
