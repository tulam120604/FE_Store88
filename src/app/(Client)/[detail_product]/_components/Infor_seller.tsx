import { infor_shop } from '@/src/app/_lib/Services/Services_Auth/Authen'
import { Store } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Infor_seller = async ({ dataProps }: any) => {
  const data = await infor_shop(dataProps);
  return (
    <div className='max-w-[1440px] py-4 lg:py-8 px-4 lg:px-10 flex items-center gap-x-8 my-6 bg-white'>
      <Image width={100} height={100} className='size-16 lg:size-20 rounded-[50%]' src={'/Images/avatar.jpg'} alt='Loading...'></Image>
      <div className='flex flex-col items-start gap-y-3'>
        <span className='text-base lg:text-lg'>{data?.data?.user_name}</span>
        <Link href={`/shops?id=${dataProps}`} className='px-4 py-1 border border-gray-300 rounded duration-200 hover:bg-gray-50 text-sm flex items-center gap-x-2'>
          <Store className='h-4 text-gray-700' />
          Xem shop
        </Link>
      </div>
    </div>
  )
}

export default Infor_seller