'use client'

import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots'
import List_Products from '@/src/app/_Components/Products/List_Products'
import { useCheck_user } from '@/src/app/_lib/Custome_Hooks/User'
import { List_favorites } from '@/src/app/_lib/Tanstack_Query/Favorites/Query_Feedback'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Page_favorite = () => {
  const routing = useRouter();
  const user = useCheck_user();
  useEffect(() => {
    if (!user?.check_email?._id) {
      routing.push('/login')
    }
  }, [user, routing]);

  const { data, isLoading, isError } = List_favorites(user?.check_email?._id);
  return (
    <div className='ml-10'>
      {isError ? (<><div className='min-h-[70vh] grid place-items-center'>
        <div className='flex flex-col gap-y-2'>
          Ôi hỏng!
          <span>Có vẻ như đã có lỗi xảy ra :(( </span>
          <Link className='underline text-sky-500' href={'/'}>Trở về trang chủ!</Link>
        </div>
      </div></>) :
        (<>
          {
            isLoading ?
              <Loading_Dots /> :
              (data?.data?.docs < 1 || !data?.data?.docs) ?
                (<div className='grid place-items-center translate-y-full'>
                  <div className='flex flex-col items-center gap-y-6 my-auto'>
                    <Image width={100} height={100} src='/Images/document_icon.png' alt=''></Image>
                    <span className='flex items-center'>Chưa có sản phẩm yêu thích! <Link className='underline' href={'/products'}>Tìm ngay</Link></span>
                  </div>
                </div>)
                :
                <div className='*:lg:grid-cols-5'>
                  <div className='mb-5'>
                    <strong className='text-lg'>Sản phẩm yêu thích</strong>
                  </div>
                  <List_Products data={data?.data?.docs} />
                </div>
          }
        </>)}
    </div>
  )
}

export default Page_favorite