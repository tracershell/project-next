// next.config.js
const nextConfig = {
  experimental: {
    appDir: false,
  },
  pageExtensions: ['js', 'jsx'],
  env: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
    SESSION_SECRET: process.env.SESSION_SECRET,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
  },
};

module.exports = nextConfig;
