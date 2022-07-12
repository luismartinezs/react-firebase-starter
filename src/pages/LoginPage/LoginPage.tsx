import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/userAuth/authHooks';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/services/firebase/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { signinWithGoogle } = useAuth();
  const [authUser] = useAuthState(auth);

  if (authUser) {
    return (
      <>
        <h1>Login page</h1>
        <p>You&apos;re already logged in</p>
      </>
    );
  }

  return (
    <>
      <h1>Login page</h1>
      <button onClick={() => signinWithGoogle(() => navigate('/'))}>Login with Google</button>
    </>
  );
};

export default LoginPage;
