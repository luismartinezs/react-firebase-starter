import { FC } from 'react';

import { NavLink } from 'react-router-dom';
import { List, Text } from '@mantine/core';

const menuItems = [
  { path: '/', label: 'Home' },
  { path: '/login', label: 'Login' },
  { path: '/account', label: 'Account' },
  { path: '/data-entry', label: 'All entries' },
  { path: '/data-entry/new', label: 'Create entry' },
  { path: '/admin', label: 'Admin' },
];

const NavMenu: FC = (): JSX.Element => {
  return (
    <List className="list-none">
      {menuItems.map(({ path, label }) => (
        <List.Item key={path} className="pt-3">
          <NavLink to={path} className="no-underline">
            <Text variant="link">{label}</Text>
          </NavLink>
        </List.Item>
      ))}
    </List>
  );
};

export default NavMenu;
