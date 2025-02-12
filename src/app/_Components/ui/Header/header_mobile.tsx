'use client'

import { CircleUser, House, LayoutGrid } from 'lucide-react'
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

            <Link href={'/'}>
                <LayoutGrid size={18} />
                <span>Danh mục</span>
            </Link>

            <Link href={(dataProps?.account === 'Tài khoản') ? '/dang-nhap' : '/thong-tin-tai-khoan/thong-tin'} className={(pathName.startsWith('/dang-nhap') || pathName.startsWith('/thong-tin-tai-khoan')) ?
                'text-sky-500' : 'text-gray-700'}>
                <CircleUser size={18} />
                <span>Tài khoản</span>
            </Link>
        </div>
    )
}
