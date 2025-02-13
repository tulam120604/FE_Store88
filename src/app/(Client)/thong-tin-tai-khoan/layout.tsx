'use client';

import React, { Suspense, useEffect } from 'react';
import Side_bar from './side_bar';
import { io } from 'socket.io-client';
import { useToast } from '../../_Components/ui/use-toast';
import { ToastAction } from '../../_Components/ui/toast';
import Loading_Skeleton from '../../_Components/Loadings/Loading_Skeleton';

const Layout_Profile = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();

  useEffect(() => {
    const socket = io('http://localhost:8888');
    socket.on('res_status_item_order_to_user', (data) => {
      console.log(data)
      toast({
        title: "Thông báo!",
        description: data,
        className: 'border border-gray-800',
        action: (
          <ToastAction altText="Goto schedule to undo">Ok</ToastAction>
        ),
      })
    });
    return () => {
      socket.disconnect();
    }
  }, []);
  return (
    <div className='max-w-[1440px] mx-auto w-[95vw] lg:grid lg:grid-cols-[250px_auto] grid-cols-[50px_auto] gap-x-8 *:rounded pt-2 lg:pt-6'>
      <div className='hidden lg:block'>
        <Side_bar />
      </div>
      <Suspense fallback={<Loading_Skeleton number_elements={1} />}>
        <div className='lg:min-h-[70vh]'>
          {children}
        </div>
      </Suspense>
    </div >
  )
}

export default Layout_Profile