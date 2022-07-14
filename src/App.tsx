import React from 'react';

import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProvider } from 'react-query';

import Router from '@/Router';
import queryClient from '@/app/queryClient';
import FirebaseApp from '@/components/FirebaseApp';

function App() {
  return (
    <React.StrictMode>
      <FirebaseApp>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <MantineProvider
              theme={{
                colorScheme: 'dark',
              }}
            >
              <Router />
            </MantineProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </BrowserRouter>
        </QueryClientProvider>
      </FirebaseApp>
    </React.StrictMode>
  );
}

export default App;
