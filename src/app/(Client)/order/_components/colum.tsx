"use client"

import Image from "next/image"
import Link from "next/link"
import React from 'react'

export default function Table_Cart({ dataProps }: any) {
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
                  item?.quantity_by_item > 0 ?
                    <div key={item._id} className="border-b border-gray-300 lg:grid lg:grid-cols-[100px_400px_120px_160px_180px] 
                                        flex flex-wrap gap-y-4 justify-between items-center py-4 -mt-10 lg:mt-0">
                      {/* 88 */}
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
                    :
                    <div key={item._id} className="border-y border-gray-300 grid lg:grid-cols-[100px_200px_160px_160px_180px] border-y relative 
                                            after:absolute after:w-[95%] after:h-full after:bg-gradient-to-r after:from-[#33333333] to-[#33333388] after:rounded after:z-[2] after:left-0">
                      {/* 88 */}
                      <span className='absolute text-red-500 font-bold top-0 z-[3] py-6 whitespace-nowrap bg-[#ffffff22] px-4'>Hết hàng!</span>
                      <Image width={50} height={50} className="relative bg-[#f2f2f2f2] p-2 z-[1] w-full h-full duration-300" src={item?.product_id?.feature_product} alt='loading...' />
                      {/* 88 */}
                      <div className="flex flex-col gap-y-2 md:text-base mb:text-xs max-w-[250px]">
                        <Link href={`/products/${item?.product_id?._id}`}>
                          <span className='line-clamp-1'>{item?.product_id?.short_name}</span>
                        </Link>
                        <div className='flex flex-col'>
                          {
                            item?.color_item && <span className='text-sm'>{item?.color_item}</span>
                          }
                          {
                            item?.size_attribute_item && <span className='text-sm'>RAM : {item?.size_attribute_item} GB</span>
                          }
                        </div>
                      </div>
                      {/* 88 */}
                      <span className="md:text-base mb:text-xs text-red-500">{item?.price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                      {/* 88 */}
                      <span className="md:text-base mb:text-xs text-red-500">{(item?.total_price_item)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
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