'use client';

import React, { useEffect } from 'react';
import Side_bar from './side_bar';
import { io } from 'socket.io-client';
import { useRouter } from 'next/navigation';
import { useToast } from '../../_Components/ui/use-toast';
import { ToastAction } from '../../_Components/ui/toast';
import { useCheck_user } from '../../_lib/Custome_Hooks/User';

const Layout_Profile = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const user = useCheck_user();

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
  }, [])

  const routing = useRouter();
  useEffect(() => {
      if (!user) {
        routing.push('/')
      }
  }, [routing, user])
  return (
    <div className='max-w-[1440px] mx-auto w-[95vw] grid lg:grid-cols-[250px_auto] grid-cols-[50px_auto] pt-4 *:rounded overflow-hidden'>
      <Side_bar />
      <div className='pb-10'>
        {children}
      </div>
    </div>
  )
}

export default Layout_Profile