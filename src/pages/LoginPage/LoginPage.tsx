import { useNavigate } from 'react-router-dom';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { useAuth } from '@/services/firebase';
import { userDataAPI } from '@/features/userData';

const LoginPage = () => {
  const navigate = useNavigate();
  const [signInWithGoogle] = useSignInWithGoogle(useAuth());
  const [authUser] = useAuthState(useAuth(), {
    onUserChanged: async (user) => {
      if (user) {
        await userDataAPI.initUserData(user);
      }
    },
  });

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
      <button onClick={() => signInWithGoogle()}>Login with Google</button>
    </>
  );
};

export default LoginPage;
