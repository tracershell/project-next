'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('sessionKey', data.sessionKey);  // ✅ 세션 저장
      router.push('/admin/a_dashboard');
    } else {
      alert('로그인 실패');
    }
  };

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
        <div style={{ maxWidth: '300px', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <img src="/images/logo_origami.png" alt="Logo" style={{ width: '80px', margin: 'auto' }} />
          <h2 style={{ textAlign: 'center' }}>Log in</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="User name" value={username} onChange={e => setUsername(e.target.value)} style={inputStyle} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} required />
            <button type="submit" style={submitButtonStyle}>Continue</button>
          </form>
          <div style={{ textAlign: 'center', margin: '1rem 0', color: '#888' }}>OR</div>
          <button style={cancelButtonStyle} onClick={() => router.push('/')}>Never mind !</button>
        </div>
      </div>
    </Layout>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '8px 0',
  border: '1px solid #ccc',
  borderRadius: '6px',
};

const submitButtonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const cancelButtonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#ddd',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
};
