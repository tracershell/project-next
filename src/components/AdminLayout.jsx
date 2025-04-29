// src/components/AdminLayout.jsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ user, children }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      alert('세션이 만료되어 로그아웃됩니다.');
      router.push('/logout');
    }, 15 * 60 * 1000); // 15분

    const warningTimer = setTimeout(() => {
      if (confirm('곧 자동 로그아웃됩니다.\n세션을 연장하시겠습니까?')) {
        clearTimeout(timer);
        clearTimeout(warningTimer);
      }
    }, 14 * 60 * 1000); // 14분 경고

    return () => {
      clearTimeout(timer);
      clearTimeout(warningTimer);
    };
  }, [router]);

  return (
    <>
      <div className="top-bar">
        2055 E. 51st Street, Vernon, CA 90058 | <a href="#">Read More →</a>
      </div>

      <nav className="navbar">
        <div className="logo">ARGUS US INC.</div>

        <div className="menu">
          {user ? (
            <>
              <Link href="/admin/a_dashboard">Home</Link>
              <div className="dropdown">
                <a>Account</a>
                <div className="dropdown-content">
                  <Link href="/admin/account/petty_ledger">Petty Ledger</Link>
                </div>
              </div>
              <div className="dropdown">
                <a>General</a>
                <div className="dropdown-content">
                  <Link href="/admin/general/board/board">Board</Link>
                  <Link href="/admin/schedule/schedule_manager">Schedule</Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </div>

        <div className="auth-buttons">
          {user ? (
            <>
              <span className="btn-welcome">
                Welcome, 👤 <span className="username-blue">{user.username}</span> ({user.role})
              </span>
              <Link href="/logout" className="btn-signin">Log out</Link>
              <Link href="/register" className="btn-signin">Register</Link>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-signin">Log in</Link>
              <Link href="/register" className="btn-signin">Register</Link>
            </>
          )}
        </div>
      </nav>

      <main style={{ padding: '20px' }}>
        {children}
      </main>
    </>
  );
}
