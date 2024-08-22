'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='grid place-items-center translate-y-full'>
        <div className='flex flex-col items-center gap-y-6 my-auto'>
        <Image width={100} height={100} src='/Images/document_icon.png' alt=''></Image>
        <span className='flex items-center'>Chưa có sản phẩm yêu thích! <Link className='underline' href={'/shops'}>Tìm ngay</Link></span>
        </div>
    </div>
  )
}

export default page