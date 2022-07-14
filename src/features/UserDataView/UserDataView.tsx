import { FC } from 'react';

import { List, Loader, Title, Text } from '@mantine/core';
import { useUserData } from '@/features/userData';
import ErrorMessage from '@/components/ErrorMessage';

const UserDataView: FC = (): JSX.Element => {
  const { userData, isUserDataLoading, isUserDataError, userDataError } = useUserData();

  if (isUserDataLoading) {
    return <Loader />;
  }

  if (isUserDataError) {
    return (
      <ErrorMessage>
        Failed to load user data: {userDataError instanceof Error ? userDataError.message : 'unknown error'}
      </ErrorMessage>
    );
  }

  if (!userData) {
    return <Text>User data not available</Text>;
  }

  return (
    <>
      <Title order={3}>User data:</Title>
      <List className="list-none break-words mt-4 flex flex-col space-y-2">
        <List.Item>
          <span className="text-gray-500">Name: </span>
          <span>{userData.name}</span>
        </List.Item>
        <List.Item>
          <span className="text-gray-500">Email: </span>
          <span>{userData.email}</span>
        </List.Item>
        <List.Item>
          <span className="text-gray-500">Uid: </span>
          <span>{userData.uid}</span>
        </List.Item>
        <List.Item>
          <span className="text-gray-500">isAdmin: </span>
          <span>{String(userData.isAdmin)}</span>
        </List.Item>
        <List.Item>
          <span className="text-gray-500">authProvider: </span>
          <span>{userData.authProvider}</span>
        </List.Item>
      </List>
    </>
  );
};

export default UserDataView;
