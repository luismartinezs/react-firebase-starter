import React from 'react';

import { useHttpsCallable } from 'react-firebase-hooks/functions';

import { useUserData } from '@/features/userData/userDataHooks';
import { signInWithGoogle, logout } from '@/services/firebase/auth';
import { functions } from '@/services/firebase/functions';
import AuthContext from './authContext';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { userData, isLoading, isError, error } = useUserData();

  const signinWithGoogle = async (callback?: VoidFunction) => {
    await signInWithGoogle();
    callback && callback();
  };

  const _logout = async (callback?: VoidFunction) => {
    await logout();
    callback && callback();
  };

  const [deleteUser, pendingDeleteUser, errorDeleteUser] = useHttpsCallable(functions, 'deleteUser');

  const value = {
    userData,
    isLoading,
    isError,
    error,
    signinWithGoogle,
    logout: _logout,
    deleteUser,
    pendingDeleteUser,
    errorDeleteUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
