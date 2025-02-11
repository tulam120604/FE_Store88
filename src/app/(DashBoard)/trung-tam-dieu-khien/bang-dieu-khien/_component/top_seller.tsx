'use client'

import { CardContent, CardHeader, CardTitle } from '@/src/app/_Components/ui/Chart/card'
import { UserRoundCheck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function Top_seller({ dataProps }: any) {
    return (
        <div className='rounded-lg bg-white shadow-lg'>
            <CardHeader>
                <CardTitle className='text-base text-gray-700 tracking-[0.5]'>Top doanh thu đối tác</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                {
                    dataProps ? Array.isArray(dataProps) &&
                        dataProps?.map((item: any) => (
                            <div key={item?._id} className="flex items-center gap-4">
                                <div className="h-9 w-9 grid place-items-center border rounded-full">
                                    <UserRoundCheck stroke="#2563EB"/>
                                </div>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        {item?.user_name}
                                    </p>
                                    <p className="text-muted-foreground text-xs">
                                        {item?.email}
                                    </p>
                                </div>
                                <span className="ml-auto font-medium text-xs">+$1,999.00</span>
                            </div>
                        )) :
                        <span>Trống!</span>
                }
            </CardContent>
        </div>
    )
}
