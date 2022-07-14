import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import type { User } from 'firebase/auth';
import { Button } from '@mantine/core';

import { useAuth } from '@/services/firebase';
import { userDataAPI } from '@/features/userData';

let prevUser: User | null = null;

const LoginPage = () => {
  const [signInWithGoogle] = useSignInWithGoogle(useAuth());
  const [authUser, loading, error] = useAuthState(useAuth(), {
    onUserChanged: async (user) => {
      if (user && prevUser !== user) {
        await userDataAPI.initUserData(user);
        prevUser = user;
      }
    },
  });

  const pageWrapper = (content: JSX.Element) => (
    <>
      <h1>Login page</h1>
      {content}
    </>
  );

  const loginButton = <Button onClick={() => signInWithGoogle()}>Login with Google</Button>;

  if (loading) {
    return pageWrapper(<p>Loading...</p>);
  }

  if (error) {
    return pageWrapper(
      <>
        {loginButton}
        <p>Error: {error instanceof Error ? error.message : 'Auth problem'}</p>
      </>
    );
  }

  if (authUser) {
    return pageWrapper(<p>You&apos;re already logged in</p>);
  }

  return pageWrapper(loginButton);
};

export default LoginPage;
