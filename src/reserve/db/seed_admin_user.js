const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config(); // .env 파일 읽기

async function seedAdminUser() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'project_next_db',
    port: process.env.DB_PORT,
  });

  const username = 'tracershell';
  const password = 'ts330069';
  const email = 'admin@example.com';
  const name = 'Admin User';
  const role = 'admin';
  const status = 'active';

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
      console.log('⚠️ 이미 tracershell 사용자가 존재합니다.');
    } else {
      await connection.execute(
        'INSERT INTO users (username, password, email, name, role, status) VALUES (?, ?, ?, ?, ?, ?)',
        [username, hashedPassword, email, name, role, status]
      );
      console.log('✅ tracershell admin 계정이 생성되었습니다.');
    }
  } catch (error) {
    console.error('❌ seed 실패:', error);
  } finally {
    await connection.end();
  }
}

seedAdminUser();
