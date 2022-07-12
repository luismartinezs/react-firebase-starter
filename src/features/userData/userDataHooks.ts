import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/services/firebase/auth';
import userDataAPI from './userDataApi';
import queryKeys from '@/app/queryKeys';

export function useUserData() {
  const navigate = useNavigate();
  const [authUser, isAuthLoading, authError] = useAuthState(auth, {
    onUserChanged: async (user) => {
      if (!user) {
        console.log('Not logged in');
        // navigate('/login')
        return;
      }
    },
  });

  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
    error: userDataError,
  } = useQuery([queryKeys.userDataKey, authUser?.uid], async () => userDataAPI.getUserData(authUser?.uid as string), {
    enabled: !!authUser?.uid,
  });

  return {
    authUser,
    isAuthLoading,
    userData,
    isUserDataLoading,
    isUserDataError,
    userDataError,
    isLoading: isAuthLoading || isUserDataLoading,
    isError: !!authError || isUserDataError,
    error: authError || userDataError,
  };
}
