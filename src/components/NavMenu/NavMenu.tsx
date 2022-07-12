import { FC } from 'react';
import { NavLink } from 'react-router-dom';

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
    <ul>
      {menuItems.map(({ path, label }) => (
        <li key={path}>
          <NavLink to={path}>{label}</NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
