'use client'

import { useStoreStatusItemOrder } from '@/src/app/Zustand/Store';
import { Ambulance, FileCog, Gift, MessageCircleMore, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Page_infor_mobile({ data_user }: any) {
    const { setStatus } = useStoreStatusItemOrder();
    const router = useRouter();
    function handleRedirectPage(status: number, path: string) {
        setStatus(status)
        router.push(path);
    }
    return (
        <>
            {/* name account */}
            <div className='flex gap-4 text-gray-800 items-center'>
                <div className='rounded-full p-2 bg-slate-200 w-12 h-12 grid place-content-center'>
                    <UserRound size={30} fill='#0A68FF' color='' />
                </div>
                <div className='flex flex-col gap-2'>
                    <span>{data_user?.data?.user_name}</span>
                    <span className='text-xs bg-slate-100 rounded-lg py-0.5 text-center text-[#0A68FF]'>
                        {data_user?.data?.role === 'seller' ? 'Nhà phân phối' :
                            data_user?.data?.role === 'user' ? 'Thành viên' : 'Quản lý'}
                    </span>
                </div>
            </div>

            {/* menu item order */}
            <div className='mt-4 pt-4'>
                <div className='flex justify-between'>
                    <span className='text-sm'>Đơn mua</span>
                    <Link href={'/thong-tin-tai-khoan/don-hang'} className='text-xs text-gray-600'>Xem tất cả</Link>
                </div>

                <div className='flex justify-between mt-5 *:flex *:flex-col *:gap-1 text-[10px] text-gray-600 *:items-center *:relative'>
                    <button onClick={() => handleRedirectPage(1, '/thong-tin-tai-khoan/don-hang')}>
                        <FileCog />
                        <span>Chờ xác nhận</span>
                        <div className='absolute w-2 h-2 rounded-full bg-red-500 right-1/4 animate-ping' />
                        <div className='absolute w-2 h-2 rounded-full bg-red-500 right-1/4' />
                    </button>
                    <button onClick={() => handleRedirectPage(2, '/thong-tin-tai-khoan/don-hang')}>
                        <Gift />
                        <span>Chờ lấy hàng</span>
                        <div className='absolute w-2 h-2 rounded-full bg-red-500 right-1/4 animate-ping' />
                        <div className='absolute w-2 h-2 rounded-full bg-red-500 right-1/4' />
                    </button>
                    <button onClick={() => handleRedirectPage(4, '/thong-tin-tai-khoan/don-hang')}>
                        <Ambulance />
                        <span>Chờ giao hàng</span>
                        <div className='absolute w-2 h-2 rounded-full bg-red-500 right-1/4 animate-ping' />
                        <div className='absolute w-2 h-2 rounded-full bg-red-500 right-1/4' />
                    </button>
                    <button onClick={() => handleRedirectPage(5, '/thong-tin-tai-khoan/don-hang')}>
                        <MessageCircleMore />
                        <span>Đánh giá</span>
                        <div className='absolute w-2 h-2 rounded-full bg-red-500 right-1/4 animate-ping' />
                        <div className='absolute w-2 h-2 rounded-full bg-red-500 right-1/4' />
                    </button>
                </div>
            </div>
        </>
    )
}
