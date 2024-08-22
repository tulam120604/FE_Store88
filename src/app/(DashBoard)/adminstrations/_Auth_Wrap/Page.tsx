'use client'

import { useCheck_user, useToken } from '@/src/app/_lib/Custome_Hooks/User';
import { Check_token_expired } from '@/src/app/_lib/Tanstack_Query/Auth/Query_Auth';
import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import { useRouter } from 'next/navigation';
import React from 'react'


export function service_check_token(id_user?: string | number, access_token?: string) {
  const check_expired_token = Check_token_expired({
    id: id_user,
    accessToken: access_token
  });
  return check_expired_token
}

export function Auth_Wrap_Admins({ children }: Readonly<{ children: React.ReactNode }>) {
  const role_user = ['admin_global', 'admin_local'];
  const routing = useRouter();
  const user = useCheck_user();
  const token = useToken();
  const { data, isLoading, isError } = service_check_token(user?.check_email?._id, token?.accessToken);
  if (isLoading) {
    return <div className='w-screen h-screen fixed top-0 left-0 grid place-items-center'>
      <div className='flex flex-col gap-y-3'>
        <Loading_Dots />
        <span className='text-gray-900'>Đang xác minh danh tính</span>
      </div>
    </div>
  }
  if (!role_user.includes(data?.data?.role)) {
    routing.push('/')
  }
  return (<>{children}</>)
}


export function Auth_Wrap_Seller({ children }: Readonly<{ children: React.ReactNode }>) {
  const role_user = ['admin_global', 'admin_local', 'seller'];
  const routing = useRouter();
  const token = useToken();
  const user = useCheck_user();
  const { data, isLoading } = service_check_token(user?.check_email?._id, token?.accessToken);
  if (isLoading) {
    return <div className='w-screen h-screen fixed top-0 left-0 grid place-items-center'>
      <div className='flex flex-col gap-y-3'>
        <Loading_Dots />
        <span className='text-gray-100'>Đang xác minh danh tính</span>
      </div>
    </div>
  }
  if (!data?.data?.role || !role_user.includes(data?.data?.role)) {
    routing.push('/')
  }
  return (<>{children}</>)
}
