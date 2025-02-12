'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Get_Items_Cart } from '@/src/app/_lib/Query_APIs/Cart/query';
import { Search_Component_Client } from '../../Forms/search';
import { eventEmit } from './Event_emit';
import { BadgeCheck, BadgeDollarSign, CircleUser, RefreshCcwDot, ShoppingBag, Tag, Truck } from 'lucide-react';
import { useStoreAddToCart } from '@/src/app/Zustand/Store';
import { useLocalStorage } from '@/src/app/_lib/Custome_Hooks/UseStorage';
import Header_mobile from './header_mobile';

const Header = () => {
    const { isVisible } = useStoreAddToCart();
    const routing = useRouter();
    const pathName = usePathname();
    const [account, setAccount] = useState<string | undefined>('Tài khoản');
    const [data_localStorage] = useLocalStorage('account', undefined);

    useEffect(() => {
        if (data_localStorage) {
            setAccount(data_localStorage)
        }
    }, [data_localStorage]);

    // cart :
    function handleCart() {
        if (account === 'Tài khoản') {
            routing.push('/dang-nhap')
        }
        else {
            routing.push('/gio-hang');
        }
    };

    useEffect(() => {
        eventEmit.on('log_out', (status: boolean) => {
            status && setAccount('Tài khoản')
        })
    }, [])
    console.count('re-render:');
    // catch event f5 or reload page
    // if (window.onload) {
    //     setAccount(' ');
    // }

    function back_to_home() {
        if (pathName === '/') {
            window.location.reload();
        } else {
            routing.push('/')
        }
    }
    function Count_Cart() {
        const [data_storage, set_data_storage] = useState();
        useEffect(() => {
            if (localStorage.getItem('account')) {
                const storage_acc = JSON.parse(localStorage.getItem('account') || '{}');
                set_data_storage(storage_acc?.check_email?._id);
            }
        }, [data_storage])
        const { data, isLoading } = Get_Items_Cart();
        let new_arr;
        if (data?.items) {
            new_arr = data?.items?.filter((item: any) => (item?.product_id !== null) && item);
        }
        return (<>
            {isLoading && data?.items && (<span className="z-[1] absolute bg-red-500 -top-[40%] -right-1/2 grid place-items-center rounded-[50%] lg:w-5 lg:h-5 w-4 h-4 text-xs text-white">
                {new_arr?.length < 99 ? new_arr?.length : '99+'}</span>)}
        </>)
    }

    return (<>
        <header className="w-full z-[2000] duration-300 py-5 lg:bg-white bg-[#105EF3] sticky lg:top-0 -top-0.5 lg:relative">
            {/* logo, search and cart */}
            <div className="relative mx-auto max-w-[1440px] w-[95vw] flex justify-between *:flex *:items-center lg:gap-x-20 gap-x-5 items-center 
            bg-white rounded-md p-3">
                <button onClick={back_to_home} className='!hidden lg:!block'>
                    <Image width={200} height={100} className='w-[150px] max-h-10'
                        src={'https://res.cloudinary.com/tulam120604/image/upload/v1736088077/k3jhx9ywkmepcp9tz1b1.png'} alt='Store88' />
                </button>
                {/* search form */}
                <div className='lg:absolute lg:w-[60%] w-full lg:left-1/2 lg:-translate-x-1/2 z-[7]'>
                    <Search_Component_Client />
                </div>

                <div className="gap-x-2 flex items-center *:h-full">
                    <Link href={(account === 'Tài khoản') ? '/dang-nhap' : '/thong-tin-tai-khoan/thong-tin'} className='!hidden 
                    lg:!flex items-center gap-x-2 hover:bg-[#E2EDFF] rounded duration-200 py-2 px-3 cursor-pointer whitespace-nowrap'>
                        <CircleUser color='#0A68FF' />
                        <span className='text-[#0A68FF] text-sm mt-0.5'>{account}</span>
                    </Link>
                    {/* cart */}
                    <div className={`relative group cursor-pointer`}>
                        <button onClick={handleCart} className='z-[1] relative hover:bg-[#E2EDFF] rounded duration-200 p-2' >
                            <ShoppingBag className='w-5 h-5 ' color='#0A68FF' />
                            <Count_Cart />
                            {/* animation add to cart */}
                            {
                                isVisible &&
                                <div className='animation_add_cart absolute w-4 h-4 lg:w-8 lg:h-8 rounded-full'>
                                    <Image width={40} height={40} className='rounded-full' src={isVisible} alt='.' />
                                </div>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </header>

        {/* about us */}
        <div className='border-y w-full'>
            <section className='hidden_scroll_x mx-auto max-w-[1440px] w-[95vw] overflow-x-auto *:whitespace-nowrap bg-white flex *:flex items-center *:items-center *:gap-x-1 *:text-xs py-3 *:cursor-default'>
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

        <div className='fixed bg-white bottom-0 lg:!hidden w-screen z-[2000] border-t'>
            <Header_mobile dataProps={{ account }} />
        </div>
    </>
    )
};

export default Header;