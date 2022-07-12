import type { FC, ReactElement, ReactNode } from 'react';

import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom';

import AuthContext, { type IAuthContext } from '@/features/userAuth/authContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: Infinity,
    },
  },
});

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});

export const defaultAuthContextValue: IAuthContext = {
  userData: {
    authProvider: 'google',
    email: 'lando.calrissian@example.com',
    isAdmin: false,
    name: 'Lando Calrissian',
    uid: '2fc5t2c3t354',
  },
  signinWithGoogle: async () => {},
  logout: async () => {},
  isLoading: false,
  isError: false,
  error: null,
  deleteUser: () => {},
  pendingDeleteUser: false,
  errorDeleteUser: false,
};

export const defaultRouterProps: MemoryRouterProps = {
  initialEntries: ['/'],
  initialIndex: 0,
};

const AllTheProviders: FC<{
  children: ReactNode;
  authContextValue?: IAuthContext;
  routerProps?: MemoryRouterProps;
}> = ({ children, authContextValue = defaultAuthContextValue, routerProps = defaultRouterProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter {...routerProps}>
        <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

export const AllTheProvidersDefault: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <AllTheProviders authContextValue={defaultAuthContextValue} routerProps={defaultRouterProps}>
      {children}
    </AllTheProviders>
  );
};

interface IProviderProps {
  authContextValue?: IAuthContext;
  routerProps?: MemoryRouterProps;
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'> & IProviderProps) => {
  const wrapperProps: IProviderProps = {};
  if (options?.authContextValue) {
    wrapperProps.authContextValue = options.authContextValue;
  }
  if (options?.routerProps) {
    wrapperProps.routerProps = options.routerProps;
  }
  return render(ui, {
    wrapper: AllTheProviders.bind(null, { children: ui, ...wrapperProps }),
    ...options,
  });
};

export * from '@testing-library/react';
export { customRender as render };
