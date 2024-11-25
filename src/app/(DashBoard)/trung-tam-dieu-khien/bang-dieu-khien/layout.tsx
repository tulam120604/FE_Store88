'use client';

import React, { Suspense } from 'react'
import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/src/app/_Components/ui/Shadcn/button';
import { Auth_Wrap_Seller } from '../_Auth_Wrapper/Page';

const Page = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();

  return (
    <Suspense fallback={<div className="w-screen h-screen fixed top-0 left-0 grid place-items-center"><Loading_Dots /></div>}>
      <Auth_Wrap_Seller>
        <div className='py-4'>
          <strong className='text-xl'>Bảng điều khiển</strong>
          <div className="w-[220px] bg-gray-200 p-1 flex justify-between rounded-lg *:py-1 *:h-auto *:bg-gray-200 
            *:text-gray-900 *:hover:!bg-white my-4 relative">
            <Button type='button' className={`${pathname === '/adminstrations/dashboard/overview' && '!bg-white'}`}>
              <Link href={'/adminstrations/dashboard/overview'}>Tổng quan</Link>
            </Button>
            <Button type='button' className={`${pathname === '/adminstrations/dashboard/notification' && '!bg-white'}`}>
              <Link href={'/adminstrations/dashboard/notification'}>Thông báo</Link>
              <div className='absolute w-2 h-2 top-0 right-0 -translate-x-1/2 translate-y-1/2 !bg-red-500 rounded-full'></div>
            </Button>
          </div>
          {children}
        </div>
      </Auth_Wrap_Seller>
    </Suspense>
  )
}

export default Page