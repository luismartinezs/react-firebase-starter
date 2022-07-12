import { FC } from 'react';

import invariant from 'tiny-invariant';

import { useUserData, type IUserData } from '@/features/userData';
import { useAuth } from '@/features/userAuth';
import queryClient from '@/app/queryClient';

const AccountPage = () => {
  const { userData } = useUserData();

  // this is a way to let typescript know that userData is not null. If userData is null, it will throw an error. It's an unorthodox way to say "if we don't have user data here, something went very wrong and the code might be broken"
  invariant(userData, 'User data not available!');

  const { logout, deleteUser, pendingDeleteUser, errorDeleteUser } = useAuth();

  const handleDeleteUser = async () => {
    try {
      await deleteUser();
      handleLogout();
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    queryClient.removeQueries(); // delete all queries and cached data from cache
    logout();
  };

  return (
    <>
      <button onClick={() => handleLogout()}>Logout</button>
      <button onClick={() => handleDeleteUser()}>
        {pendingDeleteUser ? 'Deleting account...' : 'Delete my account'}
      </button>
      {errorDeleteUser && <div>Failed to delete user: {errorDeleteUser.message}</div>}
    </>
  );
};

export default AccountPage;
