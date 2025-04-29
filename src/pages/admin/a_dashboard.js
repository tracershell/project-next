import { sessionMiddleware } from '../../lib/session';
import { runMiddleware } from '../../lib/runMiddleware';

export async function getServerSideProps({ req, res }) {
  await runMiddleware(req, res, sessionMiddleware);

  const user = req.session.user;

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
}

export default function AdminDashboard({ user }) {
  return (
    <div>
      <h1>Welcome {user.username}</h1>
    </div>
  );
}
