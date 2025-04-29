import { db } from '../../lib/db';
import bcrypt from 'bcryptjs';
import { sessionMiddleware } from '../../lib/session';
import { runMiddleware } from '../../lib/runMiddleware';

export default async function handler(req, res) {
  await runMiddleware(req, res, sessionMiddleware); // ✅ 세션 미들웨어 적용

  try {
    if (req.method === 'POST' && req.query.mode !== 'logout') {
      const { username, password } = req.body;
      console.log('👉 입력 받은 username:', username);

      const result = await db.query('SELECT * FROM users WHERE username = ?', [username]);
      const rows = result[0];
      const user = rows[0];

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // ✅ Redis 세션에 유저 저장
      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role,
      };
      req.session.save(() => {
        console.log('✅ 세션 저장 완료');
        res.status(200).json({ message: 'Login success' });
      });
    }

    // 로그아웃
    else if (req.method === 'POST' && req.query.mode === 'logout') {
      req.session.destroy(() => {
        console.log('✅ 로그아웃 완료');
        res.status(200).json({ message: 'Logout success' });
      });
    }

    else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('🚨 에러:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
