import pool from '@/lib/db';
import redisClient from '@/lib/redis';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { username, password } = req.body;

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ message: '사용자 없음' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: '비밀번호 불일치' });
    }

    await pool.execute('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);

    // ✅ Redis에 세션 저장
    const sessionKey = `sess:${user.id}`;
    await redisClient.set(sessionKey, JSON.stringify({
      id: user.id,
      username: user.username,
      role: user.role
    }), {
      EX: 60 * 30  // 30분 세션 유지
    });

    res.status(200).json({ message: 'Login success', sessionKey });
  } catch (error) {
    console.error('[로그인 에러]', error);
    return res.status(500).json({ message: '서버 에러' });
  }
}
