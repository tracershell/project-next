import TopBar from './TopBar';
import Navbar from './Navbar';

export default function Layout({ children, user }) {
  return (
    <div>
      <TopBar />
      <Navbar user={user} />
      <main style={{ padding: '20px' }}>
        {children}
      </main>
    </div>
  );
}
