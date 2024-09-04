'use client';

import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import React, { Suspense } from 'react'
import { Auth_Wrap_Seller } from '../../_Auth_Wrap/Page';
import { Button } from '@/src/app/_Components/ui/Shadcn/button';

export default function page() {
  return (
    <Suspense fallback={<div className="w-screen h-screen fixed top-0 left-0 grid place-items-center"><Loading_Dots /></div>}>
      <Auth_Wrap_Seller>
        <div className='flex flex-col gap-y-6 py-6 h-full'>
          <strong className='text-xl'>Thuộc tính</strong>
          <section className='grid lg:grid-cols-[38%_auto] lg:gap-x-16'>
            {/* left */}
            <div>
              <span>Thêm mới thuộc tính</span>
              <p className='text-gray-800 opacity-60 text-sm my-4'>Các thuộc tính bổ sung cho phép bạn xác định dữ liệu sản phẩm bổ sung. Bạn có thể sử dụng các thuộc tính đó
                trong thanh bên của cửa hàng bằng cách sử dụng các tiện ích điều hướng theo lớp.</p>
              <form>
                <label htmlFor="short_name">Tên :</label>
                <input type="text" id='short_name'
                  className='outline-none py-1.5 px-4 border border-gray-300 rounded w-full text-sm my-1' placeholder='Enter ...' />
                <p className='text-gray-800 opacity-60 text-sm'>Tên cho thuộc tính</p>
                <Button className='py-1.5 h-auto my-4 bg-indigo-600 hover:bg-indigo-800'>Thêm</Button>
              </form>
            </div>
            {/* right */}
            <div className='border rounded bg-white p-4'>
              <span>hello world</span>
            </div>
          </section>
        </div>
      </Auth_Wrap_Seller>
    </Suspense>
  )
}
