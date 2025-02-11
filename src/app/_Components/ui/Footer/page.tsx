'use client';

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="w-full bg-white">
            <div className="relative pt-10 max-w-[1440px] md:w-[90vw] mb:w-[342px] mx-auto">
                {/* ***** */}
                <div className="flex lg:flex-row mb:flex-col lg:gap-x-16 lg:gap-y-0 gap-y-8 justify-between">
                    <div className="lg:w-[385px]">
                        <Link href={'/'}>
                            <Image width={150} height={100} className='w-[130px] max-h-8'
                                src={'https://res.cloudinary.com/tulam120604/image/upload/v1736088077/k3jhx9ywkmepcp9tz1b1.png'} alt='Store88' />
                        </Link>
                        <p className="text-gray-800 mt-1 font-normal lg:w-full w-[276px]">
                            Store88 - ứng dụng mua sắm trực tuyến thú vị, tin cậy, an toàn và miễn phí! Store88 là nền tảng giao dịch trực tuyến hàng đầu ở Đông Nam Á,
                            có trụ sở chính ở Việt Nam, đã có mặt ở khắp các khu vực Singapore, Malaysia, Indonesia, Thái Lan, Philippines, Đài Loan, Brazil, México,
                            Colombia, & Chile. Với sự đảm bảo của Store88, bạn sẽ mua hàng trực tuyến an tâm và nhanh chóng hơn bao giờ hết!
                        </p>
                    </div>
                    <div className="lg:pl-[77px]">
                        <div className="lg:mb-[27px] mb-[25px]">
                            <h2 className="text-lg tracking-[0.2px] uppercase translate-y-[2px] mb-[24px]">Về chúng tôi</h2>
                            <ul className="*:lg:mb-[13px] *:mb-[13.5px] gap-x-8">
                                <li>
                                    <Link href="" className="text-gray-800 text-sm">Track Your Order</Link>
                                </li>
                                <li>
                                    <Link href="" className="text-gray-800 text-sm">Shop All</Link>
                                </li>
                                <li>
                                    <Link href="" className="text-gray-800 text-sm">Flower</Link>
                                </li>
                                <li>
                                    <Link href="" className="text-gray-800 text-sm">Edibles</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-lg uppercase tracking-[0.3px] translate-y-[1px] mb-6">Liên hệ với chúng tôi qua</h2>
                            <ul>
                                <li>
                                    <Link href="" className="text-gray-800 text-sm">info@store88.cc</Link>
                                </li>
                                <li>
                                    <Link href="" className="text-gray-800 text-sm">tulam@store88.tulam</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mb:hidden lg:block ">
                        <h2 className="text-lg uppercase mb-[23px]">Thanh toán</h2>
                        <div className="flex gap-x-4 mt-[25px]">
                            <Image width={56} height={32} src="/Images/mastercard_v1.png" className='w-14 h-8' alt="" />
                            <Image width={56} height={32} src="/Images/mastercard_v2.png" className='w-14 h-8' alt="" />
                            <Image width={56} height={32} src="/Images/mastercard_v3.png" className='w-14 h-8' alt="" />
                            <Image width={56} height={32} src="/Images/mastercard_v4.png" className='w-14 h-8' alt="" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row items-center text-gray-800 lg:justify-between border-[#46494F] border-t pt-5 pb-8 mt-16">
                    <p className="order-2 lg:order-1 text-base">
                        © 2024 Store88 BC. All Rights Reserved.
                    </p>
                    <p className='order-2 lg:order-2'>by Tú Lâm</p>
                    <ul className="order-1 lg:order-2 flex items-center gap-x-8 -translate-y-[0.7px]">
                        <li><Link href="" className="text-gray-800 text-sm">Out Of Stock</Link></li>
                        <li><Link href="" className="text-gray-800 text-sm">Privacy Policy</Link></li>
                        <li><Link href="" className="text-gray-800 text-sm">Terms &amp; Conditions</Link></li>
                    </ul>
                </div>
            </div>
        </footer>

    )
}

export default Footer