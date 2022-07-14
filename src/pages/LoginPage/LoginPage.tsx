import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import type { User } from 'firebase/auth';
import { Button, Loader, Title } from '@mantine/core';
import { BrandGoogle } from 'tabler-icons-react';

import { useAuth } from '@/services/firebase';
import { userDataAPI } from '@/features/userData';
import ErrorMessage from '@/components/ErrorMessage';

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
      <Title order={1}>Login page</Title>
      <div className="mt-4">{content}</div>
    </>
  );

  const loginButton = (
    <Button leftIcon={<BrandGoogle />} onClick={() => signInWithGoogle()} className="w-full lg:w-60">
      Login with Google
    </Button>
  );

  if (loading) {
    return pageWrapper(<Loader />);
  }

  if (error) {
    return pageWrapper(
      <>
        {loginButton}
        <ErrorMessage>Error: {error instanceof Error ? error.message : 'Auth problem'}</ErrorMessage>
      </>
    );
  }

  if (authUser) {
    return pageWrapper(<p className="prose-invert">You&apos;re already logged in</p>);
  }

  return pageWrapper(loginButton);
};

export default LoginPage;
