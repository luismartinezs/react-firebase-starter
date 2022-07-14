import type { FC, ReactElement, ReactNode } from 'react';

import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom';
import ThemeProvider from '@/components/ThemeProvider';

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

export const defaultRouterProps: MemoryRouterProps = {
  initialEntries: ['/'],
  initialIndex: 0,
};

const AllTheProviders: FC<{
  children: ReactNode;
  routerProps?: MemoryRouterProps;
}> = ({ children, routerProps = defaultRouterProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter {...routerProps}>
        <ThemeProvider>{children}</ThemeProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

export const AllTheProvidersDefault: FC<{ children?: ReactNode }> = ({ children }) => {
  return <AllTheProviders routerProps={defaultRouterProps}>{children}</AllTheProviders>;
};

interface IProviderProps {
  routerProps?: MemoryRouterProps;
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'> & IProviderProps) => {
  const wrapperProps: IProviderProps = {};
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
