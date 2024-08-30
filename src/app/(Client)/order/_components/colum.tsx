"use client"

import Image from "next/image"
import Link from "next/link"
import React from 'react'
import Het_hang from "../../(Cart)/cart/_components/het_hang"

export default function Table_item({ dataProps }: any) {
  return (
    <div>
      {/* header table*/}
      <div className='invisible lg:visible grid lg:grid-cols-[100px_400px_120px_160px_180px] justify-between h-10 border-b border-gray-500'>
        {/* 88 */}
        <span>Ảnh</span>
        {/* 88 */}
        <span></span>
        {/* 88 */}
        <span>Đơn giá</span>
        {/* 88 */}
        <span className="text-center">Số lượng</span>
        {/* 88 */}
        <span>Thành tiền</span>
      </div>
      {/* body table */}
      {
        (typeof dataProps == 'object') && (<>
          {(dataProps?.length > 0) ? (<>
            {
              dataProps?.map((item: any) => {
                return (
                    <div key={item._id} className="border-b border-gray-300 lg:grid lg:grid-cols-[100px_400px_120px_160px_180px] 
                                        flex flex-wrap gap-y-4 justify-between items-center py-4 -mt-10 lg:mt-0 relative">
                      {/* 88 */}
                      <Het_hang dataProps={item}/>
                      <Link href={`/${item?.product_id?._id}`}>
                        <Image width={50} height={50} className="relative bg-[#f2f2f2f2] p-2 z-[1] w-full h-full duration-300"
                          src={item?.product_id?.gallery[0]} alt='loading...' />
                      </Link>
                      {/* 88 */}
                      <div className="flex flex-col gap-y-2 md:text-base mb:text-xs w-[250px] lg:w-full">
                        <Link href={`/${item?.product_id?._id}`}>
                          <span className='line-clamp-2'>{item?.product_id?.short_name}</span>
                        </Link>
                        <div className='flex flex-col'>
                          <span className='text-sm'>{item?.color_item}</span>
                          <span className='text-sm'>{item?.size_attribute_item}</span>
                        </div>
                      </div>
                      {/* 88 */}
                      <span className="md:text-base mb:text-xs text-red-600">{item?.price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                      {/* 88 */}
                      <span className="text-center">{item?.quantity}</span>
                      {/* 88 */}
                      <span className="md:text-base mb:text-xs text-red-600">{(item?.total_price_item)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                )
              })
            }
          </>) :
            <div className='flex items-center whitespace-nowrap my-4'>Chưa có sản phẩm nào trong giỏ ! <Link className='underline' href={'/products'}>Mua ngay</Link></div>}
        </>)
      }
    </div>
  )
}