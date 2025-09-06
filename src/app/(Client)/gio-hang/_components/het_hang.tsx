'use client';

import React from 'react'

export default function Het_hang({ dataProps }: any) {
  let quantity_item: number = 0;
  if (dataProps?.product_id?.variant?.variants) {
    const name_attribute = dataProps?.product_id?.variant?.variants?.find((data: any) => data?.attribute === dataProps?.name_varriant);
    const value : any  = name_attribute?.value_variants?.find((size: any) => (size?. name_variant?.trim() ? size?. name_variant : undefined) === dataProps?.value_varriant);
    if (dataProps?.value_variants && dataProps?.value_variants !== value?.name_variant) {
      quantity_item = 0;
    }
    else {
      quantity_item = value?.stock_variant;
    }
  }
  else {
    quantity_item = dataProps?.product_id?.stock
  }
  return (
    <>
      {
        (quantity_item < 1) &&
        <div className='absolute w-[92%] h-full bg-gradient-to-r from-[#262D3F] to-[#262D3F00] flex items-center text-gray-100 rounded-lg z-[2]'>
          <span className='translate-x-full'>Hết hàng!</span>
        </div>
      }
    </>
  )
}