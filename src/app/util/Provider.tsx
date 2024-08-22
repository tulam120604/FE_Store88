'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from '../_Components/ui/toaster';


const queryClient = new QueryClient(
  //   {
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 5000,
  //       refetchInterval : 1000
  //     },
  //   },
  // }
);

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position='bottom-right' />
      <Toaster />
      {children}
    </QueryClientProvider>
  )
}

export default Provider