'use client';

import React, { Suspense } from 'react'
import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/src/app/_Components/ui/Shadcn/button';
import { Auth_Provider } from '../_Auth_Wrapper/Page';

const Page = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathName = usePathname();


  return (
    <Suspense fallback={<div className="w-screen h-screen fixed top-0 left-0 grid place-items-center"><Loading_Dots /></div>}>
      <Auth_Provider>
        <div className='py-4'>
          <strong className='text-xl'>Bảng điều khiển</strong>
          <div className="w-[220px] bg-white p-1 flex justify-between rounded-lg *:py-1 *:h-auto *:bg-white 
            *:text-gray-900 *:hover:!bg-[#E2EDFF] my-4 relative shadow-lg *:p-0">
            <Button type='button' className={`${pathName === '/trung-tam-dieu-khien/bang-dieu-khien/tong-quan' && '!bg-[#E2EDFF]'}`}>
              <Link className='px-4' href={'/trung-tam-dieu-khien/bang-dieu-khien/tong-quan'}>Tổng quan</Link>
            </Button>
            <Button type='button' className={`${pathName === '/trung-tam-dieu-khien/bang-dieu-khien/thong-bao' && '!bg-[#E2EDFF]'}`}>
              <Link className='px-4' href={'/trung-tam-dieu-khien/bang-dieu-khien/thong-bao'}>Thông báo</Link>
              <div className='absolute w-2 h-2 top-0 right-0 -translate-x-1/2 translate-y-1/2 !bg-red-500 rounded-full' />
            </Button>
          </div>
          {children}
        </div>
      </Auth_Provider>
    </Suspense>
  )
}

export default Page