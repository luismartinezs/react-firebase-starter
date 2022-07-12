import { useNavigate } from 'react-router-dom';

import { useAuth } from './authHooks';

function AuthStatus() {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();

  if (!userData) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {userData}!{' '}
      <button
        onClick={() => {
          logout(() => navigate('/login'));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

export default AuthStatus;
