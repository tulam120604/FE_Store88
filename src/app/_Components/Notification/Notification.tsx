'use client';

import { BellRing } from 'lucide-react';
import React from 'react'

export default function Notification_Component({dataProps} : any) {
  return (
    <div>
        <BellRing className='lg:w-5 w-4 text-lg '/>
              {
                dataProps?.data &&
                <span className="absolute lg:w-5 lg:h-5 w-4 rounded-[50%] text-white flex items-center justify-center -top-[20%] -right-1/4 bg-red-500 text-xs">{dataProps?.total_bell?.length}</span>
              }
              {
                dataProps?.data &&
                <span className="hidden whitespace-nowrap group-hover:block z-[10] fixed text-sm -translate-x-3/4 top-14 p-2 bg-[#111827] rounded">Bạn có {dataProps?.total_bell?.length} thông báo!</span>
              }
    </div>
  )
}
