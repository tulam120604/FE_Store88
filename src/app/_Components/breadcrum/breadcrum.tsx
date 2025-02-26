'use client';

import Link from 'next/link';
import React from 'react'

const Breadcrum = ({ textProps }: any) => {
    return (
        <nav aria-label="Breadcrumb" className="flex whitespace-nowrap truncate">
            <ol className="flex gap-x-1 overflow-hidden rounded-lg border-none text-gray-900">
                <li className="flex items-center">
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 rounded h-8 transition hover:text-[#5A7EF1]">
                        <span className="lg:mx-1.5 text-xs font-medium"> Trang chủ </span>
                    </Link>
                </li>

                <li className="relative flex items-center">
                    {textProps && <div
                        className="flex gap-x-1 h-10 items-center cursor-default bg-none text-xs font-medium transition 
                        text-gray-800 hover:text-gray-900">
                        {
                            textProps?.bread_1 &&
                            <Link href={`/products/${textProps?.bread_1?._id}`} >{'/ ' + textProps.bread_1}</Link>
                        }
                        <span>{textProps.bread_2 && ('/ ' + textProps?.bread_2)}</span>
                    </div>}
                </li>
            </ol>
        </nav>
    )
}

export default Breadcrum