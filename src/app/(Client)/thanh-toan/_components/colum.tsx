"use client"

import Image from "next/image"
import Link from "next/link"
import React from 'react'
import Het_hang from "../../gio-hang/_components/het_hang"
import { convert_Slug } from "@/src/app/util/Slug"
import { Store } from "lucide-react"

export default function Table_item({ dataProps }: any) {
  return (
    <div>
      {/* header table*/}
      <div className='hidden lg:block '>
        <div className='grid lg:grid-cols-[100px_500px_150px_160px_200px] justify-between bg-white p-4 rounded-lg'>
          {/* 88 */}
          <span>Sản phẩm</span>
          {/* 88 */}
          <span></span>
          {/* 88 */}
          <span>Đơn giá</span>
          {/* 88 */}
          <span>Số lượng</span>
          {/* 88 */}
          <span>Thành tiền</span>
        </div>
      </div>
      {/* body table */}
      {
        (typeof dataProps == 'object') && (<>
          {(dataProps.length > 0) && (<>
            {
              dataProps?.map((item: any) => {
                return (
                  <div className="lg:grid lg:grid-cols-[100px_500px_150px_160px_220px] lg:p-4 rounded-lg bg-white my-4 justify-between 
                                    items-center py-4 relative flex flex-wrap gap-4 px-4 lg:px-0" key={item._id}>
                    <Het_hang dataProps={item} />
                    {/* 88 */}
                    <Link href={`/${convert_Slug(item?.product_id?.short_name)}.html?p=${item?.product_id?._id}`}>
                      <Image width={150} height={150} className="relative bg-[#f2f2f2f2] z-[1] rounded w-20 h-20 lg:w-full lg:h-full duration-300"
                        src={item?.product_id?.gallery[0]} alt='loading...' />
                    </Link>
                    {/* 88 */}
                    <div className='w-[calc(100%-150px)] flex flex-col gap-y-2'>
                    <div className="flex flex-col gap-y-2 md:text-base mb:text-xs lg:w-[300px] w-[170px]">
                      <Link href={`/${convert_Slug(item?.product_id?.short_name)}.html?p=${item?.product_id?._id}`}>
                        <span className='line-clamp-2'>{item?.product_id?.short_name}</span>
                      </Link>
                    </div>
                    {/* 88 */}
                    <div className="flex flex-col gap-y-2 md:text-base mb:text-xs lg:w-[150px] w-full">
                      {
                        item?.name_varriant &&
                        <>
                        <span className='text-sm mb-1'>Phân loại :</span>
                        <div className='flex text-gray-700'>
                        <span className='text-xs'>{item?.name_varriant}</span>
                        {item?.value_varriant && ' - '}
                        <span className='text-xs'>{item?.value_varriant}</span>
                    </div>
                    </>}
                    </div>
                    </div>
                    {/* 88 */}
                    <span className="md:text-base mb:text-xs text-red-600">{item?.price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                    {/* 88 */}
                    <div className="w-[140px] *:text-gray-900 gap-x-1 *:md:text-base *:mb:text-xs px-1 rounded-lg *:font-medium">
                      <strong className="ml-8">x{item?.quantity}</strong>
                    </div>
                    {/* 88 */}
                    <span className="md:text-base mb:text-xs text-red-600">
                      {(item?.total_price_item)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                  </div>
                )
              })
            }
          </>)}
        </>)
      }
    </div>
  )
}