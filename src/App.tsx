import React from 'react';

import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProvider } from 'react-query';

import Router from '@/Router';
import queryClient from '@/app/queryClient';

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
