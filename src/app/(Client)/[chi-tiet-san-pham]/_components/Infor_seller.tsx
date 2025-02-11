import { infor_shop } from '@/src/app/_lib/Services/Services_Auth/Auth'
import { Store } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Infor_seller = async ({ dataProps }: any) => {
  const data = await infor_shop(dataProps);
  return (
    <div className='max-w-[1440px] py-4 lg:py-8 px-4 lg:px-10 flex items-center gap-x-8 my-6 bg-white rounded-lg'>
      <Image width={100} height={100} className='size-16 lg:size-20 rounded-[50%]' src={'/Images/avatar.jpg'} alt='Loading...'></Image>
      <div className='flex flex-col items-start gap-y-3'>
        <span className='text-base lg:text-lg'>{data?.data?.user_name}</span>
        <Link href={`/cua-hang-truc-tuyen?id=${dataProps}`} className='px-2 py-1 border border-[#0A68FF] text-[#0A68FF] rounded duration-200 hover:bg-gray-50 text-sm flex items-center gap-x-1'>
          <Store className='h-4 text-gray-700' color='#0A68FF' />
          Xem cửa hàng
        </Link>
      </div>
    </div>
  )
}

export default Infor_seller