'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Get_Items_Cart } from '@/src/app/_lib/Query_APIs/Cart/Query';
import { Search_Component_Client } from '../../Forms/search';
import { BadgeCheck, BadgeDollarSign, RefreshCcwDot, ShoppingBag, Tag, Truck, User } from 'lucide-react';
import { useStoreAddToCart } from '@/src/app/Zustand/Store';
import Header_mobile from './header_mobile';
import { Infor_user } from '@/src/app/_lib/Query_APIs/Auth/Query_Auth';

const Header = () => {
    const { isVisible } = useStoreAddToCart();
    const routing = useRouter();
    const pathName = usePathname();
    const { data, isLoading, isError } = Infor_user();

    // cart :
    function handleCart() {
        if (data?.data?.user_name) {
            routing.push('/gio-hang');
        }
        else {
            routing.push('/dang-nhap')
        }
    };

    console.count('re-render:');
    function back_to_home() {
        if (pathName === '/') {
            window.location.reload();
        } else {
            routing.push('/')
        }
    }
    function Count_Cart() {
        const { data, isLoading } = Get_Items_Cart();
        let quantity_item_in_cart;
        if (data?.items) {
            quantity_item_in_cart = data?.items?.filter((item: any) => (item?.product_id !== null) && item);
        }
        return (<>
            {!isLoading && (quantity_item_in_cart?.length > 0) &&
                (<span className="z-[1] absolute bg-[#5B7FFB] -top-1/2 -right-[60%] grid place-items-center rounded-[50%] w-5 h-5 text-xs text-white">
                    {quantity_item_in_cart?.length < 99 ? quantity_item_in_cart?.length : '99+'}</span>)}
        </>)
    }

    return (<>
        <header className="w-full z-[2000] duration-300 pt-5 pb-2 lg:bg-white bg-[#105EF3] sticky top-0 lg:relative overflow-hidden">
            {/* logo, search and cart */}
            <div className="relative mx-auto max-w-[1440px] w-[95vw] flex justify-between *:flex *:items-center lg:gap-x-20 gap-x-5 items-center 
            bg-white rounded-md p-3">
                {/* logo */}
                <button onClick={back_to_home} className='!hidden lg:!block'>
                    <Image width={200} height={100} className='w-[150px] max-h-10'
                        src={'https://res.cloudinary.com/tulam120604/image/upload/v1736088077/k3jhx9ywkmepcp9tz1b1.png'} alt='Store88' />
                </button>
                {/* logo mobile */}
                <div className='lg:hidden grid place-content-center z-[-1] -top-10 absolute overflow-hidden w-full'>
                    <span className='font-sans font-extrabold text-yellow-300 text-[50px]'>STORE88</span>
                </div>
                {/* search form */}
                <div className='lg:absolute lg:w-[60%] w-full lg:left-1/2 lg:-translate-x-1/2 z-[7]'>
                    <Search_Component_Client />
                </div>
                {
                    (!isLoading && !isError) &&
                    <div className="gap-x-2 flex items-center *:h-full">
                        {/* cart */}
                        <button onClick={handleCart} className={`flex gap-x-2 items-end relative group cursor-pointer p-2 py-2.5  
                            hover:bg-gray-100 rounded text-gray-600 hover:text-gray-950`}>
                            <div className='flex z-[1] relative rounded duration-200' >
                                <ShoppingBag className='w-5 h-5 ' />
                                <Count_Cart />
                                {/* animation add to cart */}
                                {
                                    isVisible &&
                                    <div className='animation_add_cart absolute w-4 h-4 lg:w-8 lg:h-8 rounded-full'>
                                        <Image width={40} height={40} className='rounded-full' src={isVisible} alt='.' />
                                    </div>
                                }
                            </div>
                            <span className='hidden lg:block text-sm translate-y-1'>Giỏ hàng</span>
                        </button>
                        <Link href={data?.data?.user_name ? '/thong-tin-tai-khoan/thong-tin' : '/dang-nhap'} className='!hidden 
                    lg:!flex items-end hover:bg-gray-100 rounded duration-200 py-2 px-3 cursor-pointer whitespace-nowrap text-gray-600 
                    hover:text-gray-950'>
                            <User />
                            <span className='text-sm translate-y-1'>{data?.data?.user_name ?
                                data?.data?.user_name : 'Đăng nhập'}</span>
                        </Link>
                    </div>
                }
            </div>
        </header>

        {/* about us */}
        <div className='border-y w-full'>
            <section className='hidden_scroll mx-auto max-w-[1440px] w-[95vw] overflow-x-auto *:whitespace-nowrap bg-white flex *:flex items-center *:items-center *:gap-x-1 *:text-xs py-3 *:cursor-default'>
                {/* 1 */}
                <div className='border-r-2 pr-5'>
                    <BadgeCheck className='w-5 h-5' fill='#0A68FF' color='#fff' />
                    <span>100% chất lượng</span>
                </div>

                {/* 2 */}
                <div className='border-r-2 px-5'>
                    <BadgeDollarSign className='w-5 h-5' fill='#0A68FF' color='#fff' />
                    <span>Hoàn tiền 100%</span>
                </div>

                {/* 3 */}
                <div className='border-r-2 px-5'>
                    <RefreshCcwDot className='w-5 h-5' color='#0A68FF' />
                    <span>30 ngày đổi trả</span>
                </div>

                {/* 4 */}
                <div className='border-r-2 px-5'>
                    <Tag className='w-5 h-5' fill='#0A68FF' color='#fff' />
                    <span>Giá siêu rẻ</span>
                </div>

                {/* 5 */}
                <div className='px-5'>
                    <Truck className='w-5 h-5' color='#0A68FF' />
                    <span>Giao hàng nhanh chóng</span>
                </div>
            </section>
        </div>
        <div className='fixed border-t bottom-0 lg:!hidden w-screen z-[2000]'>
            <Header_mobile dataProps={{ account: data?.data?.user_name }} />
        </div>
    </>
    )
};

export default Header;