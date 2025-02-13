'use client'

import { BellRing, CircleUser, Heart, House } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Header_mobile({ dataProps }: any) {
    const pathName = usePathname();
    return (
        <div className='w-[95vw] mx-auto flex justify-between *:flex *:items-center 
        *:flex-col *:gap-y-1 *:text-xs py-2'>
            <Link href={'/'} className={pathName === '/' ? 'text-sky-500' : 'text-gray-700'}>
                <House size={18} />
                <span>Trang chủ</span>
            </Link>

            <Link href={(dataProps?.account === 'Tài khoản') ? '/dang-nhap' : '/thong-tin-tai-khoan/san-pham-yeu-thich'} className={(pathName === '/thong-tin-tai-khoan/san-pham-yeu-thich') ?
                'text-sky-500' : 'text-gray-700'}>
                <Heart size={18} />
                <span>Yêu thích</span>
            </Link>

            <Link href={(dataProps?.account === 'Tài khoản') ? '/dang-nhap' : '/thong-tin-tai-khoan/thong-bao'} className={(pathName === '/thong-tin-tai-khoan/thong-bao') ?
                'text-sky-500' : 'text-gray-700'}>
                <BellRing size={18} />
                <span>Thông báo</span>
            </Link>

            <Link href={(dataProps?.account === 'Tài khoản') ? '/dang-nhap' : '/thong-tin-tai-khoan/thong-tin'} className={(pathName === '/thong-tin-tai-khoan/thong-tin') ?
                'text-sky-500' : 'text-gray-700'}>
                <CircleUser size={18} />
                <span>Tài khoản</span>
            </Link>
        </div>
    )
}
