'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar({ user }) {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = async () => {
    await fetch('/api/auth?mode=logout', { method: 'POST' });
    router.push('/');
  };

  return (
    <nav style={{
      backgroundColor: 'white', height: '50px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ddd', justifyContent: 'space-between', padding: '0 24px'
    }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#066da5' }}>
        ARGUS US INC.
      </div>
      <div>
        {user ? (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            Welcome, <b style={{ color: '#00aaff' }}>{user.username}</b>! ({user.role})
            <button onClick={handleLogout} style={buttonStyle}>Log out</button>
            <button style={buttonStyle}>Register</button>
          </div>
        ) : (
          <button onClick={handleLogin} style={buttonStyle}>Log in</button>
        )}
      </div>
    </nav>
  );
}

const buttonStyle = {
  padding: '8px 16px',
  borderRadius: '4px',
  border: '1px solid #066da5',
  backgroundColor: 'white',
  color: '#066da5',
  fontWeight: 'bold',
  cursor: 'pointer',
};
