import { FC } from 'react';

import invariant from 'tiny-invariant';

import { useUserData } from '@/features/userData';
import { useDeleteUser, useLogout } from '@/features/userAuth';

const AccountPage: FC = (): JSX.Element => {
  const { userData } = useUserData();

  // this is a way to let typescript know that userData is not null. If userData is null, it will throw an error. It's an unorthodox way to say "if we don't have user data here, something went very wrong and the code might be broken"
  invariant(userData, 'User data not available!');

  const { deleteUser, pendingDeleteUser, errorDeleteUser } = useDeleteUser();
  const { logout } = useLogout();

  return (
    <>
      <h1>Account page</h1>
      <button onClick={logout}>Logout</button>
      <button onClick={deleteUser}>{pendingDeleteUser ? 'Deleting account...' : 'Delete my account'}</button>
      {errorDeleteUser && <p>Failed to delete user: {errorDeleteUser.message}</p>}
    </>
  );
};

export default AccountPage;
