import { Outlet } from 'react-router-dom';

import NavMenu from '@/components/NavMenu';
import UserDataView from '@/features/UserDataView';
import RecaptchaMessage from '@/components/RecaptchaMessage';

const Layout: React.FC = (): JSX.Element => {
  return (
    <div>
      <NavMenu />
      <UserDataView />
      <Outlet />
      <RecaptchaMessage />
    </div>
  );
};

export default Layout;
