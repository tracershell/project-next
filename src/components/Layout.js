// app/components/AdminLayout.jsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
// import '@/styles/admin.css'; // 기존 EJS 스타일 옮긴 CSS

export default function AdminLayout({ user, children }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      alert('세션이 만료되어 로그아웃됩니다.');
      router.push('/logout');
    }, 15 * 60 * 1000);

    const warningTimer = setTimeout(() => {
      if (confirm('곧 자동 로그아웃됩니다.\n세션을 연장하시겠습니까?')) {
        clearTimeout(timer);
        clearTimeout(warningTimer);
      }
    }, 14 * 60 * 1000);

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

        {user && (
          <div className="menu">
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
                <Link href="/admin/document/document_manager">Doc Manager</Link>
              </div>
            </div>

            <div className="dropdown">
              <a>Employees</a>
              <div className="dropdown-content">
                <Link href="/admin/employees/employees_list/employees">Employees List</Link>
              </div>
            </div>
          </div>
        )}

        <div className="auth-buttons">
          {user ? (
            <>
              <span className="btn-welcome">
                Welcome, 👤 <span className="username-blue">{user.username}</span>! ({user.role})
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

      <main style={{ padding: '20px' }}>{children}</main>
    </>
  );
}
