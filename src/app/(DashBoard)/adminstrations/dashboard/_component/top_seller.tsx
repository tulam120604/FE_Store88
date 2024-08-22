'use client'

import { CardContent, CardHeader, CardTitle } from '@/src/app/_Components/ui/Chart/card'
import Image from 'next/image'
import React from 'react'

export default function Top_seller({ dataProps }: any) {
    return (
        <div className='rounded-lg border border-gray-300'>
            <CardHeader>
                <CardTitle className='text-base'>Top người bán</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                {
                    dataProps ? Array.isArray(dataProps) &&
                        dataProps?.map((item: any) => (
                            <div key={item?._id} className="flex items-center gap-4">
                                <div className="hidden h-9 w-9 sm:flex">
                                    <Image className='rounded-full' width={50} height={50} src="/Images/avatar.jpg" alt="Avatar" />
                                </div>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        {item?.user_name}
                                    </p>
                                    <p className="text-sm text-muted-foreground text-xs">
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
