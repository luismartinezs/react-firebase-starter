import { FC } from 'react';

import { useUserData } from '@/features/userData';

const UserDataView: FC = (): JSX.Element => {
  const { userData, isUserDataLoading, isUserDataError, userDataError } = useUserData();

  if (isUserDataLoading) {
    return <div>Loading user data...</div>;
  }

  if (isUserDataError) {
    return <div>Failed to load user data: {userDataError instanceof Error && userDataError.message}</div>;
  }

  if (!userData) {
    return <div>User data not available!</div>;
  }

  return (
    <>
      <div>User data:</div>
      <ul>
        <li>Name: {userData.name}</li>
        <li>Email: {userData.email}</li>
        <li>Uid: {userData.uid}</li>
        <li>isAdmin: {userData.isAdmin}</li>
        <li>authProvider: {userData.authProvider}</li>
      </ul>
    </>
  );
};

export default UserDataView;
