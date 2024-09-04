'use client';

import React from 'react'

export default function Het_hang({ dataProps }: any) {
  let quantity_item: number = 0;
  if (dataProps?.product_id?.attributes?.varriants) {
    const color = dataProps?.product_id?.attributes?.varriants?.find((data: any) => data?.color_item === dataProps?.color_item);
    const size = color?.size_item?.find((size: any) => (size?.name_size?.trim() ? size?.name_size : undefined) === dataProps?.size_attribute_item);
    if (dataProps?.size_attribute_item && dataProps?.size_attribute_item !== size?.name_size) {
      quantity_item = 0;
    }
    else {
      quantity_item = size?.stock_item;
    }
  }
  else {
    quantity_item = dataProps?.product_id?.stock
  }
  return (
    <>
      {
        (quantity_item < 1) &&
        <div className='absolute w-[92%] h-full bg-gradient-to-r from-[#262D3F] to-[#262D3F00] flex items-center text-gray-100 rounded z-[2]'>
          <span className='translate-x-full'>Hết hàng!</span>
        </div>
      }
    </>
  )
}