import { Outlet } from 'react-router-dom';

import NavMenu from '@/components/NavMenu';
import UserDataView from '@/features/UserDataView';

const Layout: React.FC = (): JSX.Element => {
  return (
    <div>
      <NavMenu />
      <UserDataView />
      <Outlet />
    </div>
  );
};

export default Layout;
