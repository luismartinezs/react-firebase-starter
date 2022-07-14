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
          <Text className="text-gray-500">Name:</Text>
          <Text>{userData.name}</Text>
        </List.Item>
        <List.Item>
          <Text className="text-gray-500">Email:</Text>
          <Text>{userData.email}</Text>
        </List.Item>
        <List.Item>
          <Text className="text-gray-500">Uid:</Text>
          <Text>{userData.uid}</Text>
        </List.Item>
        <List.Item>
          <Text className="text-gray-500">isAdmin:</Text>
          <Text>{String(userData.isAdmin)}</Text>
        </List.Item>
        <List.Item>
          <Text className="text-gray-500">authProvider:</Text>
          <Text>{userData.authProvider}</Text>
        </List.Item>
      </List>
    </>
  );
};

export default UserDataView;
