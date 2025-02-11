'use client'

import { Infor_user } from '@/src/app/_lib/Query_APIs/Auth/Query_Auth';
import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import { useRouter } from 'next/navigation';
import React from 'react';


export function Auth_Provider({ children }: Readonly<{ children: React.ReactNode }>) {
  const role_user = ['admin_global', 'admin_local', 'seller'];
  const routing = useRouter();
  const { data: data_user, isLoading: loading_user } = Infor_user();
  if (!loading_user && data_user && !role_user.includes(data_user?.data?.role)) {
    routing.push('/');
    return;
  }
  return (<>
    {
      loading_user ?
        <div className='w-screen h-screen fixed top-0 left-0 grid place-items-center'>
          <div className='flex flex-col gap-y-3'>
            <Loading_Dots />
            <span className='text-gray-800'>Đang xác minh danh tính</span>
          </div>
        </div> :
        children
    }
  </>)
}
