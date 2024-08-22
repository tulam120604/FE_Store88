'use client';

import Link from 'next/link';
import React from 'react'

const Breadcrum = ({ textProps }: any) => {
    return (
        <nav aria-label="Breadcrumb" className="flex whitespace-nowrap truncate">
            <ol className="flex overflow-hidden rounded-lg border-none text-gray-100">
                <li className="flex items-center">
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 bg-black rounded h-8 lg:px-4 px-1 transition hover:text-gray-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>

                        <span className="lg:mx-1.5 text-xs font-medium"> Trang chủ </span>
                    </Link>
                </li>

                <li className="relative flex items-center">
                    <span
                        className="absolute inset-y-1 -start-[2px] w-4 bg-black h-8 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"
                    >
                    </span>
                    {textProps && <div
                        className="flex gap-x-1 h-10 items-center cursor-default bg-none ps-5 text-xs font-medium transition text-gray-800 hover:text-gray-900"
                    >
                        {
                            textProps.name_category &&
                            <Link href={`/products/${textProps?.name_category?._id}`} >{textProps.name_category?.category_name}</Link>
                        }
                        /<span>{textProps.name_item}</span>
                    </div>}

                </li>
            </ol>
        </nav>
    )
}

export default Breadcrum