'use client';

import React, { Suspense } from 'react'
import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import { Auth_Wrap_Admins } from '../_Auth_Wrap/Page';
import { Tabs, TabsList, TabsTrigger } from '@/src/app/_Components/ui/tabs';
import Link from 'next/link';

const Page = ({children} : Readonly<{children : React.ReactNode}>) => {

  return (
    <Suspense fallback={<div className="w-screen h-screen fixed top-0 left-0 grid place-items-center"><Loading_Dots /></div>}>
      <Auth_Wrap_Admins>
        <div className='py-4'>
          <strong className='text-xl'>Bảng điều khiển</strong>
          <Tabs defaultValue='overview' className='mt-6'>
            <TabsList className="w-auto bg-gray-200">
              <TabsTrigger value="overview">
                <Link href={'/adminstrations/dashboard/overview'}>Tổng quan</Link>
              </TabsTrigger>
              <TabsTrigger value="notification">
              <Link href={'/adminstrations/dashboard/notification'}>Thông báo</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {children}
        </div>
      </Auth_Wrap_Admins>
    </Suspense>
  )
}

export default Page