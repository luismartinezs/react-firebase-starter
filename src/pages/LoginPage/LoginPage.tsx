import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/userAuth/authHooks';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/services/firebase/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { signinWithGoogle } = useAuth();
  const [authUser] = useAuthState(auth);

  if (authUser) {
    return <div>You&apos;re already logged in</div>;
  }

  return <button onClick={() => signinWithGoogle(() => navigate('/'))}>Login with Google</button>;
};

export default LoginPage;
