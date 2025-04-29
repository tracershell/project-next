import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ✅ 여기에 추가!
db.query('SELECT DATABASE()').then(([rows]) => {
  console.log('✅ 현재 연결된 데이터베이스:', rows);
}).catch((error) => {
  console.error('🚨 DB 확인 중 에러 발생:', error);
});
