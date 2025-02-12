'use client'

import React from 'react'
import { Skeleton } from '../ui/Skeleton/skeleton'

const Loading_Skeleton = ({ number_elements }: any) => {
    return (
        <div className="flex gap-x-4 justify-between lg:gap-y-8 mb:gap-y-[29px] mb:pt-10 *:h-[200px] *:lg:h-[400px]">
            {
                Array.from({ length: number_elements }, (_, i: number) => (
                    <Skeleton key={i} className="relative group w-full shadow h-full bg-gray-200 overflow-hidden rounded grid place-items-center" />
                ))
            }
        </div>
    )
}

export default Loading_Skeleton
